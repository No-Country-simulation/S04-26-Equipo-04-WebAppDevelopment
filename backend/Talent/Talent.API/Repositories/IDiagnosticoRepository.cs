using Talent.API.DTO;
using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public interface IDiagnosticoRepository
    {
        Task<List<CategoriaPreguntasDTO>> GetCategoriasConPreguntasAsync();
        Task<Diagnostico> CreateDiagnosticoAsync(Diagnostico diagnostico);
        Task<Diagnostico?> GetDiagnosticoByIdAsync(long id);
        Task UpdateDiagnosticoAsync(Diagnostico diagnostico);
        Task AddRespuestasAsync(IEnumerable<RespuestaDiagnostico> respuestas);
        Task AddResultadosAsync(IEnumerable<ResultadoDiagnostico> resultados);
        Task<List<PreguntaDiagnostico>> GetPreguntasByListaIdsAsync(IEnumerable<long> preguntaIds);
    }
}
