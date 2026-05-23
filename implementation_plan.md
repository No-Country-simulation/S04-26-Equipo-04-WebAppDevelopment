# Plan de Implementación: Postulaciones, Seguridad de Registro y Robustez de Vacantes

Este plan amplía el backend para resolver las observaciones del revisor, logrando un MVP completo y robusto.

## User Review Required

> [!IMPORTANT]
> **Cambios en Vacante y Nuevas Entidades:**
> 1. Cambiaremos `Activa` (bool) por `Estado` (string: `"abierta"` / `"cerrada"`) en la entidad `Vacante` para alinearnos 100% con la documentación del Módulo 08.
> 2. Crearemos la entidad `Postulacion` (`id_postulacion`, `id_usuario`, `id_vacante`, `fecha_aplicacion`, `estado_seleccion`, `feedback_empresa`, `fecha_feedback`).
>
> **Seguridad y Validación de Roles en Registro:**
> * En `AuthService.cs`, restringiremos `TipoUsuario` para aceptar únicamente `"profesional"` o `"empresa"`. Si se envía `"admin"` o cualquier otro valor, se lanzará una excepción.
>
> **Validaciones de Vacantes:**
> * Exigir al menos 1 skill por vacante.
> * Evitar duplicados de skills eliminándolos de forma automática antes de guardar.
>
> **Módulo de Postulaciones:**
> * Solo candidatos (`"profesional"`) pueden postularse a vacantes `"abierta"`. No pueden postularse dos veces a la misma.
> * Solo empresas (`"empresa"`) dueñas de la vacante pueden ver postulantes y cambiar el estado (`"aplicado"`, `"en_proceso"`, `"rechazado"`, `"seleccionado"`).
> * Es obligatorio proveer `feedback_empresa` (feedback constructivo) si el estado cambia a `"rechazado"` o `"seleccionado"`.

---

## Proposed Changes

### Componente: Base de Datos y Entidades

#### [MODIFY] [Vacante.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/Vacante.cs)
*   Reemplazar `public bool Activa { get; set; }` por `public string Estado { get; set; } = "abierta";` (mapeado a `estado` en base de datos).

#### [NEW] [Postulacion.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/Postulacion.cs)
*   Representa la aplicación de un candidato a una vacante.
*   **Campos:**
    *   `Id` (long, PK) -> Mapeado a `id_postulacion`
    *   `UsuarioId` (long, FK -> Usuario) -> Mapeado a `id_usuario`
    *   `VacanteId` (long, FK -> Vacante) -> Mapeado a `id_vacante`
    *   `FechaAplicacion` (DateTime) -> Mapeado a `fecha_aplicacion`
    *   `EstadoSeleccion` (string) -> Mapeado a `estado_seleccion` ("aplicado", "en_proceso", "rechazado", "seleccionado")
    *   `FeedbackEmpresa` (string, nullable) -> Mapeado a `feedback_empresa`
    *   `FechaFeedback` (DateTime?, nullable) -> Mapeado a `fecha_feedback`
    *   `Usuario` (navegación a `Usuario`)
    *   `Vacante` (navegación a `Vacante`)

#### [MODIFY] [AppDbContext.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Data/AppDbContext.cs)
*   Añadir `DbSet<Postulacion> Postulaciones { get; set; }`.
*   Mapear la entidad `Postulacion` y ajustar el mapeo de `Vacante.Estado`.

---

### Componente: Servicios y Validación

#### [MODIFY] [AuthService.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Services/AuthService.cs)
*   Validar en `RegisterAsync`:
    ```csharp
    var rol = (dto.TipoUsuario ?? string.Empty).ToLower().Trim();
    if (rol != "profesional" && rol != "empresa")
    {
        throw new Exception("El tipo de usuario especificado no es válido.");
    }
    ```

#### [MODIFY] [VacanteService.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Services/VacanteService.cs)
*   Validar en `CreateAsync` y `UpdateAsync` que `dto.SkillsRequeridas` tenga al menos 1 elemento.
*   Eliminar duplicados antes del mapeo: `dto.SkillsRequeridas = dto.SkillsRequeridas.DistinctBy(s => s.SkillId).ToList();`.
*   Ajustar lógica de asignación para usar `Estado = "abierta"`.

#### [NEW] [IPostulacionRepository.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Repositories/IPostulacionRepository.cs) y [PostulacionRepository.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Repositories/PostulacionRepository.cs)
*   Soporte para persistir postulaciones y consultar por candidato o vacante.

#### [NEW] [IPostulacionService.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Services/IPostulacionService.cs) y [PostulacionService.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Services/PostulacionService.cs)
*   Lógica para aplicar a vacante, listar aplicaciones del profesional, listar candidatos aplicados a una vacante empresarial, y actualizar estado con validación obligatoria de feedback.

---

### Componente: Controladores y APIs

#### [NEW] [PostulacionesController.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Controllers/PostulacionesController.cs)
*   Endpoints según la documentación:
    *   `POST /api/Postulaciones` -> Aplicar a vacante (`Roles = "profesional"`)
    *   `GET /api/Postulaciones/mis-aplicaciones` -> Ver mis postulaciones (`Roles = "profesional"`)
    *   `GET /api/Postulaciones/vacante/{vacanteId}` -> Ver aplicantes a mi vacante (`Roles = "empresa"`)
    *   `PUT /api/Postulaciones/{id}/estado` -> Cambiar estado de selección y dejar feedback (`Roles = "empresa"`)

---

## Plan de Verificación

### Pruebas Automatizadas
1. Generar y aplicar migración:
   `dotnet ef migrations add AddPostulacionesAndVacanteEstado`
   `dotnet ef database update`
2. Compilar con `dotnet build`.

### Copia de Archivos al Workspace del Usuario
Para que el usuario y su revisor puedan inspeccionar todos los artefactos en su IDE (VS Code, etc.):
*   Copiaremos `test_flow.ps1` y `test_marketplace.ps1` a `c:\Users\riki\Desktop\04\scratch/`.
*   Copiaremos `task.md`, `walkthrough.md` e `implementation_plan.md` a `c:\Users\riki\Desktop\04/docs/` (o la raíz del proyecto).
