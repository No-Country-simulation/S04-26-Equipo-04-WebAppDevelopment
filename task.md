# Tareas de Implementación: Postulaciones y Robustez del MVP (Fase 3)

## 📌 Seguridad y Robustez de Vacantes/Auth
- [x] Validar `TipoUsuario` en `AuthService.cs` (permitir solo profesional y empresa) <!-- id: 47 -->
- [x] Validar al menos una skill y remover duplicados en `VacanteService.cs` <!-- id: 48 -->

## 🗄️ Entidad y Mapeo de Postulación
- [x] Modificar `Vacante.cs` para cambiar `Activa` (bool) por `Estado` (string) <!-- id: 49 -->
- [x] Crear entidad `Postulacion.cs` en `Entities/` <!-- id: 50 -->
- [x] Registrar `Postulacion` en `AppDbContext.cs` y configurar Fluent API <!-- id: 51 -->
- [x] Generar migración `AddPostulacionesAndVacanteEstado` y aplicar a base de datos Supabase <!-- id: 52 -->

## 📂 DTOs, Repositorio y Servicios de Postulaciones
- [x] Crear `PostulacionDTO.cs` <!-- id: 53 -->
- [x] Crear `IPostulacionRepository` y `PostulacionRepository` e inyectarlo en `Program.cs` <!-- id: 54 -->
- [x] Crear `IPostulacionService` y `PostulacionService` e inyectarlo en `Program.cs` <!-- id: 55 -->

## 🚦 Controlador de Postulaciones
- [x] Crear `PostulacionesController.cs` con endpoints CRUD y de cambio de estado con feedback obligatorio <!-- id: 56 -->

## 🧪 Pruebas E2E y Copia de Archivos al Workspace
- [x] Compilar y verificar sin errores con `dotnet build` <!-- id: 57 -->
- [x] Actualizar script `test_marketplace.ps1` para probar el flujo de postulación, cambio de estado y validación de feedback <!-- id: 58 -->
- [x] Copiar scripts de prueba y artefactos de documentación a la raíz del espacio de trabajo del usuario <!-- id: 59 -->
