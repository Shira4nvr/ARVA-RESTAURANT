const mongoose = require('mongoose');
const environment = require('./environment');
const logger = require('../utils/logger');

const connectDatabase = async () => {
  try {
    await mongoose.connect(environment.MONGODB_URI);
    logger.info('✅ MongoDB conectado exitosamente');
    return true;
  } catch (error) {
    logger.error(`❌ Error al conectar MongoDB: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDatabase = async () => {
  try {
    await mongoose.disconnect();
    logger.info('✅ MongoDB desconectado');
  } catch (error) {
    logger.error(`❌ Error al desconectar MongoDB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = {
  connectDatabase,
  disconnectDatabase
};
