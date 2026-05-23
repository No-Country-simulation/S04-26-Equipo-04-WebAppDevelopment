# Guia de Integracion Backend-Frontend

Esta carpeta es el contrato practico para que el Frontend consuma la API del backend Talent. Incluye endpoints, payloads, respuestas esperadas y ejemplos cortos con Axios.

## Estado del MVP

El backend actual cubre el flujo completo del MVP:

1. Autenticacion JWT con roles `profesional` y `empresa`.
2. Diagnostico profesional por categorias.
3. Rutas de aprendizaje con modulos, clases y progreso.
4. CV vivo con perfil, skills validadas y experiencia laboral.
5. Vacantes creadas por empresas.
6. Marketplace de talentos visibles y match por skills.
7. Postulaciones, estados de seleccion y feedback de empresa.

## Base URL

Produccion:

```txt
https://s04-26-equipo-04-webappdevelopment.onrender.com/api
```

Local:

```txt
http://localhost:5187/api
```

Swagger:

```txt
https://s04-26-equipo-04-webappdevelopment.onrender.com/swagger
```

## Autenticacion

Todos los endpoints salvo `POST /Auth/register` y `POST /Auth/login` requieren:

```http
Authorization: Bearer TOKEN_JWT
Content-Type: application/json
```

Roles soportados:

- `profesional`: usuario candidato.
- `empresa`: usuario reclutador/empresa.

El registro publico rechaza cualquier otro rol, incluido `admin`.

## Axios sugerido

```javascript
import axios from 'axios';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://s04-26-equipo-04-webappdevelopment.onrender.com/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token =
    typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
```

## Indice de guias

- [01-Guia-Autenticacion.md](./01-Guia-Autenticacion.md): registro, login, roles y token.
- [02-Guia-Diagnostico.md](./02-Guia-Diagnostico.md): preguntas, inicio y envio de respuestas.
- [03-Guia-Rutas-Aprendizaje.md](./03-Guia-Rutas-Aprendizaje.md): generar ruta, ver clases y completar clases.
- [04-Guia-Perfil-CV-Vivo.md](./04-Guia-Perfil-CV-Vivo.md): perfil, skills validadas y experiencia.
- [05-Guia-Vacantes-Marketplace.md](./05-Guia-Vacantes-Marketplace.md): vacantes, talentos visibles y match.
- [06-Guia-Postulaciones.md](./06-Guia-Postulaciones.md): aplicar a vacantes, listar postulaciones y feedback.

## Flujo recomendado para Frontend

### Profesional

1. `POST /Auth/register` con `tipoUsuario: "profesional"`.
2. `POST /Auth/login` y guardar `token`.
3. Completar diagnostico.
4. `POST /Rutas/generar/{diagnosticoId}`.
5. Completar clases con `PUT /Rutas/progreso/clase/{progresoClaseId}`.
6. Consultar/editar CV vivo con `/Perfiles/mi-perfil`.
7. Cuando `visibleMarketplace` sea `true`, puede postularse a vacantes.
8. Ver oportunidades recomendadas con `GET /Marketplace/mis-oportunidades/match`.

### Empresa

1. `POST /Auth/register` con `tipoUsuario: "empresa"`.
2. `POST /Auth/login` y guardar `token`.
3. Crear vacantes con `POST /Vacantes`.
4. Ver talentos visibles con `GET /Marketplace/talentos`.
5. Ver match de candidatos para una vacante con `GET /Marketplace/vacantes/{vacanteId}/match`.
6. Ver postulantes con `GET /Postulaciones/vacante/{vacanteId}`.
7. Cambiar estado y dejar feedback con `PUT /Postulaciones/{id}/estado`.

## Convenciones

- IDs: `long`/number.
- Niveles: `basico`, `intermedio`, `avanzado`.
- Estado de vacante: `abierta`, `cerrada`.
- Estado de postulacion: `aplicado`, `en_proceso`, `rechazado`, `seleccionado`.
- Las respuestas de error suelen tener forma:

```json
{
  "message": "Descripcion del error"
}
```
