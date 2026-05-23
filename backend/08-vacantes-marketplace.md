# 8. Módulo de Vacantes y Marketplace

## ¿Qué es?

El punto de encuentro. Las empresas publican vacantes y filtran talento +45 validado (Marketplace). Los profesionales aplican a vacantes y las empresas dejan feedback estructurado tras la preselección.

> ⚠️ **Dependencias:** Usa `Empresa` de `07-empresas.md`, `Skill` de `04-skills.md`, `Perfil` y `PerfilSkill` de `06-perfil-dinamico.md`. Escala de niveles: `basico`, `intermedio`, `avanzado`.

---

## Entidades

### Vacante

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_vacante` | BIGINT (PK) | ID único |
| `id_empresa` | BIGINT (FK → `Empresa`) | Empresa que publica |
| `titulo_puesto` | VARCHAR(100) | Título del puesto |
| `descripcion` | VARCHAR(1000) | Descripción y requerimientos |
| `modalidad` | VARCHAR(20) | "remoto", "hibrido", "presencial" |
| `estado` | VARCHAR(20) | "abierta", "cerrada" |
| `fecha_publicacion` | TIMESTAMP | Cuándo se publicó |

### VacanteSkill (skills requeridas para la vacante)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGINT (PK) | ID único |
| `id_vacante` | BIGINT (FK → `Vacante`) | Vacante |
| `id_skill` | BIGINT (FK → `Skill`) | Skill requerida |
| `nivel_requerido` | VARCHAR(15) | "basico", "intermedio", "avanzado" |

### Postulacion

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_postulacion` | BIGINT (PK) | ID único |
| `id_usuario` | BIGINT (FK → `Usuario`) | Profesional que aplica |
| `id_vacante` | BIGINT (FK → `Vacante`) | Vacante a la que aplica |
| `fecha_aplicacion` | TIMESTAMP | Fecha de postulación |
| `estado_seleccion` | VARCHAR(20) | "aplicado", "en_proceso", "rechazado", "seleccionado" |
| `feedback_empresa` | VARCHAR(300) | Feedback estructurado post-evaluación (nullable) |
| `fecha_feedback` | TIMESTAMP | Cuándo se dejó el feedback (nullable) |

---

## Endpoints

### Vacantes

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `POST` | `/api/Vacantes` | Publicar vacante | ✅ Sí (Empresa) |
| `GET` | `/api/Vacantes` | Buscar vacantes abiertas (profesionales) | ✅ Sí |
| `GET` | `/api/Vacantes/{id}` | Detalle de una vacante | ✅ Sí |
| `GET` | `/api/Vacantes/empresa` | Vacantes de mi empresa | ✅ Sí (Empresa) |
| `PUT` | `/api/Vacantes/{id}` | Editar vacante | ✅ Sí (Empresa) |

### Marketplace (búsqueda de talento por empresas)

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `GET` | `/api/Marketplace/talento` | Buscar perfiles visibles | ✅ Sí (Empresa) |

**Query parameters del marketplace:**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `skillId` | BIGINT | Filtrar por skill específica |
| `categoriaId` | BIGINT | Filtrar por categoría de skill |
| `nivel` | STRING | Nivel mínimo: "basico", "intermedio", "avanzado" |

### Postulaciones

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `POST` | `/api/Postulaciones` | Aplicar a vacante | ✅ Sí (Profesional) |
| `GET` | `/api/Postulaciones/mis-aplicaciones` | Ver mis postulaciones | ✅ Sí (Profesional) |
| `GET` | `/api/Postulaciones/vacante/{id}` | Ver aplicantes a mi vacante | ✅ Sí (Empresa) |
| `PUT` | `/api/Postulaciones/{id}/estado` | Cambiar estado y dejar feedback | ✅ Sí (Empresa) |

---

## Lógica de negocio

### Marketplace
- El endpoint `/api/Marketplace/talento` solo retorna perfiles con `visible_marketplace = true` (ver `06-perfil-dinamico.md`).
- Los filtros por skill cruzan `PerfilSkill` con los parámetros de búsqueda.

### Postulaciones
- Un profesional no puede postularse dos veces a la misma vacante.
- Solo puede postularse a vacantes en `estado = "abierta"`.

### Feedback
- Obligatorio dejar `feedback_empresa` cuando `estado_seleccion` cambia a "rechazado" o "seleccionado".
- Esto cumple con el PRD: el profesional siempre recibe retroalimentación para seguir mejorando.

### Validaciones de rol
- Solo `tipo_usuario = "empresa"` puede: publicar vacantes, buscar en marketplace, cambiar estado de postulaciones.
- Solo `tipo_usuario = "profesional"` puede: aplicar a vacantes, ver sus postulaciones.
