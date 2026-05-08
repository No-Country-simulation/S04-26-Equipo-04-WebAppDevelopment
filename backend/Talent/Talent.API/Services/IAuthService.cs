using Talent.API.DTO;

namespace Talent.API.Services
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> RegisterAsync(RegisterDTO dto);
        Task<AuthResponseDTO?> LoginAsync(LoginDTO dto);
    }
}
