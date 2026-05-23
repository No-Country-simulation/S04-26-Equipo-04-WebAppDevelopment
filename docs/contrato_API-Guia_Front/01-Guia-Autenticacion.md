# Guia 01: Autenticacion y Roles

## Resumen

La API usa JWT. El frontend debe guardar el token devuelto por login/registro y enviarlo como `Authorization: Bearer <token>` en cada request protegida.

Roles publicos permitidos:

- `profesional`
- `empresa`

No se puede registrar un usuario `admin` desde el frontend.

## 1. Registrar usuario

**Endpoint:** `POST /api/Auth/register`

**Auth:** no requiere token.

### Body

```json
{
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juan@test.com",
  "password": "password123",
  "tipoUsuario": "profesional"
}
```

Para una empresa:

```json
{
  "nombre": "Talent",
  "apellido": "Empresa",
  "email": "rrhh@empresa.com",
  "password": "password123",
  "tipoUsuario": "empresa"
}
```

### Respuesta 200

```json
{
  "id": 1,
  "nombre": "Juan",
  "email": "juan@test.com",
  "token": "eyJhbGciOi..."
}
```

### Errores comunes

```json
{ "message": "El email ya esta registrado" }
```

```json
{ "message": "El tipo de usuario especificado no es valido (solo 'profesional' o 'empresa')." }
```

### Ejemplo React

```javascript
const register = async (payload) => {
  const { data } = await api.post('/Auth/register', payload);
  localStorage.setItem('token', data.token);
  return data;
};
```

## 2. Login

**Endpoint:** `POST /api/Auth/login`

**Auth:** no requiere token.

### Body

```json
{
  "email": "juan@test.com",
  "password": "password123"
}
```

### Respuesta 200

```json
{
  "id": 1,
  "nombre": "Juan",
  "email": "juan@test.com",
  "token": "eyJhbGciOi..."
}
```

### Error 401

```json
{ "message": "Email o contrasena incorrectos" }
```

### Ejemplo React

```javascript
const login = async (email, password) => {
  const { data } = await api.post('/Auth/login', { email, password });
  localStorage.setItem('token', data.token);
  return data;
};
```

## 3. Logout

El backend no guarda sesion. Para cerrar sesion:

```javascript
localStorage.removeItem('token');
```

## 4. Uso de roles en Frontend

El backend valida roles con el token. El frontend puede guardar el tipo de usuario segun el formulario de registro/login, o decodificar el JWT si necesita pintar vistas distintas.

Recomendacion simple para MVP:

- Si el usuario se registro como `profesional`, mostrar diagnostico, ruta, CV vivo y vacantes.
- Si se registro como `empresa`, mostrar gestion de vacantes, marketplace y postulantes.
