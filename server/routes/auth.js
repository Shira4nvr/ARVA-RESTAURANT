const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role }, 
    process.env.JWT_SECRET, 
    { expiresIn: '24h' }
  );
  
  res.json({ 
    token, 
    role: user.role,
    message: 'Login exitoso' 
  });
});

router.post('/register', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;