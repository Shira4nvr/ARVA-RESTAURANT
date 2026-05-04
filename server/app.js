const express = require('express');
const cors = require('cors');
const environment = require('./config/environment');
const { errorHandler } = require('./utils/errorHandler');
const logger = require('./utils/logger');

// Importar rutas
const authRoutes = require('./routes/auth');
const reservationRoutes = require('./routes/reservations');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Logging de solicitudes
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

// Rutas de salud
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API con salud ✅',
    environment: environment.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Health check sin prefijo (/api) para compatibilidad con proxies
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API con salud ✅',
    environment: environment.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/reservations', reservationRoutes);

// Rutas sin prefijo (/api) para compatibilidad con proxies que reescriben /api
app.use('/auth', authRoutes);
app.use('/reservations', reservationRoutes);

// Ruta raíz
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Arva Restaurant API funcionando ✅',
    version: '1.0.0'
  });
});

// Ruta raíz sin prefijo (/api)
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Arva Restaurant API funcionando ✅',
    version: '1.0.0'
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    path: req.originalUrl
  });
});

// Manejador de errores global
app.use(errorHandler);

module.exports = app;
