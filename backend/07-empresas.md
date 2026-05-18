# 7. Módulo de Empresas

## ¿Qué es?

Gestión de las empresas aliadas que buscan contratar talento senior validado. Las empresas se registran, configuran su perfil corporativo y pueden publicar vacantes o buscar en el marketplace de talento.

> ⚠️ **Prerrequisito:** Este módulo requiere que `Usuario` tenga el campo `tipo_usuario` implementado (ver `00-actualizacion-base.md`). Un usuario con `tipo_usuario = "empresa"` puede crear y gestionar su empresa.

---

## Entidades

### Empresa

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id_empresa` | BIGINT (PK) | ID único |
| `id_usuario` | BIGINT (FK → `Usuario`) | Usuario administrador de la empresa (debe tener `tipo_usuario = "empresa"`) |
| `razon_social` | VARCHAR(100) | Nombre de la empresa |
| `cuit` | VARCHAR(20) | Identificador fiscal |
| `sector` | VARCHAR(50) | Ej: "Tecnología", "Finanzas" |
| `descripcion` | VARCHAR(500) | Breve presentación |
| `logo_url` | VARCHAR(300) | Logo corporativo |
| `estado` | VARCHAR(20) | "activa" (MVP: se activa automáticamente al registrarse) |

---

## Endpoints

| Método | URL | Descripción | Auth |
|--------|-----|-------------|------|
| `POST` | `/api/Empresas/registro` | Registrar una nueva empresa | ✅ Sí (tipo_usuario = "empresa") |
| `GET` | `/api/Empresas/mi-empresa` | Obtener datos de mi empresa | ✅ Sí (Empresa) |
| `PUT` | `/api/Empresas/mi-empresa` | Actualizar perfil empresa | ✅ Sí (Empresa) |
| `GET` | `/api/Empresas` | Listar empresas (Admin) | ✅ Admin |

---

## Lógica de negocio

### Registro de empresa
1. El reclutador se registra con `tipo_usuario = "empresa"` vía `/api/Auth/register` (ver `02-autenticacion-jwt.md`).
2. Luego completa el perfil de su compañía vía `POST /api/Empresas/registro`.
3. En el MVP, la empresa se activa automáticamente (`estado = "activa"`).

### Validaciones
- Un usuario solo puede tener UNA empresa asociada.
- Solo usuarios con `tipo_usuario = "empresa"` pueden acceder a estos endpoints.
- La empresa debe estar en `estado = "activa"` para publicar vacantes o buscar en el marketplace.

### Relación con otros módulos
- **Vacantes** (`08`): requiere tener empresa activa para publicar.
- **Marketplace** (`08`): requiere tener empresa activa para buscar talento.
- **Postulaciones** (`08`): la empresa recibe y evalúa candidatos.
