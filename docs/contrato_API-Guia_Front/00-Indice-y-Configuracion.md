# Guía de Integración Backend-Frontend (Next.js / React)

Esta carpeta contiene la documentación oficial de los endpoints desarrollados en el Backend y ejemplos prácticos de cómo consumirlos desde el Frontend utilizando **Next.js / React**.

## 🚀 Estado Actual del MVP

Hasta el momento, el Backend está **desplegado en vivo en Render** y tiene implementados y asegurados los siguientes módulos:

1. **Módulo 0: Autenticación y Seguridad (JWT)** - Registro, Login y Roles.
2. **Módulo 3: Diagnóstico Profesional** - Cuestionario adaptativo, cálculo de puntajes y radar de habilidades.

*(Nota: Los Módulos 1 y 2 fueron conceptuales, y los Módulos 4 en adelante están en desarrollo).*

## 🌐 Acceso a Swagger (Documentación Viva)

Hemos habilitado **Swagger** en producción para que el equipo de Front pueda ver y probar los endpoints directamente desde el navegador, sin instalar nada.

👉 **Link de Swagger:** [https://s04-26-equipo-04-webappdevelopment.onrender.com/swagger](https://s04-26-equipo-04-webappdevelopment.onrender.com/swagger)

*Importante: Acordate de usar el botón verde "Authorize" en Swagger para pegarle el Token JWT después de loguearte, sino te va a dar error 401 Unauthorized.*

## ⚙️ Configuración Inicial Sugerida (Axios)

Dado que toda la API a partir del Diagnóstico está protegida, te recomendamos usar `axios` y configurar un **Interceptor** en tu proyecto Next.js. Esto hará que no tengas que escribir el Token manualmente en cada petición.

### 1. Instalar Axios
```bash
npm install axios
```

### 2. Crear instancia de API (`src/lib/api.js` o `src/services/api.ts`)
```javascript
import axios from 'axios';

// Usar variables de entorno en Next.js (.env.local) para separar dev de prod
// URL de Producción: 'https://s04-26-equipo-04-webappdevelopment.onrender.com/api'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://s04-26-equipo-04-webappdevelopment.onrender.com/api'; 

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para inyectar el token JWT en cada petición automáticamente
api.interceptors.request.use((config) => {
  // Asumiendo que guardás el token en localStorage después del login
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 📂 Índice de Documentación

A continuación, revisá los siguientes archivos para ver los contratos de datos y ejemplos de código:

- [01-Guia-Autenticacion.md](./01-Guia-Autenticacion.md) - Cómo registrar y loguear usuarios.
- [02-Guia-Diagnostico.md](./02-Guia-Diagnostico.md) - Cómo renderizar las preguntas y enviar las respuestas.
