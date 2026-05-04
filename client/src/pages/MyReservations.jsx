import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { FaCalendar, FaClock, FaUsers, FaMapMarkerAlt, FaCheckCircle, FaClock as FaClockIcon, FaTimesCircle, FaArrowLeft } from 'react-icons/fa';

const MyReservations = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      navigate('/login');
      return;
    }

    fetchMyReservations();
  }, [user, authLoading, navigate]);

  const fetchMyReservations = async () => {
    try {
      setLoading(true);
      if (!process.env.REACT_APP_API_URL) {
        throw new Error('REACT_APP_API_URL no está definido');
      }

      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.get(`${process.env.REACT_APP_API_URL}/reservations/my`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      setReservations(Array.isArray(response.data.reservations) ? response.data.reservations : []);
    } catch (error) {
      console.error('Error al obtener reservas:', error);
    }
    setLoading(false);
  };

  const cancelReservation = async (id) => {
    try {
      if (!process.env.REACT_APP_API_URL) {
        throw new Error('REACT_APP_API_URL no está definido');
      }

      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/reservations/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      if (res.data?.success) {
        setReservations((prev) => prev.filter((r) => r._id !== id));
        alert('Reserva cancelada');
      } else {
        alert(res.data?.message || 'Error cancelando reserva');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error cancelando reserva');
    }
  };

  const updateReservation = async (id, date, time) => {
    try {
      if (!process.env.REACT_APP_API_URL) {
        throw new Error('REACT_APP_API_URL no está definido');
      }

      if (!token) {
        throw new Error('No hay token de autenticación');
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/reservations/${id}`,
        { date, time },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (res.data?.success) {
        setReservations((prev) => prev.map((r) => (r._id === id ? res.data.reservation : r)));
        alert('Reserva actualizada');
      } else {
        alert(res.data?.message || 'Error actualizando reserva');
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error actualizando reserva');
    }
  };

  const getStatusInfo = (status) => {
    const statusMap = {
      pending: {
        label: 'Pendiente',
        icon: FaClockIcon,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
        bgColor: 'bg-yellow-50',
        badgeColor: 'bg-yellow-100 text-yellow-800'
      },
      confirmed: {
        label: 'Confirmada',
        icon: FaCheckCircle,
        color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        bgColor: 'bg-emerald-50',
        badgeColor: 'bg-emerald-100 text-emerald-800'
      },
      cancelled: {
        label: 'Cancelada',
        icon: FaTimesCircle,
        color: 'bg-red-100 text-red-800 border-red-300',
        bgColor: 'bg-red-50',
        badgeColor: 'bg-red-100 text-red-800'
      }
    };
    return statusMap[status] || statusMap.pending;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-2xl font-semibold text-gray-600 animate-pulse">
          Cargando tus reservas...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-12">
      <div className="container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <button
            onClick={() => navigate('/')}
            className="p-3 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaArrowLeft className="text-2xl text-gray-700" />
          </button>
          <div>
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-700 to-slate-800 bg-clip-text text-transparent mb-2">
              Mis Reservas
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              Bienvenido, <span className="font-bold text-primary">{user?.username || user?.email}</span>
            </p>
          </div>
        </div>

        {/* Content */}
        {reservations.length === 0 ? (
          <div className="card p-16 text-center">
            <div className="text-6xl mb-6 opacity-25">📭</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">Aún no tienes reservas</h2>
            <p className="text-gray-600 mb-8 text-lg">
              ¡Realiza tu primera reserva en ARVA y disfruta de nuestra experiencia gastronómica!
            </p>
            <button
              onClick={() => navigate('/reservation')}
              className="btn-primary max-w-xs mx-auto"
            >
              Hacer una Reserva Ahora
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {reservations.map((reservation) => {
              const statusInfo = getStatusInfo(reservation.status);
              const StatusIcon = statusInfo.icon;
              const reservationDate = new Date(reservation.date);
              
              return (
                <div key={reservation._id} className={`card p-8 border-l-4 transition-all hover:shadow-xl ${statusInfo.bgColor}`}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start mb-6">
                    {/* Estado */}
                    <div className="flex items-center gap-3">
                      <StatusIcon className={`text-3xl ${statusInfo.color} px-3 py-2 rounded-lg bg-opacity-20`} />
                      <div>
                        <p className="text-sm text-gray-600 uppercase font-semibold">Estado</p>
                        <p className={`text-lg font-bold px-3 py-1 rounded-full inline-block ${statusInfo.badgeColor}`}>
                          {statusInfo.label}
                        </p>
                      </div>
                    </div>

                    {/* Fecha */}
                    <div className="flex items-start gap-3">
                      <FaCalendar className="text-2xl text-blue-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 uppercase font-semibold">Fecha</p>
                        <p className="text-lg font-bold text-gray-800">
                          {reservationDate.toLocaleDateString('es-ES', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>

                    {/* Hora */}
                    <div className="flex items-start gap-3">
                      <FaClock className="text-2xl text-green-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 uppercase font-semibold">Hora</p>
                        <p className="text-lg font-bold text-gray-800">{reservation.time}</p>
                      </div>
                    </div>

                    {/* Personas */}
                    <div className="flex items-start gap-3">
                      <FaUsers className="text-2xl text-purple-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 uppercase font-semibold">Personas</p>
                        <p className="text-lg font-bold text-gray-800">{reservation.guests}</p>
                      </div>
                    </div>
                  </div>

                  {/* Sucursal y Solicitudes Especiales */}
                  <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-2xl text-red-600 mt-1" />
                      <div>
                        <p className="text-sm text-gray-600 uppercase font-semibold">Sucursal</p>
                        <p className="text-lg font-bold text-gray-800 capitalize">
                          {reservation.branch === 'centro' ? 'Centro' :
                           reservation.branch === 'norte' ? 'Norte' :
                           reservation.branch === 'sur' ? 'Sur' : reservation.branch}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start md:justify-end gap-3">
                      <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                        <button
                          onClick={() => cancelReservation(reservation._id)}
                          className="btn-primary whitespace-nowrap"
                        >
                          Cancelar
                        </button>
                        <button
                          onClick={() => {
                            const currentDate = new Date(reservation.date).toISOString().split('T')[0];
                            const newDate = window.prompt('Nueva fecha (YYYY-MM-DD):', currentDate);
                            const newTime = window.prompt('Nueva hora (HH:mm):', reservation.time);
                            if (newDate && newTime) updateReservation(reservation._id, newDate, newTime);
                          }}
                          className="btn-primary whitespace-nowrap"
                        >
                          Cambiar fecha/hora
                        </button>
                      </div>
                    </div>

                    {reservation.specialRequests && (
                      <div>
                        <p className="text-sm text-gray-600 uppercase font-semibold mb-2">Solicitudes Especiales</p>
                        <p className="text-gray-800 bg-white bg-opacity-50 p-3 rounded-lg italic">
                          "{reservation.specialRequests}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Información adicional según el estado */}
                  <div className="border-t mt-6 pt-6">
                    {reservation.status === 'pending' && (
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-yellow-800 font-semibold">
                          ⏳ Tu reserva está siendo procesada. El administrador la confirmará pronto.
                        </p>
                      </div>
                    )}
                    {reservation.status === 'confirmed' && (
                      <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                        <p className="text-emerald-800 font-semibold">
                          ✅ ¡Tu reserva ha sido confirmada! Te esperamos con gusto.
                        </p>
                      </div>
                    )}
                    {reservation.status === 'cancelled' && (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                        <p className="text-red-800 font-semibold">
                          ❌ Tu reserva ha sido cancelada. Contacta con nosotros si tienes dudas.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Botón para hacer otra reserva */}
        {reservations.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/reservation')}
              className="btn-primary"
            >
              Hacer Otra Reserva
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
