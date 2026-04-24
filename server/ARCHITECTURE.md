# 🏗️ Arquitectura del Sistema

## Flujo de Solicitud HTTP

```
┌─────────────────────────────────────────────────────────────────┐
│                     Cliente (Frontend)                          │
└────────────────────────────┬──────────────────────────────────┘
                             │
                ┌────────────┴────────────┐
                │  Solicitud HTTP + JWT  │
                └────────────┬────────────┘
                             │
         ┌───────────────────▼─────────────────┐
         │         Express (app.js)             │
         │      - CORS                         │
         │      - JSON Parser                  │
         │      - Request Logging              │
         └───────────────────┬─────────────────┘
                             │
         ┌───────────────────▼─────────────────┐
         │        Routes (authRoutes.js)        │
         │    (Mapea path a controlador)        │
         └───────────────────┬─────────────────┘
                             │
    ┌────────────────────────▼───────────────────────┐
    │         Middleware (authMiddleware.js)         │
    │  - Valida token JWT                           │
    │  - Extrae usuario de token                    │
    │  - Pasa a siguiente middleware                │
    └────────────────────────┬───────────────────────┘
                             │
    ┌────────────────────────▼───────────────────────┐
    │    Middleware (adminMiddleware.js) (si aplica) │
    │  - Verifica rol admin                         │
    │  - Deniega acceso si no es admin              │
    └────────────────────────┬───────────────────────┘
                             │
    ┌────────────────────────▼───────────────────────┐
    │    Controller (authController.js)              │
    │  - Validar entrada                            │
    │  - Llamar al servicio                         │
    │  - Formatear respuesta                        │
    └────────────────────────┬───────────────────────┘
                             │
    ┌────────────────────────▼───────────────────────┐
    │  Service (authService.js)                      │
    │  - Lógica de negocio                          │
    │  - Interactuar con BD                         │
    │  - Retornar resultado                         │
    └────────────────────────┬───────────────────────┘
                             │
    ┌────────────────────────▼───────────────────────┐
    │     Model (User.js / Reservation.js)           │
    │  - Esquema Mongoose                           │
    │  - Validaciones de BD                         │
    └────────────────────────┬───────────────────────┘
                             │
    ┌────────────────────────▼───────────────────────┐
    │        MongoDB Database                        │
    │  - Consulta/inserción de datos                │
    └────────────────────────┬───────────────────────┘
                             │
                ┌────────────┴────────────┐
                │    Resultado JSON       │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │   Error Handler (si)    │
                │ - Formatea error        │
                │ - Registra en logs      │
                └────────────┬────────────┘
                             │
         ┌───────────────────▼─────────────────┐
         │      Respuesta HTTP JSON            │
         │   (200, 400, 401, 500, etc)         │
         └───────────────────┬─────────────────┘
                             │
┌────────────────────────────▼──────────────────────────────────┐
│                 Cliente recibe respuesta                       │
└────────────────────────────────────────────────────────────────┘
```

## Estructura de Capas

```
┌──────────────────────────────────────────────────────────────┐
│                      HTTP Layer                              │
│  (Express + CORS + Logging)                                  │
├──────────────────────────────────────────────────────────────┤
│                    Route Layer                               │
│  routes/authRoutes.js          routes/reservationRoutes.js   │
├──────────────────────────────────────────────────────────────┤
│                 Middleware Layer                             │
│  authMiddleware.js  |  adminMiddleware.js  |  errorHandler   │
├──────────────────────────────────────────────────────────────┤
│               Controller Layer                               │
│  controllers/authController.js  controllers/reservationCtrl  │
├──────────────────────────────────────────────────────────────┤
│              Service Layer (Lógica)                          │
│  services/authService.js  |  services/reservationService.js  │
├──────────────────────────────────────────────────────────────┤
│         Utility Layer (Validación, Logging, etc)             │
│ utils/validators.js  utils/logger.js  utils/errorHandler.js │
├──────────────────────────────────────────────────────────────┤
│                   Model Layer                                │
│  models/User.js         |         models/Reservation.js      │
├──────────────────────────────────────────────────────────────┤
│                  Data Layer                                  │
│                  MongoDB Database                            │
└──────────────────────────────────────────────────────────────┘
```

## Flujo de Autenticación

```
1. Usuario en Frontend
   │
   ├─→ POST /api/auth/login (email, password)
   │
   ├─→ authController.login()
   │   │
   │   └─→ AuthService.loginUser(email, password)
   │       │
   │       ├─→ User.findOne({ email })
   │       ├─→ bcrypt.compare(password, hashedPassword)
   │       ├─→ jwt.sign({ id, role }, SECRET)
   │       │
   │       └─→ Retorna { token, user }
   │
   ├─→ Controller retorna token
   │
   └─→ Frontend guarda token en localStorage

2. Solicitudes posteriores
   │
   ├─→ GET /api/auth/profile
   ├─→ Header: Authorization: Bearer <token>
   │
   ├─→ authMiddleware()
   │   │
   │   ├─→ jwt.verify(token, SECRET)
   │   ├─→ User.findById(userId)
   │   ├─→ Asigna req.user = user
   │   │
   │   └─→ next()
   │
   ├─→ Controller procesa con req.user disponible
   │
   └─→ Retorna dato protegido
```

## Flujo de Creación de Reserva

```
POST /api/reservations
│
├─→ Cuerpo JSON validado
│   {
│     name, email, phone, branch,
│     date, time, guests, specialRequests
│   }
│
├─→ reservationController.createReservation()
│   │
│   ├─→ validateReservationInput() ✓
│   │
│   ├─→ ReservationService.createReservation(data)
│   │   │
│   │   ├─→ new Reservation(data)
│   │   ├─→ Set status = "pending"
│   │   ├─→ await reservation.save()
│   │   │
│   │   └─→ Retorna reservation guardada
│   │
│   ├─→ logger.info('Reserva creada')
│   │
│   └─→ Retorna 201 + reservation
│
└─→ Frontend actualiza estado local
```

## Gestión de Errores

```
┌─────────────────────────────────────────────┐
│         Ocurre un error en el código        │
└──────────────────┬──────────────────────────┘
                   │
       ┌───────────▼────────────┐
       │ throw new ApiError()   │
       │ o next(error)          │
       └───────────┬────────────┘
                   │
       ┌───────────▼──────────────────────────┐
       │      Global Error Handler            │
       │   (middleware/errorHandler.js)       │
       │                                      │
       │  - Extrae statusCode                │
       │  - Formatea mensaje                 │
       │  - Registra en logger               │
       │  - Retorna JSON error               │
       └───────────┬──────────────────────────┘
                   │
       ┌───────────▼────────────────┐
       │  Response HTTP de error    │
       │  {                         │
       │    success: false,         │
       │    message: "...",         │
       │    statusCode: 400         │
       │  }                         │
       └───────────┬────────────────┘
                   │
       ┌───────────▼────────────┐
       │   Frontend maneja      │
       │   el error             │
       └────────────────────────┘
```

## Roles y Permisos

```
┌─────────────────────────────────────────┐
│           Usuario Público              │
├─────────────────────────────────────────┤
│  ✓ POST /api/auth/register             │
│  ✓ POST /api/auth/login                │
│  ✓ POST /api/reservations              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│        Usuario Autenticado (user)       │
├─────────────────────────────────────────┤
│  ✓ GET /api/auth/profile               │
│  ✓ GET /api/reservations/client/...    │
│  Requiere: Token JWT válido            │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│       Usuario Admin (admin)             │
├─────────────────────────────────────────┤
│  ✓ GET /api/reservations               │
│  ✓ GET /api/reservations/metrics       │
│  ✓ PUT /api/reservations/:id           │
│  ✓ DELETE /api/reservations/:id        │
│  ✓ GET /api/reservations/status/:s     │
│  Requiere: Token JWT + rol="admin"     │
└─────────────────────────────────────────┘
```

## Logging en tiempo real

```
Eventos que se registran:

┌─ INFO
│  ├─ Usuario registrado
│  ├─ Login exitoso
│  ├─ Reserva creada
│  ├─ Admin creado
│  ├─ MongoDB conectado
│  └─ Servidor iniciado
│
├─ WARN
│  ├─ Acceso denegado (admin)
│  ├─ Cierre de servidor
│  └─ Señal recibida
│
├─ ERROR
│  ├─ Error de conexión MongoDB
│  ├─ Validación fallida
│  ├─ Token inválido
│  ├─ Recurso no encontrado
│  └─ Error de servidor
│
└─ DEBUG
   ├─ Detalles de validación
   ├─ Datos de consulta
   └─ Trazas de error completas
```

## Estructura de Base de Datos

```
MongoDB
│
├─ Database: arva-restaurant
│  │
│  ├─ Collection: users
│  │  └─ Documentos:
│  │     {
│  │       _id: ObjectId,
│  │       username: "admin",
│  │       email: "admin@arva.com",
│  │       password: "bcrypted_hash",
│  │       role: "admin",
│  │       createdAt: Date,
│  │       updatedAt: Date
│  │     }
│  │
│  └─ Collection: reservations
│     └─ Documentos:
│        {
│          _id: ObjectId,
│          name: "Juan",
│          email: "juan@example.com",
│          phone: "+34 666 777 888",
│          branch: "centro",
│          date: Date,
│          time: "19:30",
│          guests: 4,
│          specialRequests: "...",
│          status: "pending|confirmed|cancelled",
│          createdAt: Date,
│          updatedAt: Date
│        }
```

## Flujo de Desarrollo

```
1. Recibir Requisito
   │
2. Crear Modelo (models/)
   │
3. Crear Servicio (services/)
   │ - Lógica de negocio
   │ - Reutilizable
   │
4. Crear Controlador (controllers/)
   │ - Manejo HTTP
   │ - Validación entrada
   │ - Llamar servicio
   │
5. Crear Rutas (routes/)
   │ - Mapear path a controlador
   │ - Aplicar middleware
   │
6. Registrar en app.js
   │ - app.use('/api/...', routes)
   │
7. Documentar (API_DOCS.md)
   │ - Endpoint
   │ - Parámetros
   │ - Ejemplos
   │
8. Testear
   │ - Manual (curl)
   │ - Automatizado (tests)
   │
└─ Producto Listo
```

---

**Esta arquitectura garantiza mantenibilidad, escalabilidad y profesionalismo.** 🏆
