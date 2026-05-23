using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public interface IVacanteRepository
    {
        Task<Vacante?> GetByIdAsync(long id);
        Task<List<Vacante>> ListarActivasAsync();
        Task<List<Vacante>> ListarPorEmpresaAsync(long empresaId);
        Task<Vacante> CreateAsync(Vacante vacante);
        Task UpdateAsync(Vacante vacante);
        Task DeleteAsync(Vacante vacante);
        Task SaveAsync();
    }
}
