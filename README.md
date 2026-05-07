# 📘 Documentación del Repositorio

## Plataforma de Empleabilidad y Formación +45

---

# 🚀 1. Descripción del Proyecto

Esta plataforma tiene como objetivo mejorar la empleabilidad de profesionales +45 mediante:

* Diagnóstico de habilidades
* Formación personalizada (upskilling / reskilling)
* Construcción de un perfil profesional dinámico (CV vivo)
* Conexión con empresas a través de un marketplace de talento

👉 Enfoque principal: convertir experiencia en empleabilidad real basada en evidencia de habilidades.

## Documentación de producto

Para alinear decisiones de negocio y alcance de MVP:

* `docs/contexto-problema.md`
* `docs/segmento-prioritario-mvp.md`
* `docs/prd-mvp-v1.md`

---

# 🧱 2. Arquitectura del Sistema

El sistema está diseñado bajo **Clean Architecture con enfoque hexagonal**, permitiendo escalabilidad, orden y trabajo en equipo.

## 📦 Capas del sistema

### 1. Domain (núcleo)

* Entidades del negocio
* Reglas de negocio puras

Ejemplo:

* User
* Skill
* LearningPath
* JobProfile

---

### 2. Application (casos de uso)

* Lógica de negocio
* Flujos del sistema

Ejemplo:

* GenerateLearningPath
* CompleteAssessment
* UpdateUserSkills

---

### 3. Infrastructure (externos)

* Base de datos
* Servicios externos
* Integraciones

Ejemplo:

* PostgreSQL (Supabase)
* Email service
* Storage

---

### 4. Interfaces (API)

* Controladores REST
* Comunicación con frontend

Ejemplo:

* AuthController
* UserController
* MarketplaceController

---

# ⚙️ 3. Stack Tecnológico

## 🖥️ Frontend

* Next.js
* React
* Deploy: Vercel (gratis)
* Pruebas: Vitest (unitarias) + Playwright (E2E smoke)

### Comandos clave del frontend

Desde `frontend/`:

* `npm run dev`
* `npm run lint`
* `npm run typecheck`
* `npm run test`
* `npm run test:e2e`

---

## ⚙️ Backend

* ASP.NET Core (.NET 8)
* Arquitectura: Clean Architecture (Hexagonal)
* Deploy: Azure / Railway / Render

---

## 🗄️ Base de Datos

* PostgreSQL (Supabase)
* Uso: persistencia de datos estructurados

---

## 🔐 Autenticación

* JWT en ASP.NET Core
* Roles: Usuario, Empresa, Admin

---

# 🔁 4. Flujo del Usuario

1. Registro / Login
2. Diagnóstico de habilidades
3. Generación de ruta de aprendizaje
4. Formación por módulos
5. Construcción de CV vivo
6. Acceso al marketplace
7. Aplicación a oportunidades
8. Feedback de empresas

---

# 👥 5. Organización del Equipo (9 personas)

## Frontend (3 personas)

* UI/UX
* Consumo de API
* Dashboard usuario

## Backend (4 personas)

* API REST
* Lógica de negocio
* Autenticación
* Marketplace

## Data / DB (1-2 personas)

* Modelado de base de datos
* Optimización de consultas
* Relaciones entre entidades

---

# 🧩 6. Módulos del Sistema

* Auth Module
* User Module
* Assessment Module
* Learning Module
* Skill Tracking Module
* Marketplace Module
* Company Module

---

# 🧪 7. Principios de Desarrollo

* Código modular
* Separación de responsabilidades
* Escalabilidad
* Testeable
* APIs desacopladas

---

# 🚀 8. Objetivo del MVP

Validar que es posible:

👉 mejorar la empleabilidad de profesionales +45 conectando:

* formación práctica
* validación de habilidades
* acceso directo a empresas

---

# 💡 9. Valor del Proyecto

## Para usuarios:

* Empleabilidad real
* Reinvención profesional
* Evidencia de habilidades

## Para empresas:

* Acceso a talento senior validado
* Menor riesgo de contratación

## Para el ecosistema:

* Revalorización del talento +45
* Inclusión laboral

---

# 📌 10. Convención de arquitectura

```plaintext
/src
  /domain
  /application
  /infrastructure
  /interfaces
```

---

# 🧠 11. Nota final

Este proyecto no es solo una plataforma de formación.

👉 Es un sistema de empleabilidad basado en evidencia de habilidades.
