import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gradient-to-r from-primary via-primary-dark to-primary text-white py-20 mt-20 relative overflow-hidden">
    {/* Decorative Background */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      {/* Sucursales Section */}
      <div className="mb-16 pb-12 border-b border-white/20">
        <h3 className="text-2xl font-black text-white mb-8 text-center uppercase tracking-wider">Nuestras Sucursales</h3>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sucursal 1 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <h4 className="text-xl font-black text-accent mb-4 uppercase">📍 Centro Histórico</h4>
            <p className="text-gray-100 mb-2"><span className="font-bold">Dirección:</span> Calle 10, Local 5 - Centro Histórico</p>
            <p className="text-gray-100 mb-2"><span className="font-bold">Teléfono:</span> <a href="tel:+573228924518" className="hover:text-accent transition-colors">+57 322 892 4518</a></p>
            <p className="text-gray-100 mb-4"><span className="font-bold">Horario:</span> 12:00 - 21:00 (Todos los días)</p>
            <Link to="/login" className="w-full inline-block text-center px-6 py-2.5 bg-accent text-primary font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              Iniciar Sesión
            </Link>
          </div>
          
          {/* Sucursal 2 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <h4 className="text-xl font-black text-accent mb-4 uppercase">📍 Zona Rosa</h4>
            <p className="text-gray-100 mb-2"><span className="font-bold">Dirección:</span> Carrera 7, No. 85-50 - Zona Rosa</p>
            <p className="text-gray-100 mb-2"><span className="font-bold">Teléfono:</span> <a href="tel:+573228924518" className="hover:text-accent transition-colors">+57 322 892 4518</a></p>
            <p className="text-gray-100 mb-4"><span className="font-bold">Horario:</span> 12:00 - 21:00 (Todos los días)</p>
            <Link to="/login" className="w-full inline-block text-center px-6 py-2.5 bg-accent text-primary font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
      
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <img src="/arva-logo.svg" alt="Arva Vegetarian Eats" className="h-14 w-14 rounded-full object-contain bg-white p-2" />
            <h3 className="text-2xl font-black text-white">Arva</h3>
          </div>
          <p className="text-gray-100 leading-relaxed text-sm">
            Experiencia gastronómica de autor en un ambiente único. Reserva tu noche inolvidable.
          </p>
          {/* Social Media */}
          <div className="flex items-center gap-3 pt-4">
            <button className="bg-white/20 hover:bg-accent transition-all duration-300 p-2.5 rounded-lg text-lg transform hover:-translate-y-1 border-none cursor-pointer">
              <FaFacebook />
            </button>
            <button className="bg-white/20 hover:bg-accent transition-all duration-300 p-2.5 rounded-lg text-lg transform hover:-translate-y-1 border-none cursor-pointer">
              <FaInstagram />
            </button>
            <button className="bg-white/20 hover:bg-accent transition-all duration-300 p-2.5 rounded-lg text-lg transform hover:-translate-y-1 border-none cursor-pointer">
              <FaTwitter />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-black text-white mb-6 uppercase tracking-wider">
            Contacto
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-3 group">
              <FaMapMarkerAlt className="text-accent text-xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
              <div className="flex-1">
                <p className="font-semibold text-sm uppercase text-gray-200">Dirección</p>
                <p className="text-gray-100">Centro Histórico: Calle 10, Local 5</p>
                <p className="text-gray-100">Zona Rosa: Carrera 7, No. 85-50</p>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <FaPhone className="text-accent text-xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
              <div className="flex-1">
                <p className="font-semibold text-sm uppercase text-gray-200">Teléfono</p>
                <a href="tel:+573228924518" className="text-gray-100 hover:text-accent transition-colors">
                  +57 322 892 4518
                </a>
              </div>
            </div>
            <div className="flex items-start gap-3 group">
              <FaEnvelope className="text-accent text-xl flex-shrink-0 mt-1 group-hover:scale-110 transition-transform duration-300" />
              <div className="flex-1">
                <p className="font-semibold text-sm uppercase text-gray-200">Email</p>
                <a href="mailto:soportearva@gmail.com" className="text-gray-100 hover:text-accent transition-colors">
                  soportearva@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Hours */}
        <div>
          <h4 className="text-lg font-black text-white mb-6 uppercase tracking-wider">
            Horarios
          </h4>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/10">
            <p className="text-4xl font-black text-accent mb-2">12:00</p>
            <p className="text-gray-200 mb-3">a</p>
            <p className="text-4xl font-black text-accent mb-4">21:00</p>
            <p className="text-gray-100 font-semibold border-t border-white/20 pt-4">
              Todos los días
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col justify-between">
          <div>
            <h4 className="text-lg font-black text-white mb-6 uppercase tracking-wider">
              Reservar
            </h4>
            <p className="text-gray-100 text-sm mb-6">
              ¿Listo para vivir una experiencia culinaria única? Haz tu reserva ahora.
            </p>
          </div>
          <button className="w-full px-6 py-3.5 bg-gradient-to-r from-accent to-orange-500 text-primary font-black rounded-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center uppercase tracking-wider">
            Reservar Mesa
          </button>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/20 my-10"></div>

      {/* Bottom Section */}
      <div className="text-center">
        <p className="text-gray-300 text-sm mb-6">
          © 2024 Arva Restaurant. Hecho con <span className="text-accent">❤</span> para momentos extraordinarios.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-300">
          <button className="hover:text-accent transition-colors duration-300 bg-transparent border-none cursor-pointer">
            Privacidad
          </button>
          <span className="text-gray-400">•</span>
          <button className="hover:text-accent transition-colors duration-300 bg-transparent border-none cursor-pointer">
            Términos de Uso
          </button>
          <span className="text-gray-400">•</span>
          <button className="hover:text-accent transition-colors duration-300 bg-transparent border-none cursor-pointer">
            Política de Cookies
          </button>
        </div>
      </div>
    </div>

    <style jsx>{`
      @keyframes blob {
        0% {
          transform: translate(0px, 0px) scale(1);
        }
        33% {
          transform: translate(30px, -50px) scale(1.1);
        }
        66% {
          transform: translate(-20px, 20px) scale(0.9);
        }
        100% {
          transform: translate(0px, 0px) scale(1);
        }
      }

      .animate-blob {
        animation: blob 7s infinite;
      }

      .animation-delay-2000 {
        animation-delay: 2s;
      }
    `}</style>
  </footer>
);

export default Footer;