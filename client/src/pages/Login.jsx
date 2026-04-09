import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { FaLock, FaUser } from 'react-icons/fa';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      login(response.data.token, response.data.role);
      navigate(response.data.role === 'admin' ? '/admin' : '/reservation');
    } catch (err) {
      setError(err.response?.data?.error || 'Error de login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary via-primary-dark to-primary">
      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-xl rounded-3xl p-10 shadow-2xl border border-white/50">
        <div>
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-accent to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <FaLock className="text-3xl text-white" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-primary">
            Iniciar Sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Accede a tu cuenta para reservar
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl font-semibold">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-primary mb-2 flex items-center">
                <FaUser className="mr-2 text-accent" />
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition bg-white"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                Contraseña
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition bg-white"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-accent to-orange-500 hover:from-orange-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="text-center">
          <Link to="/" className="text-primary hover:text-accent font-medium transition-colors">
            ← Volver al sitio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;