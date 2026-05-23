# 5. Módulo de Rutas de Aprendizaje

## ¿Qué es?

Rutas de aprendizaje personalizadas generadas a partir del diagnóstico. Cada ruta tiene entre 3 y 5 módulos prácticos. El progreso se trackea por módulo y al completar la ruta mínima, el perfil del profesional se desbloquea en el marketplace.

> ⚠️ **Dependencias:** Usa `CategoriaSkill` y `Skill` de `04-skills.md`. Usa `Diagnostico` de `03-diagnostico.md`. Escala de niveles: `basico`, `intermedio`, `avanzado` (ver `00-actualizacion-base.md`).

---

## Entidades

### Modulo (curso de aprendizaje)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_modulo` | BIGINT (PK) | ID único |
| `titulo` | VARCHAR(100) | Nombre del módulo |
| `descripcion` | VARCHAR(500) | De qué trata |
| `id_categoria_skill` | BIGINT (FK → `CategoriaSkill`) | Categoría de skill que desarrolla |
| `duracion_estimada` | VARCHAR(50) | Ej: "2 horas", "1 semana" |
| `contenido_url` | VARCHAR(300) | Link al contenido |
| `nivel_dificultad` | VARCHAR(15) | "basico", "intermedio", "avanzado" |
| `orden` | INT | Orden sugerido |
| `activo` | BOOLEAN | Si el módulo está disponible |

### ModuloSkill (skills que desarrolla cada módulo)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGINT (PK) | ID único |
| `id_modulo` | BIGINT (FK → `Modulo`) | Módulo |
| `id_skill` | BIGINT (FK → `Skill`) | Skill que desarrolla |

### RutaAprendizaje (ruta asignada a un usuario)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_ruta` | BIGINT (PK) | ID único |
| `id_usuario` | BIGINT (FK → `Usuario`) | Usuario dueño de la ruta |
| `id_diagnostico` | BIGINT (FK → `Diagnostico`) | Diagnóstico que generó esta ruta |
| `fecha_creacion` | TIMESTAMP | Cuándo se creó |
| `estado` | VARCHAR(20) | "activa", "completada", "abandonada" |

### ProgresoModulo (tracking por módulo)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_progreso` | BIGINT (PK) | ID único |
| `id_ruta` | BIGINT (FK → `RutaAprendizaje`) | Ruta a la que pertenece |
| `id_modulo` | BIGINT (FK → `Modulo`) | Módulo siendo trackeado |
| `estado` | VARCHAR(20) | "pendiente", "en_progreso", "completado" |
| `fecha_inicio` | TIMESTAMP | Cuándo empezó (nullable) |
| `fecha_completado` | TIMESTAMP | Cuándo terminó (nullable) |

---

## Endpoints

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `GET` | `/api/Modulos` | Listar todos los módulos | ❌ No |
| `GET` | `/api/Modulos/{id}` | Detalle de un módulo | ❌ No |
| `GET` | `/api/Rutas/mi-ruta` | Obtener ruta activa del usuario | ✅ Sí |
| `POST` | `/api/Rutas/generar/{diagnosticoId}` | Generar ruta a partir de diagnóstico | ✅ Sí |
| `PUT` | `/api/Rutas/progreso/{progresoId}` | Marcar módulo como completado | ✅ Sí |

---

## Lógica de negocio

### Generación automática de ruta

Al completar el diagnóstico:

1. Tomar categorías con nivel `basico` e `intermedio` del resultado.
2. Seleccionar 3-5 módulos relevantes para esas categorías (priorizar las de nivel basico).
3. Crear `RutaAprendizaje` + registros de `ProgresoModulo` en estado "pendiente".

### Desbloqueo del marketplace

Cuando todos los módulos de la ruta estén en estado `completado` → marcar `visible_marketplace = true` en el Perfil del usuario (ver `06-perfil-dinamico.md`).

### Actualización de skills del perfil

Cuando un módulo pasa a `completado` → agregar las skills asociadas (vía `ModuloSkill`) al `PerfilSkill` del usuario como validadas con origen `"ruta_aprendizaje"` (ver `06-perfil-dinamico.md`).
