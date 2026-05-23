using Talent.API.DTO;

namespace Talent.API.Services
{
    public interface IModuloService
    {
        Task<List<ModuloResponseDTO>> GetModulosActivosAsync();
        Task<ModuloResponseDTO?> GetModuloByIdAsync(long id);
    }
}
