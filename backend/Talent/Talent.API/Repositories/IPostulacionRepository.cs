using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public interface IPostulacionRepository
    {
        Task<Postulacion?> GetByIdAsync(long id);
        Task<List<Postulacion>> ListarPorProfesionalAsync(long usuarioId);
        Task<List<Postulacion>> ListarPorVacanteAsync(long vacanteId);
        Task<Postulacion?> GetByUsuarioAndVacanteAsync(long usuarioId, long vacanteId);
        Task<Postulacion> CreateAsync(Postulacion postulacion);
        Task<Postulacion> UpdateAsync(Postulacion postulacion);
    }
}
