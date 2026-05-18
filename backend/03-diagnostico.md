# 3. Módulo de Diagnóstico

## ¿Qué es?

El corazón del MVP. Un cuestionario breve que evalúa las habilidades del profesional +45 en tres dimensiones: **digitales**, **cognitivas** y **socioemocionales**. Al completar, el sistema genera un resultado con brechas concretas y una recomendación de ruta de aprendizaje.

**Criterio de aceptación del PRD:** El usuario completa el diagnóstico en menos de 15 minutos.

> ⚠️ **Dependencias:** Este módulo usa `CategoriaSkill` definida en `04-skills.md`. NO crear una tabla de categorías separada. Ver convenciones en `00-actualizacion-base.md`.

---

## Entidades

### PreguntaDiagnostico

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_pregunta` | BIGINT (PK) | ID único |
| `id_categoria` | BIGINT (FK → `CategoriaSkill`) | Categoría a la que pertenece |
| `texto` | VARCHAR(500) | Texto de la pregunta |
| `orden` | INT | Orden de aparición |
| `activa` | BOOLEAN | Si la pregunta está activa |

### OpcionPregunta

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_opcion` | BIGINT (PK) | ID único |
| `id_pregunta` | BIGINT (FK) | Pregunta a la que pertenece |
| `texto` | VARCHAR(300) | Texto de la opción |
| `puntaje` | INT | Valor numérico (ej: 1-5) |
| `orden` | INT | Orden de aparición |

### Diagnostico (sesión de diagnóstico del usuario)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_diagnostico` | BIGINT (PK) | ID único |
| `id_usuario` | BIGINT (FK → `Usuario`) | Usuario que realiza el diagnóstico |
| `fecha` | TIMESTAMP | Fecha/hora de inicio |
| `estado` | VARCHAR(20) | "en_progreso", "completado" |

### RespuestaDiagnostico

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_respuesta` | BIGINT (PK) | ID único |
| `id_diagnostico` | BIGINT (FK) | Sesión de diagnóstico |
| `id_pregunta` | BIGINT (FK) | Pregunta respondida |
| `id_opcion` | BIGINT (FK) | Opción elegida |

### ResultadoDiagnostico (resultado por categoría)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_resultado` | BIGINT (PK) | ID único |
| `id_diagnostico` | BIGINT (FK) | Sesión de diagnóstico |
| `id_categoria` | BIGINT (FK → `CategoriaSkill`) | Categoría evaluada |
| `puntaje_obtenido` | INT | Puntaje logrado |
| `puntaje_maximo` | INT | Puntaje máximo posible |
| `nivel` | VARCHAR(15) | "basico", "intermedio", "avanzado" |
| `recomendacion` | VARCHAR(500) | Recomendación textual para esa categoría |

---

## Endpoints

### Preguntas (consumo del quiz)

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `GET` | `/api/Diagnostico/preguntas` | Obtener todas las preguntas agrupadas por categoría | ✅ Sí |
| `GET` | `/api/Diagnostico/preguntas/{categoriaId}` | Obtener preguntas de una categoría | ✅ Sí |

#### GET `/api/Diagnostico/preguntas` — Response (200)

```json
[
  {
    "categoria": "Digital",
    "preguntas": [
      {
        "id": 1,
        "texto": "¿Con qué frecuencia utilizás herramientas digitales de colaboración (Google Workspace, Teams, Slack)?",
        "opciones": [
          { "id": 1, "texto": "Nunca las usé", "orden": 1 },
          { "id": 2, "texto": "Las conozco pero no las uso regularmente", "orden": 2 },
          { "id": 3, "texto": "Las uso semanalmente", "orden": 3 },
          { "id": 4, "texto": "Las uso a diario con fluidez", "orden": 4 },
          { "id": 5, "texto": "Soy referente y capacito a otros en su uso", "orden": 5 }
        ]
      }
    ]
  }
]
```

### Diagnóstico (flujo del usuario)

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `POST` | `/api/Diagnostico/iniciar` | Inicia una sesión de diagnóstico | ✅ Sí |
| `POST` | `/api/Diagnostico/responder` | Envía las respuestas del usuario | ✅ Sí |
| `GET` | `/api/Diagnostico/resultado/{diagnosticoId}` | Obtiene el resultado del diagnóstico | ✅ Sí |
| `GET` | `/api/Diagnostico/mis-diagnosticos` | Lista los diagnósticos del usuario logueado | ✅ Sí |

#### POST `/api/Diagnostico/iniciar` — Response (201)

```json
{
  "id": 1,
  "fecha": "2026-05-18T19:00:00Z",
  "estado": "en_progreso"
}
```

#### POST `/api/Diagnostico/responder` — Request

```json
{
  "diagnosticoId": 1,
  "respuestas": [
    { "preguntaId": 1, "opcionId": 3 },
    { "preguntaId": 2, "opcionId": 2 },
    { "preguntaId": 3, "opcionId": 4 }
  ]
}
```

#### POST `/api/Diagnostico/responder` — Response (200)

```json
{
  "diagnosticoId": 1,
  "estado": "completado",
  "resultados": [
    {
      "categoria": "Digital",
      "puntajeObtenido": 12,
      "puntajeMaximo": 25,
      "nivel": "intermedio",
      "recomendacion": "Fortalecer el uso de herramientas de análisis de datos y automatización."
    },
    {
      "categoria": "Cognitiva",
      "puntajeObtenido": 8,
      "puntajeMaximo": 25,
      "nivel": "basico",
      "recomendacion": "Se recomienda trabajar en pensamiento analítico y resolución de problemas complejos."
    },
    {
      "categoria": "Socioemocional",
      "puntajeObtenido": 20,
      "puntajeMaximo": 25,
      "nivel": "avanzado",
      "recomendacion": "Excelente nivel. Potenciar habilidades de liderazgo y mentoría."
    }
  ],
  "rutaSugeridaId": 5
}
```

---

## Lógica de negocio

1. **Calcular puntaje por categoría**: sumar los puntajes de las opciones elegidas, agrupados por categoría.
2. **Determinar nivel** (escala unificada):
   - `basico`: 0% a 40% del puntaje máximo
   - `intermedio`: 41% a 70%
   - `avanzado`: 71% a 100%
3. **Generar recomendaciones**: texto predefinido según nivel + categoría.
4. **Sugerir ruta de aprendizaje**: según las categorías con nivel basico/intermedio, asignar una ruta personalizada (ver módulo 05).

> **Nota:** El MVP evalúa 3 categorías (Digital, Cognitiva, Socioemocional). La categoría "Técnica" existe en el catálogo de Skills (ver `04-skills.md`) pero NO tiene preguntas de diagnóstico en esta fase. Se usará en perfiles y vacantes.

---

## Archivos a crear

| Archivo | Qué es |
|---------|--------|
| `Entities/PreguntaDiagnostico.cs` | Entidad pregunta |
| `Entities/OpcionPregunta.cs` | Entidad opción |
| `Entities/Diagnostico.cs` | Entidad sesión de diagnóstico |
| `Entities/RespuestaDiagnostico.cs` | Entidad respuesta |
| `Entities/ResultadoDiagnostico.cs` | Entidad resultado por categoría |
| `DTO/ResponderDiagnosticoDTO.cs` | Request con respuestas |
| `DTO/ResultadoDiagnosticoDTO.cs` | Response con resultados |
| `Repository/IDiagnosticoRepository.cs` | Interfaz del repo |
| `Repository/DiagnosticoRepository.cs` | Implementación |
| `Services/IDiagnosticoService.cs` | Interfaz del servicio |
| `Services/DiagnosticoService.cs` | Lógica: cálculo de puntajes, niveles, recomendaciones |
| `Controllers/DiagnosticoController.cs` | Endpoints |

---

## Seed data

Hay que cargar preguntas iniciales. Mínimo **5 preguntas por categoría** (15 total) para el MVP. Se pueden agregar vía seed en `AppDbContext.OnModelCreating` o vía un endpoint admin.
