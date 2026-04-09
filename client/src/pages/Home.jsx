import { FaUtensils, FaMapMarkerAlt, FaLeaf, FaHeart, FaStar, FaFire } from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

const Home = () => {
  const { user } = useAuth();

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-content fade-in-up">
          <h1 className="mb-8">
            Bienvenido a <span className="hero-highlight block">ARVA Gastronómica</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
            La experiencia culinaria vegetariana más cautivadora de la ciudad. 
            Sabores auténticos, ingredientes frescos y una atmósfera única.
          </p>
          <Link to={user ? "/reservation" : "/login"} className="cta-button">
            <FaUtensils />
            Reservar Mesa Ahora
          </Link>
        </div>
      </section>

      {/* About Section - Por qué elegir Arva */}
      <section className="section bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="container">
          <h2 className="section-title fade-in-up">¿Por qué elegir ARVA?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="card p-8 text-center hover:shadow-2xl transition-all duration-300 fade-in-up">
              <FaLeaf className="text-5xl text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-3">100% Vegetariano</h3>
              <p className="text-gray-600 leading-relaxed">Menú cuidadosamente diseñado con opciones vegetarianas creativas y deliciosas que satisfacen todos los paladares.</p>
            </div>
            
            <div className="card p-8 text-center hover:shadow-2xl transition-all duration-300 fade-in-up">
              <FaFire className="text-5xl text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-3">Ingredientes Frescos</h3>
              <p className="text-gray-600 leading-relaxed">Utilizamos solo ingredientes de la más alta calidad, seleccionados diariamente de proveedores locales confiables.</p>
            </div>
            
            <div className="card p-8 text-center hover:shadow-2xl transition-all duration-300 fade-in-up">
              <FaHeart className="text-5xl text-accent mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-3">Pasión Culinaria</h3>
              <p className="text-gray-600 leading-relaxed">Nuestros chefs preparan cada plato con amor y dedicación para crear experiencias gastronómicas memorables.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="section bg-white">
        <div className="container">
          <h2 className="section-title fade-in-up">Beneficios de la Cocina Vegetariana</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="fade-in-up">
              <div className="space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-white">
                      <FaStar className="text-xl" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Salud y Bienestar</h4>
                    <p className="text-gray-600">Dietas ricas en nutrientes que promueven digestión saludable y energía sostenida.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-white">
                      <FaLeaf className="text-xl" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Sostenibilidad</h4>
                    <p className="text-gray-600">Comprometidos con el planeta. Nuestra cocina vegetariana reduce la huella de carbono.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-accent text-white">
                      <FaHeart className="text-xl" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-primary mb-1">Amor por los Animales</h4>
                    <p className="text-gray-600">Respetamos toda forma de vida. Un menú ético sin sacrificar sabor ni excelencia.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="fade-in-up">
              <div className="bg-gradient-to-br from-accent to-orange-500 rounded-2xl p-8 text-white shadow-xl">
                <h3 className="text-3xl font-bold mb-6">Experiencia Premium</h3>
                <p className="text-lg mb-8 leading-relaxed">
                  En ARVA no solo comes, vives una experiencia. Nuestro ambiente cálido, servicio atento y auténtica gastronomía vegetariana crean momentos inolvidables que querrás compartir.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Ambiente sofisticado y acogedor</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Personal capacitado y atento</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Presentación artística en cada plato</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✓</span>
                    <span>Opciones para todos los gustos</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Especialidades Section */}
      <section className="section bg-gray-50">
        <div className="container">
          <h2 className="section-title fade-in-up">Nuestras Especialidades</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 fade-in-up">
              <div className="text-6xl mb-4">🥗</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Entradas Vegetarianas</h3>
              <p className="text-gray-600 mb-4">Perfectas para despertar tu paladar con sabores frescos y creativos antes del plato principal.</p>
              <Link to="/menu" className="text-accent font-bold hover:text-orange-500 transition">
                Ver Entradas →
              </Link>
            </div>

            <div className="card p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 fade-in-up">
              <div className="text-6xl mb-4">🍝</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Platos Principales</h3>
              <p className="text-gray-600 mb-4">Nuestros creaciones estrella: desde risottos hasta lasañas, cada plato es una obra de arte culinaria.</p>
              <Link to="/menu" className="text-accent font-bold hover:text-orange-500 transition">
                Ver Principales →
              </Link>
            </div>

            <div className="card p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 fade-in-up">
              <div className="text-6xl mb-4">🍰</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Postres y Bebidas</h3>
              <p className="text-gray-600 mb-4">Cierra tu experiencia con dulces deliciosos y bebidas artesanales que complementan a la perfección.</p>
              <Link to="/menu" className="text-accent font-bold hover:text-orange-500 transition">
                Ver Postres →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;