using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public interface IUsuarioRepository
    {
        Task<List<Usuario>> GetAllAsync();
        Task<Usuario?> GetByIdAsync(long id);
        Task<Usuario> CreateAsync(Usuario usuario);
        Task<Usuario?> UpdateAsync(long id, Usuario usuario);
        Task<bool> DeleteAsync(long id);
    }
}
