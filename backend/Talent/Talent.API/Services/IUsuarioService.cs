using Talent.API.DTO;

namespace Talent.API.Services
{
    public interface IUsuarioService
    {
        Task<List<UsuarioResponseDTO>> GetAllAsync();
        Task<UsuarioResponseDTO?> GetByIdAsync(long id);
        Task<UsuarioResponseDTO> CreateAsync(CreateUsuarioDTO dto);
        Task<UsuarioResponseDTO?> UpdateAsync(long id, UpdateUsuarioDTO dto);
        Task<bool> DeleteAsync(long id);
    }
}
