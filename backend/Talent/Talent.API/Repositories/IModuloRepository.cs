using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public interface IModuloRepository
    {
        Task<List<Modulo>> GetModulosActivosAsync();
        Task<Modulo?> GetModuloByIdAsync(long id);
        Task<List<Modulo>> GetModulosPorCategoriasAsync(IEnumerable<long> categoriaIds);
    }
}
