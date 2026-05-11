# 🚀 Talent API — Guía para Frontend

**Base URL (producción):**
```
https://s04-26-equipo-04-webappdevelopment.onrender.com
```

**Base URL (local):**
```
http://localhost:5187
```

> ⚠️ **Nota:** Render en plan gratuito puede tardar ~30 segundos en responder la primera vez (cold start). Después responde rápido.

---

## 📌 Resumen de Endpoints

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `POST` | `/api/Auth/register` | Registrar un usuario nuevo | ❌ No |
| `POST` | `/api/Auth/login` | Iniciar sesión | ❌ No |
| `GET` | `/api/Usuarios` | Listar todos los usuarios | ❌ No |
| `GET` | `/api/Usuarios/{id}` | Obtener un usuario por ID | ❌ No |
| `POST` | `/api/Usuarios` | Crear un usuario | ❌ No |
| `PUT` | `/api/Usuarios/{id}` | Actualizar un usuario | ❌ No |
| `DELETE` | `/api/Usuarios/{id}` | Eliminar un usuario | ❌ No |

---

## 🔐 Autenticación

### POST `/api/Auth/register`

Registra un usuario nuevo y devuelve un token JWT.

**Request:**
```json
{
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juan@example.com",
  "password": "miPassword123"
}
```

**Response (200):**
```json
{
  "id": 1,
  "nombre": "Juan",
  "email": "juan@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores posibles:**

| Código | Caso |
|--------|------|
| `400` | `{ "message": "El email ya está registrado" }` |

---

### POST `/api/Auth/login`

Inicia sesión y devuelve un token JWT.

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "miPassword123"
}
```

**Response (200):**
```json
{
  "id": 1,
  "nombre": "Juan",
  "email": "juan@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Errores posibles:**

| Código | Caso |
|--------|------|
| `401` | `{ "message": "Email o contraseña incorrectos" }` |

---

## 👤 Usuarios (CRUD)

### GET `/api/Usuarios`

Devuelve la lista de todos los usuarios.

**Response (200):**
```json
[
  {
    "id": 1,
    "nombre": "Juan",
    "apellido": "Perez",
    "email": "juan@example.com"
  },
  {
    "id": 2,
    "nombre": "Maria",
    "apellido": "Lopez",
    "email": "maria@example.com"
  }
]
```

---

### GET `/api/Usuarios/{id}`

Devuelve un usuario por su ID.

**Response (200):**
```json
{
  "id": 1,
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juan@example.com"
}
```

**Errores posibles:**

| Código | Caso |
|--------|------|
| `404` | El usuario con ese ID no existe |

---

### POST `/api/Usuarios`

Crea un usuario nuevo (con la contraseña hasheada).

**Request:**
```json
{
  "nombre": "Carlos",
  "apellido": "Garcia",
  "email": "carlos@example.com",
  "password": "superSegura123"
}
```

**Response (201):**
```json
{
  "id": 3,
  "nombre": "Carlos",
  "apellido": "Garcia",
  "email": "carlos@example.com"
}
```

**Errores posibles:**

| Código | Caso |
|--------|------|
| `400` | `{ "message": "El email ya está registrado" }` |
| `400` | Validación: nombre, apellido, email o password vacíos / email inválido / password < 6 caracteres |

---

### PUT `/api/Usuarios/{id}`

Actualiza los datos de un usuario. La contraseña es **opcional**: si no la mandás, se mantiene la anterior.

**Request:**
```json
{
  "nombre": "Carlos Editado",
  "apellido": "Garcia",
  "email": "carlos_nuevo@example.com",
  "password": "nuevaPassword456"
}
```

**Response (200):**
```json
{
  "id": 3,
  "nombre": "Carlos Editado",
  "apellido": "Garcia",
  "email": "carlos_nuevo@example.com"
}
```

**Errores posibles:**

| Código | Caso |
|--------|------|
| `404` | El usuario con ese ID no existe |
| `400` | `{ "message": "Ese email ya pertenece a otro usuario" }` |

---

### DELETE `/api/Usuarios/{id}`

Elimina un usuario.

**Response:** `204 No Content` (sin body)

**Errores posibles:**

| Código | Caso |
|--------|------|
| `404` | El usuario con ese ID no existe |

---

## 💻 Ejemplo de consumo desde React / Next.js

### Registro

```typescript
const BASE_URL = "https://s04-26-equipo-04-webappdevelopment.onrender.com";

const register = async (nombre: string, apellido: string, email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, apellido, email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const data = await res.json();
  // data = { id, nombre, email, token }

  // Guardar el token para usarlo después
  localStorage.setItem("token", data.token);
  return data;
};
```

### Login

```typescript
const login = async (email: string, password: string) => {
  const res = await fetch(`${BASE_URL}/api/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message);
  }

  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data;
};
```

### Listar usuarios

```typescript
const getUsuarios = async () => {
  const res = await fetch(`${BASE_URL}/api/Usuarios`);
  return await res.json();
};
```

---

## 🔧 Swagger (para probar manualmente)

Abrí en el navegador:

- **Producción:** https://s04-26-equipo-04-webappdevelopment.onrender.com/swagger/index.html
- **Local:** http://localhost:5187/swagger/index.html

---

## 📦 Stack del Backend

- **.NET 10** con C#
- **Entity Framework Core** (ORM)
- **PostgreSQL** en Supabase
- **BCrypt** para hasheo de contraseñas
- **JWT** para autenticación
- **Swagger** para documentación

---

## ⚙️ Levantar el backend en local

1. Clonar el repo
2. Abrir una terminal en `backend/Talent/Talent.API`
3. Ejecutar:
   ```bash
   dotnet run
   ```
4. Probar en: `http://localhost:5187/swagger/index.html`
