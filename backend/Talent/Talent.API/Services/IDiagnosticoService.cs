using Talent.API.DTO;

namespace Talent.API.Services
{
    public interface IDiagnosticoService
    {
        Task<List<CategoriaPreguntasDTO>> ObtenerPreguntasAsync();
        Task<DiagnosticoResponseDTO> IniciarDiagnosticoAsync(long usuarioId);
        Task<ResultadoDiagnosticoDTO> ResponderDiagnosticoAsync(ResponderDiagnosticoDTO dto, long usuarioId);
        Task<ResultadoDiagnosticoDTO> ObtenerResultadoAsync(long diagnosticoId, long usuarioId);
    }

    public class DiagnosticoResponseDTO
    {
        public long Id { get; set; }
        public DateTime Fecha { get; set; }
        public string Estado { get; set; } = string.Empty;
    }
}
