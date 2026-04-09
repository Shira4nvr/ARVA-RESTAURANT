require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error MongoDB:', err));
  

app.use('/api/auth', require('./routes/auth'));
app.use('/api/reservations', require('./routes/reservations'));

const createAdmin = async () => {
  const adminExists = await User.findOne({ email: 'admin@arva.com' });
  if (!adminExists) {
    const admin = new User({
      username: 'admin',
      email: 'admin@arva.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();
    console.log('✅ Admin creado: admin@arva.com / admin123');
  }
};

createAdmin();
app.get('/api', (req, res) => {
  res.json({ message: 'Arva Restaurant API funcionando ✅' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});