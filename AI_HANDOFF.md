# 🤖 CONTEXTO PARA IA (AI_HANDOFF)

> **Mensaje para el Asistente de IA que lee esto:** Este archivo es tu punto de partida. Contiene toda la arquitectura, decisiones de diseño y estado actual del MVP "Talent" (Red de Bienestar Laboral para profesionales +45). **Leé esto antes de escribir código.**

---

## 🏗️ 1. Arquitectura y Stack Tecnológico
- **Framework:** .NET 10 (Web API).
- **ORM:** Entity Framework Core (Enfoque **Code-First**).
- **Base de Datos:** PostgreSQL alojada en Supabase.
- **Despliegue:** Render.
- **Patrón de Diseño:** Monolito Modular usando patrón `Controller -> Service -> Repository`.
- **Autenticación:** JWT (JSON Web Tokens) Bearer Auth con claims de roles (`tipoUsuario`).

## 📜 2. Convenciones Críticas de Código (¡Respetar siempre!)
1. **IDs:** Todos los Primary Keys e IDs deben ser del tipo `long` (mapeados a `bigint` en DB).
2. **Nombres de Base de Datos:** Usar DataAnnotations en las entidades para forzar nombres relacionales clásicos. Ej: `[Table("nombre_tabla")]` y `[Column("nombre_columna")]` (snake_case).
3. **Escala de Niveles:** Usar siempre los strings exactos: `"basico"`, `"intermedio"`, `"avanzado"`.
4. **Respuestas de API:** Usar siempre DTOs. Nunca exponer las entidades de la base de datos directamente al Controller.
5. **Swagger:** Está configurado para aceptar JWT y está forzado a mostrarse incluso en Producción (Render).

---

## ✅ 3. Módulos Ya Implementados (MVP Fase 1)

### Módulo 0: Autenticación (Terminado)
- **Entidad principal:** `Usuario`.
- **Endpoints:** `POST /api/Auth/register` y `POST /api/Auth/login`.
- **Notas:** Inyecta rol en el token. El registro está fijado para "profesional".

### Módulo 4: Skills (Base terminada)
- **Entidades:** `CategoriaSkill`, `Skill`.
- Sirven como "Diccionario Central" para agrupar preguntas, rutas y perfiles.

### Módulo 3: Diagnóstico Profesional (Terminado y Testeado)
- **Lógica:** Cuestionario con una pregunta "Filtro" manejada por el Front que carga preguntas por `CategoriaSkill`.
- **Endpoints protegidos con [Authorize]:**
  - `GET /api/Diagnostico/preguntas` (Devuelve el cuestionario agrupado).
  - `POST /api/Diagnostico/iniciar` (Crea la sesión de diagnóstico).
  - `POST /api/Diagnostico/responder` (Recibe respuestas, calcula score por categoría y asigna nivel basico/intermedio/avanzado).
  - `GET /api/Diagnostico/resultado/{id}` (Devuelve el JSON final para graficar el radar).
- **Seeding:** Existe un `DataSeeder.cs` en el pipeline de `Program.cs` que inyecta las preguntas base si la DB está vacía.

### Módulo 5: Rutas de Aprendizaje (Estructura de Base de Datos lista)
- **Entidades creadas y migradas:** `Modulo`, `ModuloSkill`, `RutaAprendizaje`, `ProgresoModulo`.
- **Estado:** Ya existen en `AppDbContext` y en PostgreSQL, pero **falta desarrollar la lógica**.

---

## 🚧 4. Próximos Pasos a Desarrollar (TU TAREA)

El desarrollo debe continuar estrictamente en el siguiente orden:

### PASO A: Lógica de Rutas de Aprendizaje (Módulo 05)
Las tablas ya existen, pero faltan los Repositories, Services y Controllers.
- **Objetivo:** Cuando un usuario completa el Diagnóstico, se debe habilitar un endpoint `POST /api/Rutas/generar`.
- **Algoritmo requerido:** Leer el `ResultadoDiagnostico`. Por cada categoría donde el usuario haya obtenido nivel `"basico"` o `"intermedio"`, la IA del servicio debe crearle una `RutaAprendizaje` y asignarle un `ProgresoModulo` asociándole 3 o 4 "Módulos" (cursos) que existan en la base de datos para esa categoría.
- **Tracking:** Se necesitan endpoints PUT para que el usuario marque un módulo como `completado`.

### PASO B: Perfil Dinámico (Módulo 06)
- **Objetivo:** Consolidar la información del usuario para que las empresas lo vean.
- **Lógica:** Un usuario no es visible en el marketplace hasta que completa su Ruta de Aprendizaje Mínima. Se debe crear una entidad `PerfilProfesional` que agrupe sus Skills validadas.

### PASO C: Empresas y Marketplace (Módulos 07 y 08)
- **Objetivo:** Empresas publican `Vacantes`. El sistema hace un algoritmo de coincidencia (Match) entre las vacantes y los Perfiles Dinámicos de los profesionales +45, comparando los IDs de las `Skills`.

---

## 🔧 5. Comandos Frecuentes del Proyecto
Para interactuar con la Base de Datos, se debe usar la terminal en la carpeta `backend/Talent/Talent.API`:
- Crear migración: `dotnet ef migrations add NombreDeLaMigracion`
- Aplicar a Supabase: `dotnet ef database update`
- Ejecutar proyecto: `dotnet run`
