const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const environment = require('../config/environment');
const { ApiError } = require('../utils/errorHandler');
const constants = require('../constants/status');

class AuthService {
  static async registerUser(username, email, password) {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new ApiError(
        constants.HTTP_STATUS.CONFLICT,
        constants.MESSAGES.USER_EXISTS
      );
    }

    // Crear nuevo usuario
    const user = new User({
      username,
      email,
      password,
      role: constants.USER_ROLE.USER
    });

    await user.save();
    return { id: user._id, username: user.username, email: user.email };
  }

  static async loginUser(email, password) {
    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(
        constants.HTTP_STATUS.UNAUTHORIZED,
        constants.MESSAGES.INVALID_CREDENTIALS
      );
    }

    // Verificar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new ApiError(
        constants.HTTP_STATUS.UNAUTHORIZED,
        constants.MESSAGES.INVALID_CREDENTIALS
      );
    }

    // Generar token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      environment.JWT_SECRET,
      { expiresIn: environment.JWT_EXPIRE }
    );

    return {
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    };
  }

  static async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new ApiError(
        constants.HTTP_STATUS.NOT_FOUND,
        constants.MESSAGES.USER_NOT_FOUND
      );
    }
    return user;
  }
}

module.exports = AuthService;
