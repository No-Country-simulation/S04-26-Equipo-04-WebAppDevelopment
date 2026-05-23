# Guia 05: Vacantes, Marketplace y Match

Este modulo conecta empresas con profesionales visibles en marketplace.

## Reglas clave

- Solo usuarios con rol `empresa` pueden crear, editar y eliminar vacantes.
- Una vacante debe tener al menos una skill requerida.
- Si se mandan skills duplicadas, el backend conserva una sola por `skillId`.
- Los estados validos de vacante son `abierta` y `cerrada`.
- El marketplace de talentos solo muestra perfiles con `visibleMarketplace: true`.
- El match se calcula por skills requeridas:
  - Skill presente y nivel suficiente: 100% de esa skill.
  - Skill presente pero nivel menor: 50% de esa skill.
  - Skill ausente: 0% de esa skill.

## 1. Listar vacantes abiertas

**Endpoint:** `GET /api/Vacantes`

**Auth:** requiere token.

### Respuesta 200

```json
[
  {
    "id": 1,
    "empresaId": 20,
    "empresaNombre": "Talent Empresa",
    "titulo": "Analista de Reportes",
    "descripcion": "Buscamos perfil con experiencia en reportes y herramientas digitales.",
    "ubicacion": "Remoto",
    "modalidad": "remoto",
    "rangoSalarial": "A convenir",
    "estado": "abierta",
    "fechaPublicacion": "2026-05-23T21:00:00Z",
    "skillsRequeridas": [
      {
        "id": 10,
        "skillId": 4,
        "skillNombre": "Uso de Inteligencia Artificial (ChatGPT/Prompts)",
        "categoriaNombre": "Sistemas y Tecnologia",
        "nivelRequerido": "basico"
      }
    ]
  }
]
```

## 2. Obtener detalle de vacante

**Endpoint:** `GET /api/Vacantes/{id}`

**Auth:** requiere token.

## 3. Mis vacantes como empresa

**Endpoint:** `GET /api/Vacantes/mis-vacantes`

**Auth:** rol `empresa`.

Devuelve todas las vacantes de la empresa autenticada.

## 4. Crear vacante

**Endpoint:** `POST /api/Vacantes`

**Auth:** rol `empresa`.

### Body

```json
{
  "titulo": "Analista de Reportes",
  "descripcion": "Buscamos perfil con experiencia en reportes y herramientas digitales.",
  "ubicacion": "Remoto",
  "modalidad": "remoto",
  "rangoSalarial": "A convenir",
  "skillsRequeridas": [
    { "skillId": 4, "nivelRequerido": "basico" },
    { "skillId": 6, "nivelRequerido": "avanzado" }
  ]
}
```

### Respuesta 201

Devuelve la vacante creada con `estado: "abierta"`.

### Errores comunes

```json
{ "message": "La vacante debe requerir al menos una habilidad (skill)." }
```

## 5. Editar vacante

**Endpoint:** `PUT /api/Vacantes/{id}`

**Auth:** rol `empresa`.

Solo la empresa duena de la vacante puede editarla.

### Body

```json
{
  "titulo": "Analista de Reportes Senior",
  "descripcion": "Perfil con experiencia en reportes, Excel e IA.",
  "ubicacion": "Buenos Aires",
  "modalidad": "hibrido",
  "rangoSalarial": "A convenir",
  "estado": "abierta",
  "skillsRequeridas": [
    { "skillId": 4, "nivelRequerido": "basico" },
    { "skillId": 6, "nivelRequerido": "intermedio" }
  ]
}
```

Estados validos:

- `abierta`
- `cerrada`

### Error por estado invalido

```json
{ "message": "El estado de la vacante debe ser 'abierta' o 'cerrada'." }
```

## 6. Eliminar vacante

**Endpoint:** `DELETE /api/Vacantes/{id}`

**Auth:** rol `empresa`.

Solo la empresa duena puede eliminarla.

### Respuesta 204

Sin body.

## 7. Ver talentos disponibles

**Endpoint:** `GET /api/Marketplace/talentos`

**Auth:** rol `empresa` o `admin`.

Devuelve perfiles con `visibleMarketplace: true`.

### Respuesta 200

```json
[
  {
    "id": 1,
    "usuarioId": 10,
    "nombre": "Juan",
    "apellido": "Perez",
    "email": "juan@test.com",
    "titular": "Analista administrativo senior",
    "visibleMarketplace": true,
    "skills": [],
    "experiencias": []
  }
]
```

## 8. Match de candidatos para una vacante

**Endpoint:** `GET /api/Marketplace/vacantes/{vacanteId}/match`

**Auth:** rol `empresa`.

Solo la empresa duena de la vacante puede consultar sus matches.

### Respuesta 200

```json
[
  {
    "perfilId": 1,
    "usuarioId": 10,
    "nombre": "Juan",
    "apellido": "Perez",
    "titular": "Analista administrativo senior",
    "urlLinkedin": "https://linkedin.com/in/juan",
    "porcentajeMatch": 75.0,
    "skillsCoincidentes": [
      "Uso de Inteligencia Artificial (ChatGPT/Prompts)",
      "Reportes Financieros Dinamicos (intermedio - Requerido: avanzado)"
    ],
    "skillsFaltantes": []
  }
]
```

## 9. Match de vacantes para profesional

**Endpoint:** `GET /api/Marketplace/mis-oportunidades/match`

**Auth:** rol `profesional`.

Devuelve vacantes abiertas ordenadas por match descendente.

### Respuesta 200

```json
[
  {
    "vacanteId": 1,
    "titulo": "Analista de Reportes",
    "empresaNombre": "Talent Empresa",
    "ubicacion": "Remoto",
    "modalidad": "remoto",
    "rangoSalarial": "A convenir",
    "porcentajeMatch": 75.0,
    "skillsCoincidentes": ["Uso de Inteligencia Artificial (ChatGPT/Prompts)"],
    "skillsFaltantes": ["Reportes Financieros Dinamicos"]
  }
]
```
