using Talent.API.DTO;

namespace Talent.API.Services
{
    public interface IRutaAprendizajeService
    {
        Task<RutaAprendizajeResponseDTO?> GetRutaActivaPorUsuarioIdAsync(long usuarioId);
        Task<RutaAprendizajeResponseDTO> GenerarRutaDesdeDiagnosticoAsync(long diagnosticoId, long usuarioId);
        Task<ProgresoModuloResponseDTO> GetProgresoModuloConClasesAsync(long progresoModuloId, long usuarioId);
        Task<ProgresoClaseResponseDTO> CompletarClaseAsync(long progresoClaseId, long usuarioId);
    }
}
