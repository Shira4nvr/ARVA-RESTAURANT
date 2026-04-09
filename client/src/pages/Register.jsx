import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUserPlus, FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', formData);
      navigate('/login');
    } catch (error) {
      alert(error.response?.data?.error || 'Error');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary-dark to-primary">
      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50">
        <div className="text-center mb-10">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-accent to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <FaUserPlus className="text-3xl text-white" />
          </div>
          <h1 className="text-3xl font-bold text-primary mb-2">Crear Cuenta</h1>
          <p className="text-gray-600 font-medium">Únete a Arva para reservar</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label className="block text-sm font-bold text-primary mb-2 flex items-center">
              <FaUser className="mr-2 text-accent" />
              Nombre de usuario
            </label>
            <input
              type="text"
              placeholder="Tu nombre de usuario"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              className="form-input border-2 border-gray-200 focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-bold text-primary mb-2 flex items-center">
              <FaEnvelope className="mr-2 text-accent" />
              Email
            </label>
            <input
              type="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="form-input border-2 border-gray-200 focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <div className="form-group">
            <label className="block text-sm font-bold text-primary mb-2 flex items-center">
              <FaLock className="mr-2 text-accent" />
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="form-input border-2 border-gray-200 focus:ring-2 focus:ring-accent"
              required
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full bg-gradient-to-r from-accent to-orange-500 hover:from-orange-600 hover:to-orange-600 text-white border-none mt-6">
            {loading ? 'Creando...' : 'Crear Cuenta'}
          </button>
        </form>
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-3">
            ¿Ya tienes cuenta?
          </p>
          <Link to="/login" className="inline-block px-6 py-2 text-primary font-bold border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300">
            Iniciar Sesión
          </Link>
        </div>
        <div className="text-center">
          <Link to="/" className="text-primary hover:text-accent font-medium transition-colors text-sm">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;