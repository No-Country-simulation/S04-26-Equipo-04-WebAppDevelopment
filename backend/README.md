# 🚀 Talent API — Guía de Arquitectura y MVP

Este directorio contiene toda la especificación técnica y de negocio para el Backend de la Plataforma de Empleabilidad +45. 

A continuación se detalla cómo el sistema soporta los flujos principales para los dos tipos de usuarios: **Profesionales** (talento) y **Empresas** (reclutadores), y qué documentación técnica (`.md`) corresponde a cada paso.

---

## 🧑‍💼 Flujo del Profesional (+45)

El objetivo del profesional es actualizar sus habilidades, demostrar su valor y conectar con oportunidades reales.

### 1. Onboarding y Registro
- El usuario se registra en la plataforma creando una cuenta base.
- Inicia sesión y obtiene un token JWT para navegar de forma segura.
- 📄 **Docs técnicos:** 
  - `01-api-endpoints-frontend.md` (Endpoints generales)
  - `02-autenticacion-jwt.md` (Seguridad y Tokens)

### 2. Autodiagnóstico Inicial
- Al entrar por primera vez, el usuario completa un cuestionario de 15 minutos.
- El sistema evalúa sus habilidades digitales, cognitivas y socioemocionales.
- Se identifican brechas (skills en nivel bajo/medio) y se generan recomendaciones.
- 📄 **Docs técnicos:** 
  - `03-diagnostico.md` (Lógica de evaluación)
  - `04-skills.md` (Diccionario de habilidades evaluadas)

### 3. Upskilling: Rutas de Aprendizaje
- Basado en los resultados del diagnóstico, el sistema le asigna automáticamente una **Ruta de Aprendizaje** personalizada (3-5 módulos cortos).
- El usuario consume el contenido y marca su progreso.
- **Hito clave:** Al superar el 80% de la ruta, su perfil se vuelve visible para las empresas en el Marketplace.
- 📄 **Docs técnicos:** 
  - `05-rutas-aprendizaje.md` (Generación de rutas y tracking)

### 4. Construcción del "CV Vivo"
- Mientras el usuario avanza, su perfil se nutre automáticamente.
- Las skills validadas por el diagnóstico y las adquiridas en los cursos se agregan a su perfil público.
- El usuario puede completar su experiencia previa (empresas, cargos, logros).
- 📄 **Docs técnicos:** 
  - `06-perfil-dinamico.md` (Estructura del perfil)

### 5. Postulación a Oportunidades
- Con su perfil activo, el usuario puede buscar vacantes publicadas por empresas y aplicar a ellas.
- 📄 **Docs técnicos:** 
  - `08-vacantes-marketplace.md` (Búsqueda y aplicación)

---

## 🏢 Flujo de la Empresa (Reclutador)

El objetivo de la empresa es encontrar talento senior pre-validado, reduciendo el riesgo de contratación y los tiempos de filtrado.

### 1. Registro Corporativo
- El reclutador se registra con una cuenta de tipo `Empresa`.
- Completa el perfil de su compañía (logo, descripción, sector).
- 📄 **Docs técnicos:** 
  - `02-autenticacion-jwt.md` (Auth con roles)
  - `07-empresas.md` (Gestión de cuentas corporativas)

### 2. Publicación de Vacantes
- La empresa publica oportunidades laborales.
- Define qué **Skills** (del catálogo unificado) y qué nivel son requisito excluyente o deseable.
- 📄 **Docs técnicos:** 
  - `04-skills.md` (Catálogo de requerimientos)
  - `08-vacantes-marketplace.md` (Creación de ofertas)

### 3. Búsqueda en el Talent Marketplace
- La empresa no tiene que esperar postulaciones; puede buscar talento proactivamente.
- El sistema solo le muestra a los profesionales que superaron la ruta mínima (`visible_marketplace = true`).
- Puede filtrar candidatos exactamente por las mismas **Skills** del diagnóstico.
- 📄 **Docs técnicos:** 
  - `06-perfil-dinamico.md` (Consumo de perfiles públicos)
  - `08-vacantes-marketplace.md` (Búsqueda en marketplace)

### 4. Preselección y Feedback
- La empresa evalúa los perfiles (tanto los que aplicaron como los que encontró en el marketplace).
- Cuando avanza o rechaza a un candidato, el sistema le obliga a dejar un **feedback estructurado**. Esto cierra el ciclo, dándole al profesional información valiosa sobre cómo seguir mejorando.
- 📄 **Docs técnicos:** 
  - `08-vacantes-marketplace.md` (Gestión de postulaciones y feedback)

---

## ⚙️ Prerrequisitos (Paso 0)

Antes de construir cualquier módulo nuevo, hay que actualizar el código base existente:

- Agregar `TipoUsuario` a la entidad `Usuario` ("profesional", "empresa", "admin")
- Configurar `UseAuthentication()` en el pipeline
- Proteger endpoints con `[Authorize]`
- Incluir el rol en el token JWT

📄 **Todo esto está detallado en:** `00-actualizacion-base.md`

---

## 🛠️ Resumen de Documentación Técnica

Si sos desarrollador Backend o Frontend, esta es tu ruta de lectura sugerida:

0. **`00-actualizacion-base.md`** - ⚠️ LEER PRIMERO. Cambios al código existente y convenciones del proyecto.
1. **`01-api-endpoints-frontend.md`** - Reglas generales de la API y endpoints base.
2. **`02-autenticacion-jwt.md`** - Cómo funciona el login, registro y tokens.
3. **`03-diagnostico.md`** - Modelo del quiz y cálculo de resultados.
4. **`04-skills.md`** - Tabla maestra de categorías y habilidades (usada por TODOS los módulos).
5. **`05-rutas-aprendizaje.md`** - Lógica de personalización de cursos.
6. **`06-perfil-dinamico.md`** - Modelo de datos del profesional (CV vivo).
7. **`07-empresas.md`** - Modelo de datos de compañías.
8. **`08-vacantes-marketplace.md`** - Búsqueda de talento, postulaciones y feedback.

### Convenciones importantes

| Aspecto | Convención |
|---------|-----------|
| Tipo de IDs | `BIGINT` / `long` en C# |
| Escala de niveles | `"basico"`, `"intermedio"`, `"avanzado"` |
| Tabla de categorías | Una sola: `CategoriaSkill` (definida en `04-skills.md`) |
| Roles de usuario | `"profesional"`, `"empresa"`, `"admin"` |
