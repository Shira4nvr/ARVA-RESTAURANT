const User = require('../models/User');
const environment = require('../config/environment');
const logger = require('../utils/logger');

const createAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ email: environment.ADMIN_EMAIL });
    
    if (adminExists) {
      logger.info(`ℹ️ Admin ya existe: ${environment.ADMIN_EMAIL}`);
      return;
    }

    const admin = new User({
      username: environment.ADMIN_USERNAME,
      email: environment.ADMIN_EMAIL,
      password: environment.ADMIN_PASSWORD,
      role: 'admin'
    });

    await admin.save();
    logger.info(`✅ Admin creado: ${environment.ADMIN_EMAIL} / ${environment.ADMIN_PASSWORD}`);
  } catch (error) {
    logger.error(`❌ Error al crear admin: ${error.message}`);
  }
};

module.exports = createAdminUser;
