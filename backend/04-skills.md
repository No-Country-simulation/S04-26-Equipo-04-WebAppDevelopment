# 4. Módulo de Skills

## ¿Qué es?

El catálogo central de habilidades de la plataforma. Todas las skills están organizadas por categoría y se usan en: diagnóstico, perfiles, vacantes y rutas de aprendizaje. Es el "idioma común" entre profesionales y empresas.

> ⚠️ **`CategoriaSkill` es la tabla maestra de categorías de TODA la plataforma.** La usan: Diagnóstico (`03`), Rutas de aprendizaje (`05`), Perfiles (`06`) y Vacantes (`08`). NO crear tablas de categorías separadas en otros módulos.

---

## Entidades

### CategoriaSkill

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_categoria` | BIGINT (PK) | ID único |
| `nombre` | VARCHAR(50) | Nombre de la categoría |
| `descripcion` | VARCHAR(200) | Descripción |

**Categorías iniciales del MVP:**

| ID | Nombre | Ejemplo de skills |
|----|--------|-------------------|
| 1 | Digital | Excel avanzado, herramientas colaborativas, análisis de datos |
| 2 | Cognitiva | Pensamiento analítico, resolución de problemas, toma de decisiones |
| 3 | Socioemocional | Liderazgo, comunicación, gestión del cambio, trabajo en equipo |
| 4 | Técnica | Gestión de proyectos, finanzas, operaciones, calidad |

### Skill

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_skill` | BIGINT (PK) | ID único |
| `nombre` | VARCHAR(100) | Nombre de la skill |
| `id_categoria` | BIGINT (FK → `CategoriaSkill`) | Categoría a la que pertenece |
| `descripcion` | VARCHAR(300) | Qué implica esta skill |

---

## Endpoints

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `GET` | `/api/Skills` | Listar todas las skills | ❌ No |
| `GET` | `/api/Skills/{id}` | Obtener una skill por ID | ❌ No |
| `GET` | `/api/Skills/categoria/{categoriaId}` | Skills filtradas por categoría | ❌ No |
| `GET` | `/api/Skills/categorias` | Listar todas las categorías | ❌ No |
| `POST` | `/api/Skills` | Crear una skill (admin) | ✅ Sí (Admin) |
| `PUT` | `/api/Skills/{id}` | Actualizar una skill (admin) | ✅ Sí (Admin) |
| `DELETE` | `/api/Skills/{id}` | Eliminar una skill (admin) | ✅ Sí (Admin) |

### GET `/api/Skills` — Response (200)

```json
[
  {
    "id": 1,
    "nombre": "Excel Avanzado",
    "categoria": {
      "id": 1,
      "nombre": "Digital"
    },
    "descripcion": "Tablas dinámicas, macros, análisis de datos con fórmulas avanzadas"
  },
  {
    "id": 2,
    "nombre": "Pensamiento Analítico",
    "categoria": {
      "id": 2,
      "nombre": "Cognitiva"
    },
    "descripcion": "Capacidad de descomponer problemas complejos y analizar información"
  }
]
```

### GET `/api/Skills/categorias` — Response (200)

```json
[
  {
    "id": 1,
    "nombre": "Digital",
    "descripcion": "Habilidades relacionadas con herramientas y tecnologías digitales",
    "cantidadSkills": 8
  }
]
```

---

## Archivos a crear

| Archivo | Qué es |
|---------|--------|
| `Entities/CategoriaSkill.cs` | Entidad categoría |
| `Entities/Skill.cs` | Entidad skill |
| `DTO/SkillDTO.cs` | Response de skill |
| `DTO/CategoriaSkillDTO.cs` | Response de categoría |
| `DTO/CreateSkillDTO.cs` | Request para crear skill |
| `Repository/ISkillRepository.cs` | Interfaz |
| `Repository/SkillRepository.cs` | Implementación |
| `Services/ISkillService.cs` | Interfaz |
| `Services/SkillService.cs` | Lógica |
| `Controllers/SkillsController.cs` | Endpoints |

---

## Seed data

Cargar un catálogo inicial de ~20-30 skills relevantes para el segmento objetivo (profesionales +45 en liderazgo/gestión y técnicos/analíticos).

## Relación con otros módulos

- **Diagnóstico**: las categorías de skills son las mismas que las del diagnóstico
- **Perfiles**: cada perfil tiene skills asociadas con nivel
- **Vacantes**: cada vacante requiere skills específicas
- **Rutas de aprendizaje**: los módulos desarrollan skills específicas
