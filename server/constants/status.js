module.exports = {
  RESERVATION_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    CANCELLED: 'cancelled'
  },

  USER_ROLE: {
    USER: 'user',
    ADMIN: 'admin'
  },

  HTTP_STATUS: {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500
  },

  MESSAGES: {
    SUCCESS: 'Operación exitosa',
    ERROR: 'Error en la operación',
    UNAUTHORIZED: 'No autorizado',
    FORBIDDEN: 'Acceso denegado',
    NOT_FOUND: 'Recurso no encontrado',
    INVALID_CREDENTIALS: 'Credenciales inválidas',
    TOKEN_INVALID: 'Token inválido',
    TOKEN_MISSING: 'Token no proporcionado',
    USER_EXISTS: 'El usuario ya existe',
    USER_NOT_FOUND: 'Usuario no encontrado',
    RESERVATION_NOT_FOUND: 'Reserva no encontrada',
    RESERVATION_CREATED: 'Reserva creada exitosamente',
    RESERVATION_UPDATED: 'Reserva actualizada exitosamente',
    RESERVATION_DELETED: 'Reserva eliminada'
  }
};
