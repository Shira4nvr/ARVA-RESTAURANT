const AuthService = require('../services/authService');
const { ApiError } = require('../utils/errorHandler');
const constants = require('../constants/status');
const { validateUserInput } = require('../utils/validators');
const logger = require('../utils/logger');

class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, confirmPassword } = req.body;

      // Validar entrada
      const validation = validateUserInput(username, email, password);
      if (!validation.isValid) {
        return res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Validación fallida',
          errors: validation.errors
        });
      }

      // Verificar que las contraseñas coincidan
      if (password !== confirmPassword) {
        return res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Las contraseñas no coinciden'
        });
      }

      const user = await AuthService.registerUser(username, email, password);
      
      logger.info(`✅ Usuario registrado: ${email}`);

      res.status(constants.HTTP_STATUS.CREATED).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        user
      });
    } catch (error) {
      logger.error(`Error al registrar usuario: ${error.message}`);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Email y contraseña son requeridos'
        });
      }

      const result = await AuthService.loginUser(email, password);
      
      logger.info(`✅ Login exitoso: ${email}`);

      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        message: 'Login exitoso',
        token: result.token,
        user: result.user
      });
    } catch (error) {
      logger.error(`Error al hacer login: ${error.message}`);
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const user = await AuthService.getUserById(req.user.id);
      
      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        user
      });
    } catch (error) {
      logger.error(`Error al obtener perfil: ${error.message}`);
      next(error);
    }
  }
}

module.exports = AuthController;
