import { useState } from 'react';
import axios from 'axios';
import { FaUtensils, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const Reservation = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', branch: '', date: new Date(), time: '19:00', guests: 2, specialRequests: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      if (!API_URL) {
        throw new Error('REACT_APP_API_URL no está definido');
      }

      await axios.post(`${API_URL}/reservations`, formData);
      setMessage('success');
      setFormData({ name: '', email: '', phone: '', branch: '', date: new Date(), time: '19:00', guests: 2, specialRequests: '' });
    } catch (error) {
      setMessage('error');
    }
    setLoading(false);
  };

  const times = ['18:00', '19:00', '20:00', '21:00', '22:00'];

  const branches = [
    { value: 'centro', label: 'Centro - Calle Principal 123' },
    { value: 'norte', label: 'Norte - Avenida Norte 456' },
    { value: 'sur', label: 'Sur - Plaza Sur 789' }
  ];

  return (
    <div className="min-h-screen py-20 bg-gradient-to-br from-primary/5 to-accent/5">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <FaUtensils className="text-6xl text-accent mx-auto mb-4" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent mb-4">
              Reserva tu Mesa
            </h1>
            <p className="text-xl text-gray-600">
              Completa el formulario para reservar tu experiencia culinaria en ARVA
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Form */}
            <div className="fade-in-up">
              <form onSubmit={handleSubmit} className="card max-w-lg mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Nombre completo"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="tel"
                      placeholder="Teléfono"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <div className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl">
                      <FaUsers className="text-2xl text-primary flex-shrink-0" />
                      <input
                        type="number"
                        placeholder="Personas"
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: parseInt(e.target.value)})}
                        min="1"
                        max="12"
                        className="flex-1 border-none outline-none text-2xl font-bold bg-transparent"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group mb-6">
                  <div className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-xl">
                    <FaMapMarkerAlt className="text-2xl text-primary flex-shrink-0" />
                    <select
                      value={formData.branch}
                      onChange={(e) => setFormData({...formData, branch: e.target.value})}
                      className="flex-1 border-none outline-none bg-transparent"
                      required
                    >
                      <option value="">Selecciona una sucursal</option>
                      {branches.map(branch => (
                        <option key={branch.value} value={branch.value}>{branch.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="form-group">
                    <input
                      type="date"
                      value={formData.date.toISOString().split('T')[0]}
                      onChange={(e) => setFormData({...formData, date: new Date(e.target.value)})}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="form-input"
                      required
                    >
                      {times.map(time => (
                        <option key={time} value={time}>{time}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <textarea
                  placeholder="¿Alergias o preferencias especiales?"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
                  className="form-input resize-none h-28 mb-6"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? 'Reservando...' : 'Confirmar Reserva'}
                </button>

                {message && (
                  <div className={`mt-6 p-4 rounded-xl text-center font-semibold text-lg ${
                    message === 'success'
                      ? 'bg-emerald-100 border-4 border-emerald-400 text-emerald-800'
                      : 'bg-red-100 border-4 border-red-400 text-red-800'
                  }`}>
                    {message === 'success'
                      ? '¡Reserva confirmada! Te contactaremos pronto 📞'
                      : 'Error al realizar la reserva. Inténtalo de nuevo.'}
                  </div>
                )}
              </form>
            </div>

            {/* Info */}
            <div className="fade-in-up">
              <div className="card p-8">
                <h3 className="text-2xl font-bold text-primary mb-6">Información de Reserva</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaUtensils className="text-accent text-xl" />
                    <span className="text-gray-700">Horario de atención: 6:00 PM - 11:00 PM</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUsers className="text-accent text-xl" />
                    <span className="text-gray-700">Capacidad máxima: 12 personas por reserva</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaUtensils className="text-accent text-xl" />
                    <span className="text-gray-700">Confirmación requerida 24 horas antes</span>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Nota:</strong> Las reservas están sujetas a disponibilidad.
                    Te contactaremos para confirmar tu reserva dentro de las próximas 24 horas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;