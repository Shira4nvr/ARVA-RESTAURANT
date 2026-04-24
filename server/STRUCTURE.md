# Backend - Arva Restaurant API

## 📁 Estructura del Proyecto

```
server/
├── config/                 # Configuración de la aplicación
│   ├── environment.js     # Variables de entorno centralizadas
│   └── database.js        # Configuración de conexión a MongoDB
│
├── controllers/            # Controladores (lógica de negocio)
│   ├── authController.js  # Lógica de autenticación
│   └── reservationController.js  # Lógica de reservaciones
│
├── services/              # Servicios (lógica reutilizable)
│   ├── authService.js     # Servicios de autenticación
│   └── reservationService.js  # Servicios de reservaciones
│
├── middleware/            # Middlewares (interceptores)
│   ├── authMiddleware.js  # Validación de tokens JWT
│   └── adminMiddleware.js # Validación de permisos admin
│
├── routes/                # Rutas de la API
│   ├── authRoutes.js      # Rutas de autenticación
│   └── reservationRoutes.js  # Rutas de reservaciones
│
├── models/                # Modelos de Mongoose
│   ├── User.js            # Esquema de Usuario
│   └── Reservation.js     # Esquema de Reservación
│
├── constants/             # Constantes de la aplicación
│   └── status.js          # Códigos de estado, roles y mensajes
│
├── utils/                 # Utilidades
│   ├── logger.js          # Sistema de logging
│   ├── errorHandler.js    # Manejo centralizado de errores
│   └── validators.js      # Validadores de entrada
│
├── seeds/                 # Scripts de inicialización
│   └── createAdmin.js     # Crear usuario admin automáticamente
│
├── app.js                 # Configuración de Express
├── server.js              # Punto de entrada
├── .env                   # Variables de entorno
└── package.json           # Dependencias
```

## 🚀 Características de la Estructura

### 1. **Separación de Responsabilidades**
- **Controllers**: Manejan las solicitudes HTTP
- **Services**: Contienen la lógica de negocio reutilizable
- **Models**: Definen la estructura de datos
- **Middleware**: Validan y autentican las solicitudes

### 2. **Configuración Centralizada**
- Variables de entorno en `config/environment.js`
- Conexión a BD en `config/database.js`
- Constantes de la app en `constants/status.js`

### 3. **Manejo de Errores Profesional**
- `ApiError` personalizado
- Middleware global de manejo de errores
- Respuestas consistentes en toda la API

### 4. **Logging Completo**
- Logs en consola y en archivos
- Registra info, warnings y errores
- Archivos de logs en `logs/`

### 5. **Validación Robusta**
- Validadores reutilizables
- Mensajes de error claros
- Validación tanto en controladores como en servicios

## 📝 Endpoints API

### Autenticación (`/api/auth`)
- `POST /register` - Registrar nuevo usuario
- `POST /login` - Login con email y contraseña
- `GET /profile` - Obtener perfil (requiere auth)

### Reservaciones (`/api/reservations`)
- `POST /` - Crear nueva reserva (público)
- `GET /client/my-reservations` - Obtener mis reservas (requiere auth)
- `GET /` - Obtener todas (admin)
- `GET /metrics` - Métricas de reservas (admin)
- `GET /status/:status` - Por estado (admin)
- `GET /branch/:branch` - Por sucursal (admin)
- `GET /:id` - Por ID (admin)
- `PUT /:id` - Actualizar (admin)
- `DELETE /:id` - Eliminar (admin)

## 🔧 Variables de Entorno

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/arva-restaurant
JWT_SECRET=ARVA_SECRET_2024_SUPER_SECRETO
JWT_EXPIRE=24h
```

## 🎯 Beneficios de esta Estructura

✅ **Fácil de mantener** - Cada archivo tiene una única responsabilidad  
✅ **Escalable** - Agregar nuevas features es simple  
✅ **Testeable** - Separación permite testing unitario fácil  
✅ **Profesional** - Sigue estándares de la industria (MVC + Services)  
✅ **Documentado** - Código auto-explicativo con comentarios  
✅ **Seguro** - Validación y autenticación centralizada  
✅ **Moniteable** - Sistema de logging completo  

## 📚 Cómo Agregar Nuevas Features

### 1. Crear el Modelo (models/)
```javascript
// models/NewModel.js
const schema = new mongoose.Schema({ ... });
```

### 2. Crear el Servicio (services/)
```javascript
// services/newService.js
class NewService {
  static async create(data) { ... }
}
```

### 3. Crear el Controlador (controllers/)
```javascript
// controllers/newController.js
class NewController {
  static async create(req, res, next) { ... }
}
```

### 4. Crear las Rutas (routes/)
```javascript
// routes/newRoutes.js
router.post('/', NewController.create);
```

### 5. Registrar en app.js
```javascript
app.use('/api/new', require('./routes/newRoutes'));
```

## 🧪 Testing

Para testear cada componente:
- **Services**: Pruebas unitarias de lógica
- **Controllers**: Pruebas de integración HTTP
- **Middleware**: Pruebas de autenticación

## 📊 Base de Datos

### Usuarios
- username (único)
- email (único)
- password (hasheada)
- role (user/admin)
- timestamps

### Reservaciones
- name, email, phone
- branch, date, time
- guests, specialRequests
- status (pending/confirmed/cancelled)
- timestamps
