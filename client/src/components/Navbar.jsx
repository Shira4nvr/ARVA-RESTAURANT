import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaBars, FaTimes, FaUtensils } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-lg'
            : 'bg-white/98 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group hover:opacity-80 transition-opacity">
              <div className="bg-gradient-to-br from-primary to-primary-dark rounded-lg p-2.5 shadow-lg">
                <FaUtensils className="text-white text-xl" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-primary leading-none">Arva</span>
                <span className="text-xs font-semibold text-accent">Restaurant</span>
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/menu"
                className="px-4 py-2.5 text-gray-700 font-semibold transition-all duration-300 hover:text-primary hover:bg-gray-50 rounded-lg"
              >
                Menú
              </Link>

              {user ? (
                <>
                  <Link
                    to="/my-reservations"
                    className="px-4 py-2.5 text-gray-700 font-semibold transition-all duration-300 hover:text-primary hover:bg-gray-50 rounded-lg"
                  >
                    Mis Reservas
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="px-5 py-2.5 bg-gradient-to-r from-primary to-primary-dark text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="px-5 py-2.5 text-red-600 font-bold border-2 border-red-600 rounded-lg hover:bg-red-50 transition-all duration-300"
                  >
                    Salir
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2.5 text-primary font-bold border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 bg-gradient-to-r from-accent to-orange-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 hover:bg-gray-100 rounded-lg transition-all duration-300"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <FaTimes className="text-2xl text-primary" />
              ) : (
                <FaBars className="text-2xl text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-2">
              <Link
                to="/menu"
                className="block px-4 py-3 text-lg font-semibold text-gray-700 rounded-lg hover:bg-gray-100 hover:text-primary transition-all duration-300"
                onClick={() => setMobileOpen(false)}
              >
                Menú
              </Link>

              {user ? (
                <>
                  <Link
                    to="/my-reservations"
                    className="block px-4 py-3 text-lg font-semibold text-gray-700 rounded-lg hover:bg-gray-100 hover:text-primary transition-all duration-300"
                    onClick={() => setMobileOpen(false)}
                  >
                    Mis Reservas
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 bg-primary text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
                      onClick={() => setMobileOpen(false)}
                    >
                      Panel Admin
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-lg font-semibold text-red-600 hover:bg-red-50 rounded-lg transition-all duration-300 border-2 border-red-600"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="w-full px-4 py-3 text-lg font-semibold text-primary border-2 border-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-300 text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Iniciar Sesión
                  </Link>
                  <Link
                    to="/register"
                    className="w-full px-4 py-3 bg-accent text-white text-lg font-bold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-center"
                    onClick={() => setMobileOpen(false)}
                  >
                    Registrarse
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer for fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;