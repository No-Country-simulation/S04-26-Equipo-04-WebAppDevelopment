# Guía de Implementación del Módulo de Empresa (Reclutador)

En este documento vas a encontrar todo el detalle de cómo implementar las funcionalidades para el rol de **Empresa (Reclutador)**. Se incluyen las reglas de negocio, los endpoints detallados y los formatos JSON exactos de entrada y salida para que puedas integrarlos fácilmente con el frontend.

---

## 📌 1. Flujo de Autenticación y Registro

Para operar como una empresa, el usuario debe poseer el rol `"empresa"`. Al registrarse o iniciar sesión, el servidor genera un token JWT que expira en 24 horas. Este token contiene los claims necesarios (ID del usuario, Email, Nombre y Rol) que el backend utiliza para validar los accesos.

### Registro de Empresa
* **Endpoint:** `POST /api/Auth/register`
* **Cabeceras:** `Content-Type: application/json`
* **JSON de Envío:**
```json
{
  "nombre": "Tech Solutions",
  "apellido": "Reclutamiento",
  "email": "contacto@techsolutions.com",
  "password": "PasswordSegura123",
  "tipoUsuario": "empresa"
}
```
* **JSON de Respuesta (200 OK):**
```json
{
  "id": 12,
  "nombre": "Tech Solutions",
  "email": "contacto@techsolutions.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMiIsImVtYWlsIjoiY29udGFjdG9AdGVjaHNvbHV0aW9ucy5jb20iLCJuYW1lIjoiVGVjaCBTb2x1dGlvbnMiLCJyb2xlIjoiZW1wcmVzYSIsImV4cCI6MTc4MDA3NTIwMH0...",
  "hizoDiagnostico": false
}
```

### Inicio de Sesión
* **Endpoint:** `POST /api/Auth/login`
* **Cabeceras:** `Content-Type: application/json`
* **JSON de Envío:**
```json
{
  "email": "contacto@techsolutions.com",
  "password": "PasswordSegura123"
}
```
* **JSON de Respuesta (200 OK):**
```json
{
  "id": 12,
  "nombre": "Tech Solutions",
  "email": "contacto@techsolutions.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "hizoDiagnostico": false
}
```

> [!IMPORTANT]  
> Todas las peticiones subsiguientes a rutas protegidas deben llevar la cabecera:  
> `Authorization: Bearer <JWT_TOKEN>`

---

## 📌 2. Gestión de Vacantes (Job Posts)

Las empresas pueden crear, listar, modificar y eliminar las vacantes que publican.

### Listar Mis Vacantes (Como Empresa)
Retorna todas las vacantes publicadas por la empresa autenticada.
* **Endpoint:** `GET /api/Vacantes/mis-vacantes`
* **Autorización:** Rol `empresa` requerido.
* **JSON de Respuesta (200 OK):**
```json
[
  {
    "id": 5,
    "empresaId": 12,
    "empresaNombre": "Tech Solutions",
    "titulo": "Analista de Operaciones Junior",
    "descripcion": "Buscamos un analista para soporte de operaciones e informes.",
    "ubicacion": "Buenos Aires, Argentina",
    "modalidad": "hibrido",
    "rangoSalarial": "$300.000 - $400.000 ARS",
    "estado": "abierta",
    "fechaPublicacion": "2026-05-26T12:00:00Z",
    "skillsRequeridas": [
      {
        "id": 14,
        "skillId": 2,
        "skillNombre": "Gestión del tiempo y Planificación",
        "categoriaNombre": "Habilidades Blandas",
        "nivelRequerido": "intermedio"
      },
      {
        "id": 15,
        "skillId": 5,
        "skillNombre": "Planillas de Cálculo (Excel/Google Sheets)",
        "categoriaNombre": "Sistemas y Tecnología",
        "nivelRequerido": "basico"
      }
    ]
  }
]
```

### Crear Vacante
Crea una nueva oportunidad laboral vinculada a la empresa activa.
* **Endpoint:** `POST /api/Vacantes`
* **Autorización:** Rol `empresa` requerido.
* **Regla de Negocio:** La vacante debe requerir al menos una skill (habilidad). Los niveles válidos para `nivelRequerido` son: `"basico"`, `"intermedio"`, `"avanzado"`.
* **JSON de Envío:**
```json
{
  "titulo": "Analista de Operaciones Junior",
  "descripcion": "Buscamos un analista para soporte de operaciones e informes.",
  "ubicacion": "Buenos Aires, Argentina",
  "modalidad": "hibrido",
  "rangoSalarial": "$300.000 - $400.000 ARS",
  "skillsRequeridas": [
    {
      "skillId": 2,
      "nivelRequerido": "intermedio"
    },
    {
      "skillId": 5,
      "nivelRequerido": "basico"
    }
  ]
}
```
* **JSON de Respuesta (210 Created / 201 Created):**
```json
{
  "id": 5,
  "empresaId": 12,
  "empresaNombre": "Tech Solutions",
  "titulo": "Analista de Operaciones Junior",
  "descripcion": "Buscamos un analista para soporte de operaciones e informes.",
  "ubicacion": "Buenos Aires, Argentina",
  "modalidad": "hibrido",
  "rangoSalarial": "$300.000 - $400.000 ARS",
  "estado": "abierta",
  "fechaPublicacion": "2026-05-26T18:50:00Z",
  "skillsRequeridas": [
    {
      "id": 14,
      "skillId": 2,
      "skillNombre": "Gestión del tiempo y Planificación",
      "categoriaNombre": "Habilidades Blandas",
      "nivelRequerido": "intermedio"
    },
    {
      "id": 15,
      "skillId": 5,
      "skillNombre": "Planillas de Cálculo (Excel/Google Sheets)",
      "categoriaNombre": "Sistemas y Tecnología",
      "nivelRequerido": "basico"
    }
  ]
}
```

### Obtener Detalle de una Vacante Específica
* **Endpoint:** `GET /api/Vacantes/{id}`
* **Autorización:** Requiere token (abierto a profesionales y empresas).
* **JSON de Respuesta (200 OK):**
*(Igual al formato individual de la lista de vacantes)*

### Editar Vacante
Modifica los datos y habilidades requeridas para una vacante activa.
* **Endpoint:** `PUT /api/Vacantes/{id}`
* **Autorización:** Rol `empresa` requerido. Debe ser la empresa dueña de la vacante.
* **Regla de Negocio:** El estado de la vacante solo puede ser `"abierta"` o `"cerrada"`.
* **JSON de Envío:**
```json
{
  "titulo": "Analista de Operaciones Ssr",
  "descripcion": "Buscamos un analista semi-senior para soporte operativo integral.",
  "ubicacion": "Remoto",
  "modalidad": "remoto",
  "rangoSalarial": "$450.000 - $550.000 ARS",
  "estado": "abierta",
  "skillsRequeridas": [
    {
      "skillId": 2,
      "nivelRequerido": "avanzado"
    },
    {
      "skillId": 5,
      "nivelRequerido": "intermedio"
    }
  ]
}
```
* **JSON de Respuesta (200 OK):**
*(Devuelve el objeto de la vacante actualizado)*

### Eliminar Vacante
Da de baja una vacante del sistema.
* **Endpoint:** `DELETE /api/Vacantes/{id}`
* **Autorización:** Rol `empresa` requerido. Debe ser la empresa dueña de la vacante.
* **Respuesta (204 No Content):** Sin contenido.

---

## 📌 3. Búsqueda de Talento y Match Inteligente

Las empresas pueden visualizar perfiles de profesionales y calcular automáticamente la compatibilidad (Match %) de los candidatos con sus vacantes.

### Ver Talentos Disponibles (Marketplace)
* **Endpoint:** `GET /api/Marketplace/talentos`
* **Autorización:** Rol `empresa` o `admin` requerido.
* **Regla de Negocio:** El backend filtra y devuelve **únicamente** a los profesionales que tienen su perfil configurado con `visibleMarketplace: true`.
* **JSON de Respuesta (200 OK):**
```json
[
  {
    "id": 3,
    "usuarioId": 8,
    "nombre": "Scarlet",
    "apellido": "Gomez",
    "email": "scarlet@talent.com",
    "titular": "Administrativa y Especialista de Soporte",
    "biografia": "Profesional con experiencia en gestión de equipos y herramientas digitales.",
    "urlLinkedin": "https://linkedin.com/in/scarletgomez",
    "visibleMarketplace": true,
    "skills": [
      {
        "id": 22,
        "skillId": 2,
        "skillNombre": "Gestión del tiempo y Planificación",
        "categoriaNombre": "Habilidades Blandas",
        "origen": "diagnostico",
        "nivel": "avanzado",
        "validada": true
      },
      {
        "id": 23,
        "skillId": 5,
        "skillNombre": "Planillas de Cálculo (Excel/Google Sheets)",
        "categoriaNombre": "Sistemas y Tecnología",
        "origen": "autoevaluacion",
        "nivel": "intermedio",
        "validada": false
      }
    ],
    "experiencias": [
      {
        "id": 2,
        "empresa": "Global Solutions Inc",
        "cargo": "Asistente Operativo",
        "fechaInicio": "2024-01-10T00:00:00Z",
        "fechaFin": "2025-12-15T00:00:00Z",
        "descripcion": "Coordinación de agendas y redacción de informes semanales."
      }
    ]
  }
]
```

### Match de Candidatos para una Vacante Específica
Calcula en tiempo real la coincidencia de todos los candidatos con las habilidades exigidas por una vacante.
* **Endpoint:** `GET /api/Marketplace/vacantes/{vacanteId}/match`
* **Autorización:** Rol `empresa` requerido. Debe ser la empresa dueña de la vacante.
* **Algoritmo de Compatibilidad (Backend):**
  * Para cada skill requerida en la vacante:
    * Si el candidato **no tiene la skill**: `0.0` puntos (añadida a `skillsFaltantes`).
    * Si el candidato **tiene la skill** y su nivel es **mayor o igual** al requerido: `1.0` punto (añadida a `skillsCoincidentes`).
    * Si el candidato **tiene la skill** pero su nivel es **menor** al requerido: `0.5` puntos (coincidencia parcial, añadida a `skillsCoincidentes` indicando la brecha).
  * El Score se calcula como: `(sumaPuntos / totalSkillsRequeridas) * 100` redondeado a 2 decimales.
  * El listado se devuelve ordenado de forma **descendente** según el porcentaje de compatibilidad.
* **JSON de Respuesta (200 OK):**
```json
[
  {
    "perfilId": 3,
    "usuarioId": 8,
    "nombre": "Scarlet",
    "apellido": "Gomez",
    "titular": "Administrativa y Especialista de Soporte",
    "urlLinkedin": "https://linkedin.com/in/scarletgomez",
    "porcentajeMatch": 100.0,
    "skillsCoincidentes": [
      "Gestión del tiempo y Planificación",
      "Planillas de Cálculo (Excel/Google Sheets)"
    ],
    "skillsFaltantes": []
  },
  {
    "perfilId": 4,
    "usuarioId": 10,
    "nombre": "Roberto",
    "apellido": "Méndez",
    "titular": "Soporte Técnico Administrativo",
    "urlLinkedin": "https://linkedin.com/in/robertom",
    "porcentajeMatch": 75.0,
    "skillsCoincidentes": [
      "Gestión del tiempo y Planificación",
      "Planillas de Cálculo (Excel/Google Sheets) (basico - Requerido: intermedio)"
    ],
    "skillsFaltantes": []
  }
]
```

---

## 📌 4. Gestión de Postulaciones y Feedback (Loop Virtuoso)

Permite gestionar el embudo de selección y, fundamentalmente, proveer retroalimentación cuando un candidato es rechazado o seleccionado (para nutrir su plan de desarrollo).

### Listar Candidatos Postulados a una Vacante
* **Endpoint:** `GET /api/Postulaciones/vacante/{vacanteId}`
* **Autorización:** Rol `empresa` requerido. Debe ser la empresa dueña de la vacante.
* **JSON de Respuesta (200 OK):**
```json
[
  {
    "id": 102,
    "usuarioId": 8,
    "profesionalNombre": "Scarlet Gomez",
    "profesionalEmail": "scarlet@talent.com",
    "vacanteId": 5,
    "vacanteTitulo": "Analista de Operaciones Junior",
    "empresaNombre": "Tech Solutions",
    "fechaAplicacion": "2026-05-26T14:30:00Z",
    "estadoSeleccion": "aplicado",
    "feedbackEmpresa": null,
    "fechaFeedback": null
  }
]
```

### Cambiar Estado de Postulación e Ingresar Feedback
* **Endpoint:** `PUT /api/Postulaciones/{id}/estado`
* **Autorización:** Rol `empresa` requerido. Debe ser la empresa dueña de la vacante.
* **Estados Permitidos (`estadoSeleccion`):**
  * `"aplicado"` (Estado inicial)
  * `"en_proceso"` (En entrevistas / evaluaciones)
  * `"rechazado"` (Descartado del proceso)
  * `"seleccionado"` (Contratado o finalista)
* **Reglas de Negocio Críticas (Feedback Obligatorio):**
  * Si cambias el estado a `"rechazado"`, es **obligatorio** proveer un comentario constructivo en `feedbackEmpresa`. Si se envía vacío o nulo, el backend responderá con error `400 Bad Request`.
  * Si cambias el estado a `"seleccionado"`, también es **obligatorio** proveer un comentario justificando la selección en `feedbackEmpresa`.
  * Si cambias a `"en_proceso"`, el feedback es **opcional**.
* **JSON de Envío (Avanzar a En Proceso):**
```json
{
  "estadoSeleccion": "en_proceso",
  "feedbackEmpresa": null
}
```
* **JSON de Envío (Rechazo con Feedback Obligatorio):**
```json
{
  "estadoSeleccion": "rechazado",
  "feedbackEmpresa": "Excelente perfil. Posee sólidas habilidades blandas, pero requerimos mayor experiencia práctica en el manejo avanzado de planillas de cálculo Excel para esta posición en particular."
}
```
* **JSON de Envío (Selección con Feedback Obligatorio):**
```json
{
  "estadoSeleccion": "seleccionado",
  "feedbackEmpresa": "El perfil encaja perfectamente. Demostró una gran proactividad y cumple con creces todas las competencias deseadas para el equipo."
}
```
* **JSON de Respuesta (200 OK):**
```json
{
  "id": 102,
  "usuarioId": 8,
  "profesionalNombre": "Scarlet Gomez",
  "profesionalEmail": "scarlet@talent.com",
  "vacanteId": 5,
  "vacanteTitulo": "Analista de Operaciones Junior",
  "empresaNombre": "Tech Solutions",
  "fechaAplicacion": "2026-05-26T14:30:00Z",
  "estadoSeleccion": "rechazado",
  "feedbackEmpresa": "Excelente perfil. Posee sólidas habilidades blandas, pero requerimos mayor experiencia práctica en el manejo avanzado de planillas de cálculo Excel para esta posición en particular.",
  "fechaFeedback": "2026-05-26T18:55:00Z"
}
```
* **Respuesta en caso de error por falta de Feedback (400 Bad Request):**
```json
{
  "message": "El feedback constructivo es obligatorio para cambiar el estado a 'rechazado'."
}
```

---

## 💻 5. Ejemplo de Integración en Frontend (TypeScript / Axios)

Aquí tienes una sugerencia de servicios en React/Next.js usando Axios para conectar estos endpoints:

```typescript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://tu-backend.onrender.com/api',
});

// Interceptor para inyectar automáticamente el token JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // O tu método de almacenamiento (Zustand, cookies, etc.)
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- VACANTES ---

export const getMisVacantes = async () => {
  const { data } = await api.get('/Vacantes/mis-vacantes');
  return data;
};

export const crearVacante = async (vacanteData: {
  titulo: string;
  descripcion: string;
  ubicacion: string;
  modalidad: string;
  rangoSalarial: string;
  skillsRequeridas: { skillId: number; nivelRequerido: string }[];
}) => {
  const { data } = await api.post('/Vacantes', vacanteData);
  return data;
};

export const actualizarVacante = async (id: number, vacanteData: any) => {
  const { data } = await api.put(`/Vacantes/${id}`, vacanteData);
  return data;
};

export const eliminarVacante = async (id: number) => {
  await api.delete(`/Vacantes/${id}`);
};

// --- MARKETPLACE & MATCH ---

export const getTalentosMarketplace = async () => {
  const { data } = await api.get('/Marketplace/talentos');
  return data;
};

export const getMatchesParaVacante = async (vacanteId: number) => {
  const { data } = await api.get(`/Marketplace/vacantes/${vacanteId}/match`);
  return data;
};

// --- POSTULACIONES & FEEDBACK ---

export const getPostuladosPorVacante = async (vacanteId: number) => {
  const { data } = await api.get(`/Postulaciones/vacante/${vacanteId}`);
  return data;
};

export const cambiarEstadoPostulacion = async (
  postulacionId: number,
  estadoSeleccion: 'aplicado' | 'en_proceso' | 'rechazado' | 'seleccionado',
  feedbackEmpresa: string | null
) => {
  const { data } = await api.put(`/Postulaciones/${postulacionId}/estado`, {
    estadoSeleccion,
    feedbackEmpresa,
  });
  return data;
};
```

---

## 🎨 Consejos para el Frontend:
1. **Pestaña del Reclutador:** Te sugiero armar un Dashboard diferente o una sección `/dashboard/empresa/` que sea visible sólo si el rol decodificado del JWT es `"empresa"`.
2. **Badge de Compatibilidad:** Utiliza colores dinámicos según el score del Match:
   - `Verde` para matches del **80% al 100%**.
   - `Amarillo / Naranja` para matches del **50% al 79%**.
   - `Gris / Rojo` para matches por debajo del **50%**.
3. **Modal de Feedback:** Cuando el reclutador haga clic en *"Rechazar"* o *"Seleccionar Candidato"*, abre un modal con un campo de texto amplio (`textarea`) indicando que es obligatorio e invítalo a dejar feedback constructivo para guiar al profesional.

