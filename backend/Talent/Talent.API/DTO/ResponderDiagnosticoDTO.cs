namespace Talent.API.DTO
{
    public class ResponderDiagnosticoDTO
    {
        public long DiagnosticoId { get; set; }
        public List<RespuestaItemDTO> Respuestas { get; set; } = new List<RespuestaItemDTO>();
    }

    public class RespuestaItemDTO
    {
        public long PreguntaId { get; set; }
        public long OpcionId { get; set; }
    }
}
