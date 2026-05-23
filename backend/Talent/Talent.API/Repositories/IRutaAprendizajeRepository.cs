using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public interface IRutaAprendizajeRepository
    {
        Task<RutaAprendizaje?> GetRutaActivaPorUsuarioIdAsync(long usuarioId);
        Task<RutaAprendizaje> CreateRutaAprendizajeAsync(RutaAprendizaje ruta);
        Task<ProgresoModulo?> GetProgresoModuloByIdAsync(long progresoId);
        Task<ProgresoClase?> GetProgresoClaseByIdAsync(long progresoClaseId);
        Task<List<Clase>> GetClasesPorModuloIdAsync(long moduloId);
        Task<ProgresoModulo?> GetProgresoModuloConClasesAsync(long progresoModuloId);
        Task AddProgresosClaseAsync(IEnumerable<ProgresoClase> progresos);
        Task UpdateRutaAndProgresoAsync();
    }
}
