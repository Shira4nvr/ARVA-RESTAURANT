const app = require('./app');
const environment = require('./config/environment');
const { connectDatabase } = require('./config/database');
const createAdminUser = require('./seeds/createAdmin');
const logger = require('./utils/logger');

const startServer = async () => {
  try {
    // Conectar a la base de datos
    await connectDatabase();

    // Crear usuario admin
    await createAdminUser();

    // Iniciar servidor
    const server = app.listen(environment.PORT, () => {
      logger.info(`🚀 Servidor corriendo en http://localhost:${environment.PORT}`);
      logger.info(`📡 Entorno: ${environment.NODE_ENV}`);
    });

    // Manejo de señales para cerrar gracefully
    process.on('SIGTERM', async () => {
      logger.warn('⚠️ SIGTERM - Cerrando servidor...');
      server.close(async () => {
        logger.info('✅ Servidor cerrado');
        process.exit(0);
      });
    });

    process.on('SIGINT', async () => {
      logger.warn('⚠️ SIGINT - Cerrando servidor...');
      server.close(async () => {
        logger.info('✅ Servidor cerrado');
        process.exit(0);
      });
    });

  } catch (error) {
    logger.error(`❌ Error al iniciar servidor: ${error.message}`);
    process.exit(1);
  }
};

startServer();