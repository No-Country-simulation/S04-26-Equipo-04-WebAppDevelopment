# Guía 01: Autenticación y Usuarios

Todos los endpoints (excepto Login y Registro) requieren que el usuario esté autenticado mediante un Token JWT.

## 1. Registro de Usuario

**Endpoint:** `POST /api/Auth/register`  
**Auth:** ❌ No requiere token.

### Payload (Body) esperado:
```json
{
  "nombre": "Juan",
  "apellido": "Perez",
  "email": "juan@test.com",
  "password": "password123",
  "tipoUsuario": "profesional" 
}
```
*Nota: Para el MVP inicial, `tipoUsuario` siempre debe ser `"profesional"`.*

### Ejemplo de implementación (React)
```javascript
const handleRegister = async (datos) => {
  try {
    const response = await api.post('/Auth/register', datos);
    alert('Usuario registrado con éxito. Ahora podés iniciar sesión.');
  } catch (error) {
    console.error('Error al registrar:', error.response?.data);
  }
};
```

---

## 2. Iniciar Sesión (Login)

**Endpoint:** `POST /api/Auth/login`  
**Auth:** ❌ No requiere token.

### Payload (Body) esperado:
```json
{
  "email": "juan@test.com",
  "password": "password123"
}
```

### Respuesta del servidor:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Ejemplo de implementación (React)
Es crítico que al recibir el token, lo guardes en el `localStorage` o en cookies para que el Interceptor de Axios (ver configuración inicial) lo pueda usar.

```javascript
const handleLogin = async (email, password) => {
  try {
    const response = await api.post('/Auth/login', { email, password });
    const { token } = response.data;
    
    // Guardar token en el navegador
    localStorage.setItem('token', token);
    
    // Redirigir al inicio o al diagnóstico
    router.push('/dashboard');
  } catch (error) {
    alert('Credenciales incorrectas');
  }
};
```

## 3. Cerrar Sesión (Logout)

Dado que usamos JWT, el backend no guarda estado de sesión. Para desloguear a un usuario, el Frontend simplemente debe **eliminar el token** del navegador.

```javascript
const handleLogout = () => {
  localStorage.removeItem('token');
  router.push('/login');
};
```
