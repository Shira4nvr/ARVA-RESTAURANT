require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/arva-restaurant',
  JWT_SECRET: process.env.JWT_SECRET || 'ARVA_SECRET_2024_SUPER_SECRETO',
  JWT_EXPIRE: process.env.JWT_EXPIRE || '24h',
  BCRYPT_ROUNDS: 12,
  
  // Admin credentials for seeding
  ADMIN_EMAIL: 'admin@arva.com',
  ADMIN_USERNAME: 'admin',
  ADMIN_PASSWORD: 'admin123'
};
