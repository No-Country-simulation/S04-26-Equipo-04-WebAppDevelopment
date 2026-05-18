# 6. Módulo de Perfil Dinámico (CV Vivo)

## ¿Qué es?

El "CV vivo" del usuario. Muestra experiencia previa, pero sobre todo, destaca las skills validadas por el diagnóstico y las nuevas skills adquiridas mediante las rutas de aprendizaje.

> ⚠️ **Dependencias:** Usa `Skill` de `04-skills.md`. Recibe datos automáticos de `03-diagnostico.md` y `05-rutas-aprendizaje.md`. Escala de niveles: `basico`, `intermedio`, `avanzado`.

---

## Entidades

### Perfil

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_perfil` | BIGINT (PK) | ID único |
| `id_usuario` | BIGINT (FK → `Usuario`) | Usuario dueño del perfil |
| `titular` | VARCHAR(100) | Ej: "Gerente de Operaciones \| Especialista en Procesos" |
| `biografia` | VARCHAR(500) | Resumen profesional |
| `url_linkedin` | VARCHAR(150) | Enlace a LinkedIn |
| `visible_marketplace` | BOOLEAN | Si las empresas lo pueden ver (se activa al completar ruta) |

### Experiencia

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_experiencia` | BIGINT (PK) | ID único |
| `id_perfil` | BIGINT (FK → `Perfil`) | Perfil al que pertenece |
| `empresa` | VARCHAR(100) | Nombre de la empresa |
| `cargo` | VARCHAR(100) | Cargo ocupado |
| `fecha_inicio` | DATE | Fecha inicio |
| `fecha_fin` | DATE | Fecha fin (nullable = trabajo actual) |
| `descripcion` | VARCHAR(500) | Logros principales |

### PerfilSkill (skills validadas/adquiridas)

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | BIGINT (PK) | ID único |
| `id_perfil` | BIGINT (FK → `Perfil`) | Perfil |
| `id_skill` | BIGINT (FK → `Skill`) | Skill |
| `origen` | VARCHAR(20) | "diagnostico", "ruta_aprendizaje", "manual" |
| `nivel` | VARCHAR(15) | "basico", "intermedio", "avanzado" |
| `validada` | BOOLEAN | Si fue validada por la plataforma (true si origen != manual) |

---

## Endpoints

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `GET` | `/api/Perfiles/mi-perfil` | Obtener mi perfil completo | ✅ Sí |
| `PUT` | `/api/Perfiles/mi-perfil` | Actualizar datos básicos (titular, bio) | ✅ Sí |
| `POST` | `/api/Perfiles/experiencia` | Agregar experiencia laboral | ✅ Sí |
| `PUT` | `/api/Perfiles/experiencia/{id}` | Editar experiencia laboral | ✅ Sí |
| `DELETE`| `/api/Perfiles/experiencia/{id}` | Eliminar experiencia | ✅ Sí |
| `GET` | `/api/Perfiles/{id}` | Ver perfil público (empresas) | ✅ Sí (Empresa) |

---

## Lógica de negocio

### Creación automática
- El perfil se crea automáticamente al registrarse el usuario con `tipo_usuario = "profesional"`, con `visible_marketplace = false`.
- El AuthService (ver `02-autenticacion-jwt.md`) debe disparar esta creación en el `RegisterAsync`.

### Actualización automática de skills
Las `PerfilSkill` se actualizan desde otros módulos:
- **Al completar diagnóstico** (ver `03-diagnostico.md`): se agregan las skills de las categorías con nivel `avanzado`, con `origen = "diagnostico"` y `validada = true`.
- **Al completar un módulo de ruta** (ver `05-rutas-aprendizaje.md`): se agregan las skills asociadas al módulo (vía `ModuloSkill`), con `origen = "ruta_aprendizaje"` y `validada = true`.
- **Manual**: el usuario puede agregar skills desde su perfil, con `origen = "manual"` y `validada = false`.

### Visibilidad en marketplace
- Solo perfiles con `visible_marketplace = true` aparecen en las búsquedas de empresas (ver `08-vacantes-marketplace.md`).
- Se activa cuando el usuario completa todos los módulos de su ruta de aprendizaje (ver `05-rutas-aprendizaje.md`).
