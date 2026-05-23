using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public interface IPerfilRepository
    {
        Task<Perfil?> GetPerfilByUsuarioIdAsync(long usuarioId);
        Task<Perfil?> GetPerfilByIdAsync(long perfilId);
        Task<List<Perfil>> GetPerfilesVisiblesAsync();
        Task<Perfil> CreatePerfilAsync(Perfil perfil);
        Task UpdatePerfilAsync(Perfil perfil);
        Task<Experiencia> AddExperienciaAsync(Experiencia experiencia);
        Task<Experiencia?> GetExperienciaByIdAsync(long id);
        Task DeleteExperienciaAsync(Experiencia experiencia);
        Task AddPerfilSkillAsync(PerfilSkill perfilSkill);
        Task<PerfilSkill?> GetPerfilSkillAsync(long perfilId, long skillId);
        Task SaveAsync();
    }
}
