# 2. Autenticación — Register y Login con JWT

## ¿Qué se hizo?

Se implementó el sistema de autenticación completo con **Register** y **Login** usando **JWT (JSON Web Token)** y contraseñas hasheadas con **BCrypt**.

## Nuevos endpoints

| Método | URL | Body (JSON) | Respuesta |
|---|---|---|---|
| POST | `/api/Auth/register` | `{ "nombre", "apellido", "email", "contraseña" }` | `{ id, nombre, email, token }` |
| POST | `/api/Auth/login` | `{ "email", "contraseña" }` | `{ id, nombre, email, token }` |

## ¿Cómo probarlo?

1. Levantar el servidor
2. Ir a `https://localhost:7016/swagger`
3. Buscar la sección **Auth**

### Register

```json
POST /api/Auth/register

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "contraseña": "miPassword123"
}
```

Respuesta exitosa (200):
```json
{
  "id": 1,
  "nombre": "Juan",
  "email": "juan@example.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Si el email ya existe devuelve 400:
```json
{ "message": "El email ya está registrado" }
```

### Login

```json
POST /api/Auth/login

{
  "email": "juan@example.com",
  "contraseña": "miPassword123"
}
```

Respuesta exitosa (200): devuelve el mismo formato con el token.

Si el email o contraseña son incorrectos devuelve 401:
```json
{ "message": "Email o contraseña incorrectos" }
```

## Para el equipo de Frontend

El **token** que devuelve el login/register es un JWT que dura **24 horas**. Para usarlo en peticiones protegidas (cuando las implementemos), hay que enviarlo en el header:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Pueden guardarlo en `localStorage` o en una cookie.

## Archivos creados/modificados

| Archivo | Qué es |
|---|---|
| `DTO/RegisterDTO.cs` | Datos que recibe el register |
| `DTO/LoginDTO.cs` | Datos que recibe el login |
| `DTO/AuthResponseDTO.cs` | Datos que devolvemos (id, nombre, email, token) |
| `Services/IAuthService.cs` | Interfaz del servicio de auth |
| `Services/AuthService.cs` | Lógica: hasheo, verificación, generación de JWT |
| `Controllers/AuthController.cs` | Endpoints /register y /login |
| `Repository/IUsuarioRepository.cs` | Se agregó GetByEmailAsync |
| `Repository/UsuarioRepository.cs` | Se implementó GetByEmailAsync |

## Seguridad

- Las contraseñas se guardan **hasheadas** con BCrypt (nunca en texto plano)
- La clave JWT está en `appsettings.Development.json` (no se sube a Git)
- Los tokens expiran en 24 horas
