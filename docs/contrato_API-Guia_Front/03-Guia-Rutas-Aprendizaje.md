# Guia 03: Rutas de Aprendizaje, Modulos y Clases

Estos endpoints son para profesionales autenticados. La ruta se genera a partir de un diagnostico completado.

## Flujo recomendado

1. Completar diagnostico.
2. Generar ruta con `POST /Rutas/generar/{diagnosticoId}`.
3. Mostrar ruta activa con `GET /Rutas/mi-ruta`.
4. Mostrar clases por modulo/progreso con `GET /Rutas/progreso/{progresoModuloId}/clases`.
5. Completar clases con `PUT /Rutas/progreso/clase/{progresoClaseId}`.
6. Cuando se completan todos los modulos, el backend marca el perfil como `visibleMarketplace: true`.

## 1. Generar ruta desde diagnostico

**Endpoint:** `POST /api/Rutas/generar/{diagnosticoId}`

**Auth:** requiere token.

### Respuesta 201

```json
{
  "id": 1,
  "usuarioId": 10,
  "diagnosticoId": 5,
  "fechaCreacion": "2026-05-23T20:00:00Z",
  "estado": "activa",
  "progresos": [
    {
      "id": 100,
      "rutaId": 1,
      "moduloId": 3,
      "estado": "pendiente",
      "fechaInicio": null,
      "fechaCompletado": null,
      "modulo": {
        "id": 3,
        "titulo": "Inteligencia Artificial para la Productividad Diaria",
        "descripcion": "Aprende a usar ChatGPT y Copilot...",
        "categoriaSkillId": 2,
        "categoriaNombre": "Sistemas y Tecnologia",
        "duracionEstimada": "4 horas",
        "nivelDificultad": "basico",
        "orden": 1,
        "skillsDesarrolladas": [
          "Uso de Inteligencia Artificial (ChatGPT/Prompts)"
        ]
      },
      "progresosClase": []
    }
  ]
}
```

Si el usuario ya tiene ruta activa, devuelve esa ruta.

## 2. Obtener mi ruta activa

**Endpoint:** `GET /api/Rutas/mi-ruta`

**Auth:** requiere token.

### Respuesta 200

Misma estructura que generar ruta.

### Error 404

```json
{ "message": "No tienes ninguna ruta de aprendizaje activa en este momento." }
```

## 3. Obtener clases de un modulo de la ruta

**Endpoint:** `GET /api/Rutas/progreso/{progresoModuloId}/clases`

**Auth:** requiere token.

`progresoModuloId` no es el `moduloId`; es el `id` del objeto dentro de `ruta.progresos`.

### Respuesta 200

```json
{
  "id": 100,
  "rutaId": 1,
  "moduloId": 3,
  "estado": "en_progreso",
  "fechaInicio": "2026-05-23T20:10:00Z",
  "fechaCompletado": null,
  "modulo": {
    "id": 3,
    "titulo": "Inteligencia Artificial para la Productividad Diaria",
    "descripcion": "Aprende a usar ChatGPT y Copilot...",
    "categoriaSkillId": 2,
    "categoriaNombre": "Sistemas y Tecnologia",
    "duracionEstimada": "4 horas",
    "nivelDificultad": "basico",
    "orden": 1,
    "skillsDesarrolladas": ["Uso de Inteligencia Artificial (ChatGPT/Prompts)"]
  },
  "progresosClase": [
    {
      "id": 501,
      "progresoModuloId": 100,
      "claseId": 900,
      "completado": false,
      "fechaCompletado": null,
      "clase": {
        "id": 900,
        "moduloId": 3,
        "titulo": "Clase 1: Introduccion a la IA Generativa",
        "descripcion": "Que es la Inteligencia Artificial...",
        "videoUrl": "https://www.youtube.com/embed/...",
        "contenidoTexto": "La IA generativa potencia la productividad...",
        "orden": 1
      }
    }
  ]
}
```

## 4. Completar clase

**Endpoint:** `PUT /api/Rutas/progreso/clase/{progresoClaseId}`

**Auth:** requiere token.

No requiere body.

### Respuesta 200

```json
{
  "id": 501,
  "progresoModuloId": 100,
  "claseId": 900,
  "completado": true,
  "fechaCompletado": "2026-05-23T20:20:00Z",
  "clase": {
    "id": 900,
    "moduloId": 3,
    "titulo": "Clase 1: Introduccion a la IA Generativa",
    "descripcion": "Que es la Inteligencia Artificial...",
    "videoUrl": "https://www.youtube.com/embed/...",
    "contenidoTexto": "La IA generativa potencia la productividad...",
    "orden": 1
  }
}
```

Cuando todas las clases de un modulo estan completas, el backend:

- Marca el modulo como `completado`.
- Acredita las skills del modulo en el CV vivo como `validada: true`.

Cuando todos los modulos de la ruta estan completos, el backend:

- Marca la ruta como `completada`.
- Marca el perfil como `visibleMarketplace: true`.

## 5. Catalogo publico de modulos

**Endpoint:** `GET /api/Modulos`

**Auth:** no requiere rol especifico.

### Respuesta 200

```json
[
  {
    "id": 1,
    "titulo": "Excel Avanzado para Reportes de Negocio",
    "descripcion": "Domina el armado de reportes...",
    "categoriaSkillId": 3,
    "categoriaNombre": "Finanzas y Administracion",
    "duracionEstimada": "5 horas",
    "nivelDificultad": "intermedio",
    "orden": 2,
    "skillsDesarrolladas": ["Reportes Financieros Dinamicos"]
  }
]
```

**Endpoint:** `GET /api/Modulos/{id}`

Devuelve un modulo por ID.
