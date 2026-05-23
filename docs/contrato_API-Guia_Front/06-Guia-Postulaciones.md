# Guia 06: Postulaciones y Feedback

Este modulo permite que profesionales visibles apliquen a vacantes abiertas y que empresas gestionen el estado de seleccion.

## Reglas clave

- Solo rol `profesional` puede postularse.
- El profesional debe tener `visibleMarketplace: true`.
- Solo se puede aplicar a vacantes con `estado: "abierta"`.
- No se puede aplicar dos veces a la misma vacante.
- La base de datos tiene indice unico por `(id_usuario, id_vacante)`.
- Solo la empresa duena de la vacante puede ver postulantes y cambiar estado.
- Si el estado cambia a `rechazado` o `seleccionado`, `feedbackEmpresa` es obligatorio.

## Estados de postulacion

- `aplicado`
- `en_proceso`
- `rechazado`
- `seleccionado`

## 1. Aplicar a vacante

**Endpoint:** `POST /api/Postulaciones`

**Auth:** rol `profesional`.

### Body

```json
{
  "vacanteId": 1
}
```

### Respuesta 201

```json
{
  "id": 100,
  "usuarioId": 10,
  "profesionalNombre": "Juan Perez",
  "profesionalEmail": "juan@test.com",
  "vacanteId": 1,
  "vacanteTitulo": "Analista de Reportes",
  "empresaNombre": "Talent Empresa",
  "fechaAplicacion": "2026-05-23T21:20:00Z",
  "estadoSeleccion": "aplicado",
  "feedbackEmpresa": null,
  "fechaFeedback": null
}
```

### Errores comunes

Perfil no visible:

```json
{
  "message": "Debes completar tu ruta de aprendizaje y tener tu CV Vivo activo/visible para poder postularte a vacantes."
}
```

Vacante cerrada:

```json
{ "message": "No puedes postularte a una vacante que no esta abierta." }
```

Postulacion duplicada:

```json
{ "message": "Ya te has postulado a esta vacante." }
```

## 2. Ver mis postulaciones

**Endpoint principal:** `GET /api/Postulaciones/mis-postulaciones`

**Alias compatible:** `GET /api/Postulaciones/mis-aplicaciones`

**Auth:** rol `profesional`.

### Respuesta 200

```json
[
  {
    "id": 100,
    "usuarioId": 10,
    "profesionalNombre": "",
    "profesionalEmail": "",
    "vacanteId": 1,
    "vacanteTitulo": "Analista de Reportes",
    "empresaNombre": "Talent Empresa",
    "fechaAplicacion": "2026-05-23T21:20:00Z",
    "estadoSeleccion": "en_proceso",
    "feedbackEmpresa": null,
    "fechaFeedback": "2026-05-23T22:00:00Z"
  }
]
```

## 3. Ver postulantes de una vacante

**Endpoint:** `GET /api/Postulaciones/vacante/{vacanteId}`

**Auth:** rol `empresa`.

Solo la empresa duena de la vacante puede consultar este listado.

### Respuesta 200

```json
[
  {
    "id": 100,
    "usuarioId": 10,
    "profesionalNombre": "Juan Perez",
    "profesionalEmail": "juan@test.com",
    "vacanteId": 1,
    "vacanteTitulo": "",
    "empresaNombre": "",
    "fechaAplicacion": "2026-05-23T21:20:00Z",
    "estadoSeleccion": "aplicado",
    "feedbackEmpresa": null,
    "fechaFeedback": null
  }
]
```

## 4. Cambiar estado y dejar feedback

**Endpoint:** `PUT /api/Postulaciones/{id}/estado`

**Auth:** rol `empresa`.

Solo la empresa duena de la vacante puede actualizar la postulacion.

### Body para avanzar proceso

```json
{
  "estadoSeleccion": "en_proceso",
  "feedbackEmpresa": null
}
```

### Body para rechazar

```json
{
  "estadoSeleccion": "rechazado",
  "feedbackEmpresa": "Buen perfil, pero buscamos experiencia mas avanzada en Excel para esta posicion."
}
```

### Body para seleccionar

```json
{
  "estadoSeleccion": "seleccionado",
  "feedbackEmpresa": "El perfil cumple los requisitos y avanza a entrevista."
}
```

### Respuesta 200

Devuelve la postulacion actualizada.

### Error por falta de feedback

```json
{
  "message": "El feedback constructivo es obligatorio para cambiar el estado a 'rechazado'."
}
```

## Ejemplo React

```javascript
const applyToJob = async (vacanteId) => {
  const { data } = await api.post('/Postulaciones', { vacanteId });
  return data;
};

const updateApplicationStatus = async (postulacionId, estadoSeleccion, feedbackEmpresa) => {
  const { data } = await api.put(`/Postulaciones/${postulacionId}/estado`, {
    estadoSeleccion,
    feedbackEmpresa,
  });
  return data;
};
```
