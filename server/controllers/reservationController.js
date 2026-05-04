const ReservationService = require('../services/reservationService');
const { ApiError } = require('../utils/errorHandler');
const constants = require('../constants/status');
const { validateReservationInput } = require('../utils/validators');
const logger = require('../utils/logger');

class ReservationController {
  static async createReservation(req, res, next) {
    try {
      const validation = validateReservationInput(req.body);
      if (!validation.isValid) {
        return res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Validación fallida',
          errors: validation.errors
        });
      }

      const reservation = await ReservationService.createReservation(req.body);
      
      logger.info(`✅ Reserva creada: ${reservation._id}`);

      res.status(constants.HTTP_STATUS.CREATED).json({
        success: true,
        message: constants.MESSAGES.RESERVATION_CREATED,
        reservation
      });
    } catch (error) {
      logger.error(`Error al crear reserva: ${error.message}`);
      next(error);
    }
  }

  static async getAllReservations(req, res, next) {
    try {
      const isAdmin = req.user?.role === constants.USER_ROLE.ADMIN;
      const reservations = isAdmin
        ? await ReservationService.getAllReservations()
        : await ReservationService.getReservationsByEmail(req.user.email);
      
      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        count: reservations.length,
        reservations
      });
    } catch (error) {
      logger.error(`Error al obtener reservas: ${error.message}`);
      next(error);
    }
  }

  static async getReservationById(req, res, next) {
    try {
      const reservation = await ReservationService.getReservationById(req.params.id);
      
      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        reservation
      });
    } catch (error) {
      logger.error(`Error al obtener reserva: ${error.message}`);
      next(error);
    }
  }

  static async updateReservation(req, res, next) {
    try {
      const isAdmin = req.user?.role === constants.USER_ROLE.ADMIN;
      const existingReservation = await ReservationService.getReservationById(req.params.id);

      if (!isAdmin && existingReservation.email !== req.user.email) {
        throw new ApiError(constants.HTTP_STATUS.FORBIDDEN, 'No puedes modificar esta reserva');
      }

      const updateData = isAdmin
        ? req.body
        : {
            date: req.body.date,
            time: req.body.time,
          };

      const reservation = await ReservationService.updateReservation(req.params.id, updateData);
      
      logger.info(`✅ Reserva actualizada: ${reservation._id}`);

      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        message: constants.MESSAGES.RESERVATION_UPDATED,
        reservation
      });
    } catch (error) {
      logger.error(`Error al actualizar reserva: ${error.message}`);
      next(error);
    }
  }

  static async deleteReservation(req, res, next) {
    try {
      const isAdmin = req.user?.role === constants.USER_ROLE.ADMIN;
      const existingReservation = await ReservationService.getReservationById(req.params.id);

      if (!isAdmin && existingReservation.email !== req.user.email) {
        throw new ApiError(constants.HTTP_STATUS.FORBIDDEN, 'No puedes eliminar esta reserva');
      }

      await ReservationService.deleteReservation(req.params.id);
      
      logger.info(`✅ Reserva eliminada: ${req.params.id}`);

      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        message: constants.MESSAGES.RESERVATION_DELETED
      });
    } catch (error) {
      logger.error(`Error al eliminar reserva: ${error.message}`);
      next(error);
    }
  }

  static async getClientReservations(req, res, next) {
    try {
      const reservations = await ReservationService.getReservationsByEmail(req.user.email);
      
      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        count: reservations.length,
        reservations
      });
    } catch (error) {
      logger.error(`Error al obtener reservas del cliente: ${error.message}`);
      next(error);
    }
  }

  static async getMetrics(req, res, next) {
    try {
      const metrics = await ReservationService.getMetrics();
      
      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        metrics
      });
    } catch (error) {
      logger.error(`Error al obtener métricas: ${error.message}`);
      next(error);
    }
  }

  static async getReservationsByStatus(req, res, next) {
    try {
      const { status } = req.params;
      
      if (!Object.values(constants.RESERVATION_STATUS).includes(status)) {
        return res.status(constants.HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: 'Estado inválido'
        });
      }

      const reservations = await ReservationService.getReservationsByStatus(status);
      
      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        count: reservations.length,
        reservations
      });
    } catch (error) {
      logger.error(`Error al obtener reservas por estado: ${error.message}`);
      next(error);
    }
  }

  static async getReservationsByBranch(req, res, next) {
    try {
      const { branch } = req.params;
      const reservations = await ReservationService.getReservationsByBranch(branch);
      
      res.status(constants.HTTP_STATUS.OK).json({
        success: true,
        count: reservations.length,
        reservations
      });
    } catch (error) {
      logger.error(`Error al obtener reservas por sucursal: ${error.message}`);
      next(error);
    }
  }
}

module.exports = ReservationController;
