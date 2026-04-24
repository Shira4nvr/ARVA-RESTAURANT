const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const validateUserInput = (username, email, password) => {
  const errors = [];

  if (!username || username.length < 3) {
    errors.push('El nombre de usuario debe tener al menos 3 caracteres');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Email inválido');
  }

  if (!password || !validatePassword(password)) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

const validateReservationInput = (reservationData) => {
  const { name, email, phone, branch, date, time, guests, specialRequests } = reservationData;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('El nombre es requerido');
  }

  if (!email || !validateEmail(email)) {
    errors.push('Email inválido');
  }

  if (!phone || phone.trim().length === 0) {
    errors.push('El teléfono es requerido');
  }

  if (!branch || branch.trim().length === 0) {
    errors.push('La sucursal es requerida');
  }

  if (!date) {
    errors.push('La fecha es requerida');
  }

  if (!time || time.trim().length === 0) {
    errors.push('La hora es requerida');
  }

  if (!guests || guests < 1) {
    errors.push('El número de personas debe ser al menos 1');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

module.exports = {
  validateEmail,
  validatePassword,
  validateUserInput,
  validateReservationInput
};
