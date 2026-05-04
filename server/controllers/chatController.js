const environment = require('../config/environment');
const constants = require('../constants/status');
const logger = require('../utils/logger');
const https = require('https');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

const buildSystemPrompt = () => {
  return [
    'Eres un asistente del restaurante ARVA (vegetariano).',
    'Tu trabajo es recomendar platos, bebidas y menús según preferencias del cliente.',
    'Haz preguntas aclaratorias si falta información (p. ej. alergias, picante, presupuesto).',
    'Responde en español, de forma breve y útil.',
    'No inventes información operativa no provista (precios exactos, direcciones específicas) si no fue dada.',
  ].join(' ');
};

const normalizeMessage = (value) => {
  if (typeof value !== 'string') return '';
  return value.trim();
};

const postJsonWithHttps = (urlString, headers, bodyObject, timeoutMs = 30000) => {
  return new Promise((resolve, reject) => {
    const url = new URL(urlString);
    const body = JSON.stringify(bodyObject);

    const req = https.request(
      {
        protocol: url.protocol,
        hostname: url.hostname,
        port: url.port || 443,
        path: `${url.pathname}${url.search}`,
        method: 'POST',
        headers: {
          ...headers,
          'Content-Length': Buffer.byteLength(body),
        },
      },
      (res) => {
        let raw = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => (raw += chunk));
        res.on('end', () => {
          let parsed = {};
          try {
            parsed = raw ? JSON.parse(raw) : {};
          } catch {
            parsed = { raw };
          }
          resolve({ status: res.statusCode || 0, ok: (res.statusCode || 0) >= 200 && (res.statusCode || 0) < 300, data: parsed });
        });
      }
    );

    req.on('error', reject);
    req.setTimeout(timeoutMs, () => req.destroy(new Error('Request timeout')));
    req.write(body);
    req.end();
  });
};

const callOpenAI = async ({ apiKey, model, temperature, messages }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const payload = {
    model,
    temperature,
    messages,
  };

  if (typeof fetch === 'function') {
    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  }

  return postJsonWithHttps(OPENAI_API_URL, headers, payload);
};

const callOpenRouter = async ({ apiKey, model, temperature, messages }) => {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`,
  };

  const payload = {
    model,
    temperature,
    messages,
  };

  if (typeof fetch === 'function') {
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  }

  return postJsonWithHttps(OPENROUTER_API_URL, headers, payload);
};

exports.recommend = async (req, res) => {
  try {
    const prompt = normalizeMessage(req.body?.message ?? req.body?.prompt);
    if (!prompt) {
      return res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'El campo "message" o "prompt" es requerido'
      });
    }

    if (prompt.length > 2000) {
      return res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'El mensaje es demasiado largo'
      });
    }

    const provider = (environment.LLM_PROVIDER || '').toLowerCase();
    const preferOpenRouter = provider === 'openrouter' || (!!environment.OPENROUTER_API_KEY && provider !== 'openai');

    let result;

    if (preferOpenRouter) {
      const apiKey = environment.OPENROUTER_API_KEY;
      if (!apiKey) {
        return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'OPENROUTER_API_KEY no está configurada en el servidor',
        });
      }

      result = await callOpenRouter({
        apiKey,
        model: environment.OPENROUTER_MODEL || 'openai/gpt-4o-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: prompt },
        ],
      });
    } else {
      const apiKey = environment.OPENAI_API_KEY;
      if (!apiKey) {
        return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: 'OPENAI_API_KEY no está configurada en el servidor',
        });
      }

      result = await callOpenAI({
        apiKey,
        model: environment.OPENAI_MODEL || 'gpt-4o-mini',
        temperature: 0.7,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          { role: 'user', content: prompt },
        ],
      });
    }

    if (!result.ok) {
      const data = result.data || {};
      const errMsg = data?.error?.message || 'Error llamando al proveedor LLM';
      logger.error(`LLM error (${result.status}): ${errMsg}`);
      return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: errMsg,
      });
    }

    const content = result.data?.choices?.[0]?.message?.content?.trim();

    return res.status(constants.HTTP_STATUS.OK).json({
      success: true,
      recommendation: content || '',
      reply: content || '',
      response: content || '',
    });
  } catch (error) {
    logger.error(`Error en recommend: ${error.message}`);
    return res.status(constants.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error interno',
    });
  }
};
