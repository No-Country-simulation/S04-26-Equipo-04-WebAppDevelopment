# Walkthrough: Rutas de Aprendizaje, CV Vivo, Vacantes, Marketplace de Match, Postulaciones y Feedback

Este documento resume las implementaciones del backend (.NET 10 Web API) de la plataforma "Talent" para las siguientes etapas:
1. **Rutas de Aprendizaje con Clases Integradas** (Módulo 05)
2. **CV Vivo / Perfil Dinámico** (Módulo 06)
3. **Gestión de Vacantes por Empresas** (Módulo 07)
4. **Marketplace de Talentos con Algoritmo de Match** (Módulo 08)
5. **Robustez, Seguridad, Postulaciones y Feedback** (Módulo 08 - Fase 3 + Ajustes Finales de Robustez)

---

## Cambios Realizados

### 1. Modelos de Base de Datos y Entidades
*   **[Clase.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/Clase.cs):** Representa cada lección individual de un curso. Contiene campos como `Titulo`, `Descripcion`, `VideoUrl` (para reproducir videos embebidos de YouTube/Vimeo) y `ContenidoTexto` para explicaciones adicionales.
*   **[ProgresoClase.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/ProgresoClase.cs):** Tabla pivot para asociar el progreso de cada usuario a nivel de lección/clase individual.
*   **[Perfil.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/Perfil.cs):** CV Vivo de un profesional, incluyendo biografía, titular, enlace de LinkedIn y bandera de `VisibleMarketplace`.
*   **[PerfilSkill.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/PerfilSkill.cs):** Habilidades asociadas al perfil del usuario, registrando su `Origen` ("diagnostico", "ruta_aprendizaje", o "manual"), su `Nivel` ("basico", "intermedio", "avanzado"), y si está `Validada`.
*   **[Experiencia.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/Experiencia.cs):** Registra la trayectoria laboral del profesional.
*   **[Vacante.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/Vacante.cs):** Búsquedas laborales de empresas, con propiedad `Estado` (string: `"abierta"`, `"cerrada"`).
*   **[VacanteSkill.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/VacanteSkill.cs):** Habilidades y `NivelRequerido` mínimo.
*   **[Postulacion.cs](file:///c:/Users/riki/Desktop/04/backend/Talent/Talent.API/Entities/Postulacion.cs):** Representa la aplicación de un candidato a una vacante.

### 2. Base de Datos y Restricciones de Integridad
*   **Índice Único Compuesto:** En `AppDbContext.cs` y mediante la migración `AddUniqueIndexPostulaciones`, agregamos un índice único compuesto sobre `(id_usuario, id_vacante)` para evitar doble postulación concurrente a nivel de base de datos.
*   **Corrección de Datos Existentes:** En la migración, incorporamos un script SQL para actualizar automáticamente las vacantes existentes con estado vacío o nulo a `"abierta"`:
    ```sql
    UPDATE vacantes SET estado = 'abierta' WHERE estado = '' OR estado IS NULL;
    ```

### 3. Servicios de Negocio y Validación
*   **Validación de Perfil Visible (`VisibleMarketplace`)**: En `PostulacionService.cs`, antes de procesar una postulación, verificamos que el candidato tenga su perfil activo/visible en el marketplace (`VisibleMarketplace == true`). Si no ha completado su diagnóstico y ruta de aprendizaje, el sistema bloquea la postulación de inmediato.
*   **Validación del Estado de Vacante**: En `VacanteService.cs`, al crear o actualizar una vacante, se valida estrictamente que el estado provisto sea `"abierta"` o `"cerrada"`. Cualquier otro string (ej. `"banana"`) es rechazado con error `400 Bad Request`.
*   **Seguridad de Autenticación y Registro**: En `AuthService.cs` limitamos el tipo de usuario a `"profesional"` o `"empresa"` únicamente, previniendo escalamiento de privilegios.

### 4. Controladores y API
*   **Soporte de Rutas Flexibles**: Modificamos el endpoint para listar postulaciones en `PostulacionesController.cs`. Ahora responde tanto en `/api/Postulaciones/mis-postulaciones` como en el endpoint oficial `/api/Postulaciones/mis-aplicaciones` mediante doble decorador de ruta.

---

## Verificación y Pruebas E2E

### 1. Validación de Ruta y CV Vivo (`test_flow.ps1`):
*   Verifica registro, diagnóstico, ruta de aprendizaje y habilitación automática en el buscador de talentos al graduarse.

### 2. Validación Completa de Robustez, Vacantes y Postulaciones (`test_marketplace.ps1`):
Ejecutado con éxito con las siguientes aserciones verificadas:
1.  **Visibilidad en el Marketplace:** Se comprobó que el profesional graduado aparece visible.
2.  **Publicación de Empleo:** Se publicó una vacante inicial.
3.  **Validación de Estado Invalido:** Se intentó actualizar la vacante con estado `"banana"`, siendo bloqueado con un `400 Bad Request`.
4.  **Transiciones de Estado de Vacantes:** Se verificó el flujo `"cerrada"` y `"abierta"` de la vacante.
5.  **Cálculo de Match:** Match inteligente verificado.
6.  **Bloqueo de Postulación No Visible:** Se registró un candidato nuevo que no completó su ruta (no visible) e intentó postularse. El backend rechazó la acción con `400 Bad Request` indicando que debe activar su CV Vivo primero.
7.  **Postulación Válida y Concurrencia:** El candidato visible se postuló con éxito. Intentar postularse por segunda vez disparó la restricción de base de datos/servicio retornando `400 Bad Request`.
8.  **Seguridad de Vacantes y Feedback Obligatorio:** Se comprobó el bloqueo para empresas terceras y la validación de feedback obligatorio constructivo al cambiar estado a `"rechazado"` y `"seleccionado"`.
