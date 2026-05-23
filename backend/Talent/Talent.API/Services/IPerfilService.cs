using Talent.API.DTO;

namespace Talent.API.Services
{
    public interface IPerfilService
    {
        Task<PerfilResponseDTO?> GetPerfilByUsuarioIdAsync(long usuarioId);
        Task<PerfilResponseDTO?> GetPerfilByIdAsync(long id);
        Task<List<PerfilResponseDTO>> GetPerfilesVisiblesAsync();
        Task<PerfilResponseDTO> CrearPerfilBasicoAsync(long usuarioId);
        Task<PerfilResponseDTO> ActualizarPerfilAsync(long usuarioId, UpdatePerfilDTO dto);
        Task<ExperienciaResponseDTO> AgregarExperienciaAsync(long usuarioId, CreateExperienciaDTO dto);
        Task<ExperienciaResponseDTO> EditarExperienciaAsync(long usuarioId, long experienciaId, UpdateExperienciaDTO dto);
        Task EliminarExperienciaAsync(long usuarioId, long experienciaId);
    }
}
