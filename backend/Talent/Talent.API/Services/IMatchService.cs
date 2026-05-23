using Talent.API.DTO;

namespace Talent.API.Services
{
    public interface IMatchService
    {
        Task<List<MatchCandidatoDTO>> GetCandidatosParaVacanteAsync(long vacanteId, long empresaId);
        Task<List<MatchVacanteDTO>> GetVacantesParaProfesionalAsync(long usuarioId);
    }
}
