# 🍽️ Arva Restaurant - Backend API

Backend profesional y bien estructurado para el sistema de reservas del restaurante vegetariano Arva.

## ✨ Características

✅ **Arquitectura Profesional** - MVC + Services Pattern  
✅ **Autenticación JWT** - Seguridad con tokens  
✅ **Validación Robusta** - Input validation en todos los endpoints  
✅ **Manejo de Errores** - Error handler centralizado  
✅ **Logging Completo** - Sistema de logs en consola y archivos  
✅ **Middleware Modular** - Autenticación y autorización separadas  
✅ **Base de Datos MongoDB** - NoSQL escalable  
✅ **Documentación Completa** - API docs y ejemplos de uso  

## 📁 Estructura del Proyecto

```
server/
├── config/              # Configuración centralizada
├── controllers/         # Lógica de controladores
├── services/           # Servicios con lógica reutilizable
├── middleware/         # Middlewares (auth, validación)
├── routes/             # Definición de endpoints
├── models/             # Esquemas de Mongoose
├── constants/          # Constantes de la aplicación
├── utils/              # Utilidades (logger, validadores)
├── seeds/              # Scripts de inicialización
├── app.js              # Configuración de Express
├── server.js           # Punto de entrada
├── STRUCTURE.md        # Documentación de la estructura
└── API_DOCS.md        # Documentación de endpoints
```

## 🚀 Inicio Rápido

### 1. Instalar Dependencias
```bash
cd server
npm install
```

### 2. Configurar Variables de Entorno

Crear archivo `.env`:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/arva-restaurant
JWT_SECRET=ARVA_SECRET_2024_SUPER_SECRETO
JWT_EXPIRE=24h
```

### 3. Iniciar el Servidor

**Desarrollo (con auto-reload):**
```bash
npm run dev
```

**Producción:**
```bash
npm start
```

El servidor estará disponible en `http://localhost:5000`

## 📚 Documentación

- **[STRUCTURE.md](./STRUCTURE.md)** - Arquitectura y estructura del proyecto
- **[API_DOCS.md](./API_DOCS.md)** - Documentación completa de endpoints con ejemplos

## 🔐 Autenticación

### Credenciales Admin Predeterminadas

El sistema crea automáticamente un usuario admin al iniciar:

```
Email: admin@arva.com
Password: admin123
```

### Flujo de Autenticación

1. **Register** - Crear nuevo usuario
```bash
POST /api/auth/register
```

2. **Login** - Obtener token JWT
```bash
POST /api/auth/login
```

3. **Usar Token** - Incluir en header Authorization
```
Authorization: Bearer <token>
```

## 🗄️ Base de Datos

### MongoDB
- **Usuarios**: Autenticación y roles
- **Reservaciones**: Gestión de reservas

El servidor se conecta automáticamente a MongoDB en iniciar.

### Conexión Local
```bash
# Asegurate que MongoDB esté corriendo
mongod
```

## 📡 Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Obtener perfil

### Reservaciones
- `POST /api/reservations` - Crear reserva
- `GET /api/reservations/client/my-reservations` - Mis reservas
- `GET /api/reservations` - Todas (admin)
- `GET /api/reservations/metrics` - Métricas (admin)
- `PUT /api/reservations/:id` - Actualizar (admin)
- `DELETE /api/reservations/:id` - Eliminar (admin)

Ver [API_DOCS.md](./API_DOCS.md) para documentación completa.

## 🧪 Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Ejemplo de Registro
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "usuario",
    "email": "usuario@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### Ejemplo de Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@arva.com",
    "password": "admin123"
  }'
```

## 📊 Logging

El sistema genera logs en archivos:

```
logs/
├── info.log
├── error.log
├── warn.log
└── debug.log
```

Además se imprime en consola para desarrollo.

## 🔧 Configuración Profesional

### Variables de Entorno
Centralizadas en `config/environment.js`:
- NODE_ENV
- PORT
- MONGODB_URI
- JWT_SECRET
- JWT_EXPIRE

### Middleware de Seguridad
- **CORS** - Control de origen
- **JWT Auth** - Autenticación
- **Admin Middleware** - Autorización
- **Error Handler** - Manejo global de errores

### Validación
- Email válido
- Contraseña segura (mínimo 6 caracteres)
- Entrada de reserva completa

## 📦 Dependencias Principales

- **express** - Framework web
- **mongoose** - ODM para MongoDB
- **bcryptjs** - Hash de contraseñas
- **jsonwebtoken** - JWT tokens
- **cors** - Cross-Origin
- **dotenv** - Variables de entorno

## 🎯 Mejores Prácticas

✅ Separación de responsabilidades (MVC + Services)  
✅ Validación en múltiples niveles  
✅ Manejo centralizado de errores  
✅ Logging completo  
✅ Modularidad (fácil de extender)  
✅ Naming consistente  
✅ Documentación clara  
✅ Código seguro (JWT, bcrypt)  

## 🚨 Soporte y Debugging

### Ver Logs en Tiempo Real
```bash
tail -f logs/info.log
tail -f logs/error.log
```

### Debug Mode
Los logs DEBUG están disponibles en `logs/debug.log`

### Variables de Entorno Comunes
```env
NODE_ENV=development    # development o production
PORT=5000               # Puerto del servidor
MONGODB_URI=mongodb://localhost:27017/arva-restaurant
JWT_SECRET=secreto_muy_seguro
JWT_EXPIRE=24h
```

## 🤝 Contribuir

Al agregar nuevas features:

1. **Crear Modelo** en `models/`
2. **Crear Servicio** en `services/`
3. **Crear Controlador** en `controllers/`
4. **Crear Rutas** en `routes/`
5. **Registrar en** `app.js`
6. **Documentar en** `API_DOCS.md`

Ver [STRUCTURE.md](./STRUCTURE.md) para guía detallada.

## 📞 API Health

```bash
GET /api/health
```

Retorna estado de la API y ambiente actual.

---

**Desarrollado con ❤️ para Arva Restaurant**
