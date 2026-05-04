const Reservation = require('../models/Reservation');
const { ApiError } = require('../utils/errorHandler');
const constants = require('../constants/status');

class ReservationService {
  static async createReservation(reservationData) {
    const reservation = new Reservation({
      ...reservationData,
      status: constants.RESERVATION_STATUS.PENDING
    });

    await reservation.save();
    return reservation;
  }

  static async getAllReservations(sortBy = 'date') {
    const reservations = await Reservation.find().sort({ [sortBy]: 1 });
    return reservations;
  }

  static async getReservationById(reservationId) {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      throw new ApiError(
        constants.HTTP_STATUS.NOT_FOUND,
        constants.MESSAGES.RESERVATION_NOT_FOUND
      );
    }
    return reservation;
  }

  static async updateReservation(reservationId, updateData) {
    const reservation = await Reservation.findByIdAndUpdate(
      reservationId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!reservation) {
      throw new ApiError(
        constants.HTTP_STATUS.NOT_FOUND,
        constants.MESSAGES.RESERVATION_NOT_FOUND
      );
    }

    return reservation;
  }

  static async deleteReservation(reservationId) {
    const reservation = await Reservation.findByIdAndDelete(reservationId);
    if (!reservation) {
      throw new ApiError(
        constants.HTTP_STATUS.NOT_FOUND,
        constants.MESSAGES.RESERVATION_NOT_FOUND
      );
    }
    return reservation;
  }

  static async getReservationsByEmail(email) {
    const reservations = await Reservation.find({ email }).sort({ date: -1 });
    return reservations;
  }

  static async getReservationsByUserId(userId) {
    const reservations = await Reservation.find({ userId }).sort({ date: -1 });
    return reservations;
  }

  static async getReservationsForUser({ userId, email }) {
    const or = [];
    if (userId) or.push({ userId });
    if (email) or.push({ email });

    const query = or.length > 1 ? { $or: or } : (or[0] || {});
    const reservations = await Reservation.find(query).sort({ date: -1 });
    return reservations;
  }

  static async getMetrics() {
    const [total, pending, confirmed, cancelled] = await Promise.all([
      Reservation.countDocuments(),
      Reservation.countDocuments({ status: constants.RESERVATION_STATUS.PENDING }),
      Reservation.countDocuments({ status: constants.RESERVATION_STATUS.CONFIRMED }),
      Reservation.countDocuments({ status: constants.RESERVATION_STATUS.CANCELLED })
    ]);

    return { total, pending, confirmed, cancelled };
  }

  static async getReservationsByStatus(status) {
    const reservations = await Reservation.find({ status }).sort({ date: -1 });
    return reservations;
  }

  static async getReservationsByBranch(branch) {
    const reservations = await Reservation.find({ branch }).sort({ date: -1 });
    return reservations;
  }
}

module.exports = ReservationService;
