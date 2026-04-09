const express = require('express');
const Reservation = require('../models/Reservation');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    await reservation.save();
    res.status(201).json({ 
      message: 'Reserva creada exitosamente',
      reservation 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const requireAdmin = [auth, (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  next();
}];

router.get('/', requireAdmin, async (req, res) => {
  const reservations = await Reservation.find().sort({ date: 1 });
  res.json(reservations);
});

router.put('/:id', requireAdmin, async (req, res) => {
  const reservation = await Reservation.findByIdAndUpdate(
    req.params.id, 
    req.body, 
    { new: true, runValidators: true }
  );
  if (!reservation) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }
  res.json(reservation);
});

router.delete('/:id', requireAdmin, async (req, res) => {
  const reservation = await Reservation.findByIdAndDelete(req.params.id);
  if (!reservation) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }
  res.json({ message: 'Reserva eliminada' });
});

router.get('/metrics', requireAdmin, async (req, res) => {
  const [total, pending, confirmed, cancelled] = await Promise.all([
    Reservation.countDocuments(),
    Reservation.countDocuments({ status: 'pending' }),
    Reservation.countDocuments({ status: 'confirmed' }),
    Reservation.countDocuments({ status: 'cancelled' })
  ]);
  res.json({ total, pending, confirmed, cancelled });
});

module.exports = router;