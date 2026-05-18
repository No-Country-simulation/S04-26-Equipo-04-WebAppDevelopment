# Guía de Integración Backend-Frontend (Next.js / React)

Esta carpeta contiene la documentación oficial de los endpoints desarrollados en el Backend y ejemplos prácticos de cómo consumirlos desde el Frontend utilizando **Next.js / React**.

## 🚀 Estado Actual del MVP

Hasta el momento, el Backend tiene implementados y asegurados los siguientes módulos:

1. **Módulo 0: Autenticación y Seguridad (JWT)** - Registro, Login y Roles.
2. **Módulo 3: Diagnóstico Profesional** - Cuestionario adaptativo, cálculo de puntajes y radar de habilidades.

*(Nota: Los Módulos 1 y 2 fueron conceptuales, y los Módulos 4 en adelante están en desarrollo).*

## ⚙️ Configuración Inicial Sugerida (Axios)

Dado que toda la API a partir del Diagnóstico está protegida, te recomendamos usar `axios` y configurar un **Interceptor** en tu proyecto Next.js. Esto hará que no tengas que escribir el Token manualmente en cada petición.

### 1. Instalar Axios
```bash
npm install axios
```

### 2. Crear instancia de API (`src/lib/api.js` o `src/services/api.ts`)
```javascript
import axios from 'axios';

// La URL base donde corre el backend localmente
const API_URL = 'http://localhost:5187/api'; 

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
