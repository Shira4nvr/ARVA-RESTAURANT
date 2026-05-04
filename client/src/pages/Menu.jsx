const Menu = () => {
  const menuItems = [
    { name: '🥗 Entradas Vegetarianas', items: [
      { name: 'Ensalada Fresca de la Casa', price: '$45.000', desc: 'Mix de lechugas, tomate, pepino, remolacha y vinagreta casera' },
      { name: 'Bruschetta de Tomate y Albahaca', price: '$35.000', desc: 'Pan tostado con tomate fresco, albahaca y aceite premium' },
      { name: 'Tabla de Quesos Artesanales', price: '$75.000', desc: 'Selección de quesos colombianos e importados con frutas' },
      { name: 'Croquetas de Hongos y Queso', price: '$55.000', desc: 'Hongos frescos con queso gruyere y salsa champiñón' },
      { name: 'Tabla Mixta Vegetariana', price: '$85.000', desc: 'Hummus, quesos, aceitunas, frutas secas y panes tostados' }
    ]},
    { name: '🌿 Platos Principales', items: [
      { name: 'Risotto de Champiñones', price: '$95.000', desc: 'Arroz cremoso con hongos frescos, queso parmesano y trufa' },
      { name: 'Pasta Primavera', price: '$85.000', desc: 'Tallarín fresco con verduras de temporada y salsa de pesto' },
      { name: 'Buddha Bowl Nutritivo', price: '$78.000', desc: 'Quinua, garbanzos, espinacas, batata y salsa tahini' },
      { name: 'Filete de Salmón', price: '$155.000', desc: 'Salmón a la plancha con limón, aceitunas y vegetales' },
      { name: 'Pechuga de Pollo Orgánica', price: '$125.000', desc: 'Pechuga grill con chimichurri, papas y brócoli' },
      { name: 'Lasaña Vegetariana', price: '$80.000', desc: 'Capas de pasta, verduras frescas y queso derretido' },
      { name: 'Coliflor Asada al Horno', price: '$72.000', desc: 'Coliflor con especias, tahini y granadas' },
      { name: 'Ravioles de Espinaca', price: '$88.000', desc: 'Pasta casera rellena de espinaca, queso y nueces con salsa de champiñones' }
    ]},
    { name: '🍰 Postres y Bebidas', items: [
      { name: 'Tiramisú Vegano', price: '$35.000', desc: 'Clásico italiano adaptado sin productos animales' },
      { name: 'Cheesecake Vegano', price: '$40.000', desc: 'Base de frutos secos con salsa de frutos rojos' },
      { name: 'Brownie de Chocolate 70%', price: '$38.000', desc: 'Con helado de vainilla y frutos secos' },
      { name: 'Mousse de Chocolate Oscuro', price: '$32.000', desc: 'Chocolate belga con aire de cacao sin lácteos' },
      { name: 'Flan de Coco', price: '$30.000', desc: 'Cremoso con leche de coco y salsa de caramelo' },
      { name: 'Tarta de Frutos Rojos', price: '$42.000', desc: 'Frutos frescos con crema batida y granola' },
      { name: 'Vino Tinto Orgánico (Copa)', price: '$55.000', desc: 'Selección de vinos naturales' },
      { name: 'Cerveza Artesanal Craft', price: '$28.000', desc: 'Producción local colombiana' },
      { name: 'Café Espresso Colombiano', price: '$12.000', desc: 'Café de origen con cuerpo y aroma excepcionales' }
    ]}
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container">
        <h1 className="text-5xl font-bold text-center mb-20 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
          🍽️ Nuestro Menú
        </h1>

        <div className="section-surface">
          <div className="grid md:grid-cols-3 gap-8">
            {menuItems.map((category, idx) => (
              <div key={idx} className="card p-8">
                <h2 className="text-2xl font-bold mb-8 text-primary border-b pb-4">
                  {category.name}
                </h2>
                <div className="space-y-6">
                  {category.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start group">
                      <div>
                        <h3 className="font-bold text-lg group-hover:text-primary transition">{item.name}</h3>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                      <span className="text-2xl font-bold text-primary ml-4">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;