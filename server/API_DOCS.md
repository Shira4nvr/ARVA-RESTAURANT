# 📚 Documentación API - Arva Restaurant

## 🔐 Autenticación

### Registrar Usuario
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "juan_perez",
  "email": "juan@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}

Response (201):
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "...",
    "username": "juan_perez",
    "email": "juan@example.com"
  }
}
```

### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "admin@arva.com",
  "password": "admin123"
}

Response (200):
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGc...",
  "user": {
    "id": "...",
    "username": "admin",
    "email": "admin@arva.com",
    "role": "admin"
  }
}
```

### Obtener Perfil
```bash
GET /api/auth/profile
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "user": {
    "_id": "...",
    "username": "admin",
    "email": "admin@arva.com",
    "role": "admin"
  }
}
```

## 📋 Reservaciones

### Crear Reserva (Público)
```bash
POST /api/reservations
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@example.com",
  "phone": "+34 666 777 888",
  "branch": "centro",
  "date": "2024-05-15T00:00:00Z",
  "time": "19:30",
  "guests": 4,
  "specialRequests": "Mesa junto a la ventana, por favor"
}

Response (201):
{
  "success": true,
  "message": "Reserva creada exitosamente",
  "reservation": {
    "_id": "...",
    "status": "pending",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

### Obtener Mis Reservas
```bash
GET /api/reservations/my
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "count": 3,
  "reservations": [
    {
      "_id": "...",
      "name": "Juan Pérez",
      "email": "juan@example.com",
      "date": "2024-05-15",
      "time": "19:30",
      "guests": 4,
      "status": "confirmed",
      "branch": "centro"
    }
  ]
}
```

## 💬 Chat (OpenAI)

### Recomendar platos / menú
```bash
POST /api/chat/recommend
Content-Type: application/json

{
  "message": "Quiero algo vegano, sin gluten y no muy picante. ¿Qué me recomiendas?"
}

Response (200):
{
  "success": true,
  "recommendation": "...",
  "reply": "...",
  "response": "..."
}
```

También acepta `prompt` en lugar de `message`:

```json
{ "prompt": "Quiero algo vegano..." }
```

Requiere configurar en el servidor:

- `LLM_PROVIDER` (`openrouter` o `openai`)
- Si `LLM_PROVIDER=openrouter`: `OPENROUTER_API_KEY` y (opcional) `OPENROUTER_MODEL`
- Si `LLM_PROVIDER=openai`: `OPENAI_API_KEY` y (opcional) `OPENAI_MODEL` (por defecto: `gpt-4o-mini`)

### Obtener Todas las Reservas (Admin)
```bash
GET /api/reservations
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "count": 15,
  "reservations": [...]
}
```

### Obtener Métricas (Admin)
```bash
GET /api/reservations/metrics
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "metrics": {
    "total": 45,
    "pending": 12,
    "confirmed": 28,
    "cancelled": 5
  }
}
```

### Obtener Reservas por Estado (Admin)
```bash
GET /api/reservations/status/confirmed
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "count": 28,
  "reservations": [...]
}
```

Estados disponibles: `pending`, `confirmed`, `cancelled`

### Obtener Reservas por Sucursal (Admin)
```bash
GET /api/reservations/branch/centro
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "count": 10,
  "reservations": [...]
}
```

Sucursales disponibles: `centro`, `norte`, `sur`

### Obtener Reserva por ID (Admin)
```bash
GET /api/reservations/:id
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "reservation": {...}
}
```

### Actualizar Reserva (Admin)
```bash
PUT /api/reservations/:id
Authorization: Bearer <admin-token>
Content-Type: application/json

{
  "status": "confirmed"
}

Response (200):
{
  "success": true,
  "message": "Reserva actualizada exitosamente",
  "reservation": {...}
}
```

### Eliminar Reserva (Admin)
```bash
DELETE /api/reservations/:id
Authorization: Bearer <admin-token>

Response (200):
{
  "success": true,
  "message": "Reserva eliminada"
}
```

## 🔗 Rutas Adicionales

### Health Check
```bash
GET /api/health

Response (200):
{
  "success": true,
  "message": "API con salud ✅",
  "environment": "development",
  "timestamp": "2024-04-20T10:30:00Z"
}
```

### API Status
```bash
GET /api

Response (200):
{
  "success": true,
  "message": "Arva Restaurant API funcionando ✅",
  "version": "1.0.0"
}
```

## ❌ Códigos de Error

### 400 - Bad Request
```json
{
  "success": false,
  "message": "Validación fallida",
  "errors": ["Email inválido", "La contraseña debe tener al menos 6 caracteres"]
}
```

### 401 - Unauthorized
```json
{
  "success": false,
  "message": "Token inválido",
  "statusCode": 401
}
```

### 403 - Forbidden
```json
{
  "success": false,
  "message": "Acceso denegado",
  "statusCode": 403
}
```

### 404 - Not Found
```json
{
  "success": false,
  "message": "Reserva no encontrada",
  "statusCode": 404
}
```

### 409 - Conflict
```json
{
  "success": false,
  "message": "El usuario ya existe",
  "statusCode": 409
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "message": "Error en la operación",
  "statusCode": 500
}
```

## 🔑 Autenticación con Token

Todos los endpoints que requieren autenticación esperan el token JWT en el header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

El token expira en **24 horas** y debe ser renovado con un nuevo login.

## 🧪 Testing con cURL

### Registrar usuario
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123","confirmPassword":"test123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@arva.com","password":"admin123"}'
```

### Crear Reserva
```bash
curl -X POST http://localhost:5000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{"name":"Juan","email":"juan@example.com","phone":"+34 666 777 888","branch":"centro","date":"2024-05-15","time":"19:30","guests":4}'
```

### Obtener Reservas (con token)
```bash
curl -X GET http://localhost:5000/api/reservations \
  -H "Authorization: Bearer <token>"
```

## 📊 Estructura de Datos

### Usuario
```json
{
  "_id": "ObjectId",
  "username": "string (único)",
  "email": "string (único)",
  "password": "string (hasheada)",
  "role": "user | admin",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Reservación
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "phone": "string",
  "branch": "centro | norte | sur",
  "date": "Date",
  "time": "string",
  "guests": "number",
  "specialRequests": "string",
  "status": "pending | confirmed | cancelled",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```
