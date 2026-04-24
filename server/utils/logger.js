const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '../logs');

// Crear carpeta de logs si no existe
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

const getTimestamp = () => {
  return new Date().toISOString();
};

const writeLog = (level, message) => {
  const timestamp = getTimestamp();
  const logMessage = `[${timestamp}] [${level}] ${message}\n`;
  
  console.log(logMessage.trim());
  
  const logFile = path.join(logsDir, `${level.toLowerCase()}.log`);
  fs.appendFileSync(logFile, logMessage);
};

module.exports = {
  info: (message) => writeLog('INFO', message),
  error: (message) => writeLog('ERROR', message),
  warn: (message) => writeLog('WARN', message),
  debug: (message) => writeLog('DEBUG', message)
};
