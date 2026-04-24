# 🌐 Guía: Conectar MongoDB Atlas

## 📋 Tu Información

**Tu IP Pública:** `191.156.233.46`

## 🚀 Pasos para Configurar MongoDB Atlas

### 1. Crear Cuenta en MongoDB Atlas (si no tienes)
- Ve a: https://www.mongodb.com/cloud/atlas
- Haz clic en "Sign Up"
- Completa el registro con tu email

### 2. Crear un Cluster

1. **Inicia sesión** en MongoDB Atlas
2. **Crea un nuevo proyecto** (o usa uno existente)
3. **Haz clic en "Build a Cluster"**
4. Elige el plan **"Free Tier"** (M0) para desarrollo
5. Selecciona tu región preferida
6. Haz clic en **"Create Cluster"**
7. Espera 5-10 minutos a que se cree

### 3. Crear Usuario de Base de Datos

1. En el panel de MongoDB Atlas, ve a **"Database Access"**
2. Haz clic en **"Add New Database User"**
3. Selecciona **"Scram"** como autenticación
4. Ingresa:
   - **Username:** `arva_admin` (o el que prefieras)
   - **Password:** Genera una contraseña segura (cópia la contraseña)
5. Selecciona "Add User"

### 4. Dar Whitelist a tu IP Pública

⚠️ **IMPORTANTE:** Sin este paso, no podrás conectarte

1. Ve a **"Network Access"** en MongoDB Atlas
2. Haz clic en **"Add IP Address"**
3. Ingresa tu IP pública: **`191.156.233.46`**
4. Elige **"Confirm"**
5. Si necesitas acceso desde cualquier lugar, usa `0.0.0.0/0` (⚠️ solo desarrollo)

### 5. Obtener la Cadena de Conexión

1. Ve a **"Clusters"**
2. Haz clic en **"Connect"** (en tu cluster)
3. Selecciona **"Connect your application"**
4. Elige **"Node.js"** y versión **"4.0 or later"**
5. Verás una URI similar a:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```

6. **Copia la URI** (necesitarás username y password)

## 📝 Actualizar archivo .env

Una vez tengas la información de MongoDB Atlas, actualiza tu `.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<tu_usuario>:<tu_contraseña>@<tu_cluster>.mongodb.net/arva-restaurant?retryWrites=true&w=majority
JWT_SECRET=ARVA_SECRET_2024_SUPER_SECRETO
```

### Ejemplo con datos reales:
```env
PORT=5000
MONGODB_URI=mongodb+srv://arva_admin:password123@cluster0.mongodb.net/arva-restaurant?retryWrites=true&w=majority
JWT_SECRET=ARVA_SECRET_2024_SUPER_SECRETO
```

⚠️ **Reemplaza:**
- `<tu_usuario>` → El usuario que creaste (ej: arva_admin)
- `<tu_contraseña>` → La contraseña (codifica caracteres especiales: `@` → `%40`)
- `<tu_cluster>` → El nombre de tu cluster (ej: cluster0)

## 🔐 Codificar Caracteres Especiales en Contraseña

Si tu contraseña contiene caracteres especiales, codifícalos:

| Carácter | Código |
|----------|--------|
| `@` | `%40` |
| `:` | `%3A` |
| `/` | `%2F` |
| `#` | `%23` |
| `?` | `%3F` |

**Ejemplo:** Si tu contraseña es `pass@word123`
→ En la URI usa: `pass%40word123`

## 🧪 Probar la Conexión

### 1. En el Backend
```bash
cd server
npm install
npm run dev
```

Deberías ver:
```
✅ MongoDB conectado exitosamente
```

### 2. Desde Node.js interactivo
```bash
node

const mongoose = require('mongoose');
await mongoose.connect('mongodb+srv://...');
console.log('Conectado!');
```

### 3. Verificar en MongoDB Atlas
Ve a **"Deployments"** → **"Collections"** y verifica que se crean las colecciones automáticamente.

## 📊 Diferencias: Local vs Atlas

| Aspecto | Local | Atlas |
|---------|-------|-------|
| **URI** | `mongodb://localhost:27017/db` | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| **Setup** | Instalar MongoDB local | Crear cuenta en Atlas |
| **IP** | No requiere | Whitelist necesario |
| **Backup** | Manual | Automático (Atlas M2+) |
| **Disponibilidad** | Solo local | Global |
| **SSL/TLS** | Opcional | Siempre |

## ⚡ Quick Setup (TL;DR)

```bash
# 1. Ve a MongoDB Atlas: https://www.mongodb.com/cloud/atlas
# 2. Crea cuenta y cluster M0 (free)
# 3. Crea usuario: usuario/contraseña
# 4. Whitelist IP: 191.156.233.46
# 5. Copia URI de conexión

# 6. Actualiza .env
PORT=5000
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/arva-restaurant?retryWrites=true&w=majority
JWT_SECRET=ARVA_SECRET_2024_SUPER_SECRETO

# 7. Reinicia servidor
npm run dev
```

## 🆘 Problemas Comunes

### Error: "IP address not whitelisted"
**Solución:** Ve a Network Access en MongoDB Atlas y agrega tu IP

### Error: "Invalid username or password"
**Solución:** Verifica usuario/contraseña. Codifica caracteres especiales en la contraseña

### Error: "Server selection timeout"
**Solución:** 
- Verifica la URI esté correcta
- Recarga el cluster en MongoDB Atlas
- Verifica tu conexión a internet

### Error: "Authentication failed"
**Solución:** 
- Verifica que el usuario existe en "Database Access"
- Verifica las credenciales en la URI

## 📚 Recursos

- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Connection Strings](https://docs.mongodb.com/manual/reference/connection-string/)
- [URI Encoding](https://en.wikipedia.org/wiki/Percent-encoding)

## ✅ Checklist

- [ ] Creé cuenta en MongoDB Atlas
- [ ] Creé un cluster
- [ ] Creé usuario de base de datos
- [ ] Di whitelist a mi IP (191.156.233.46)
- [ ] Copié la URI de conexión
- [ ] Actualicé mi archivo .env
- [ ] Reinicié el servidor
- [ ] Verifiqué que se conecta

---

**Una vez completado, tu base de datos estará en la nube y accesible globalmente.** ☁️
