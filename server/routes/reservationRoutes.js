const express = require('express');
const ReservationController = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

/**
 * @route   POST /api/reservations
 * @desc    Crear nueva reserva
 * @access  Public
 */
router.post('/', ReservationController.createReservation);

/**
 * @route   GET /api/reservations/client/my-reservations
 * @desc    Obtener reservas del cliente autenticado
 * @access  Private
 */
router.get('/client/my-reservations', authMiddleware, ReservationController.getClientReservations);

/**
 * @route   GET /api/reservations
 * @desc    Obtener todas las reservas (Admin)
 * @access  Private/Admin
 */
router.get('/', authMiddleware, requireAdmin, ReservationController.getAllReservations);

/**
 * @route   GET /api/reservations/metrics
 * @desc    Obtener métricas de reservas (Admin)
 * @access  Private/Admin
 */
router.get('/metrics', authMiddleware, requireAdmin, ReservationController.getMetrics);

/**
 * @route   GET /api/reservations/status/:status
 * @desc    Obtener reservas por estado (Admin)
 * @access  Private/Admin
 */
router.get('/status/:status', authMiddleware, requireAdmin, ReservationController.getReservationsByStatus);

/**
 * @route   GET /api/reservations/branch/:branch
 * @desc    Obtener reservas por sucursal (Admin)
 * @access  Private/Admin
 */
router.get('/branch/:branch', authMiddleware, requireAdmin, ReservationController.getReservationsByBranch);

/**
 * @route   GET /api/reservations/:id
 * @desc    Obtener reserva por ID (Admin)
 * @access  Private/Admin
 */
router.get('/:id', authMiddleware, requireAdmin, ReservationController.getReservationById);

/**
 * @route   PUT /api/reservations/:id
 * @desc    Actualizar reserva (Admin)
 * @access  Private/Admin
 */
router.put('/:id', authMiddleware, requireAdmin, ReservationController.updateReservation);

/**
 * @route   DELETE /api/reservations/:id
 * @desc    Eliminar reserva (Admin)
 * @access  Private/Admin
 */
router.delete('/:id', authMiddleware, requireAdmin, ReservationController.deleteReservation);

module.exports = router;
