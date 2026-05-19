namespace Talent.API.DTO
{
    public class PreguntaResponseDTO
    {
        public long Id { get; set; }
        public string Texto { get; set; } = string.Empty;
        public List<OpcionResponseDTO> Opciones { get; set; } = new List<OpcionResponseDTO>();
    }

    public class OpcionResponseDTO
    {
        public long Id { get; set; }
        public string Texto { get; set; } = string.Empty;
        public int Orden { get; set; }
    }

    public class CategoriaPreguntasDTO
    {
        public string Categoria { get; set; } = string.Empty;
        public List<PreguntaResponseDTO> Preguntas { get; set; } = new List<PreguntaResponseDTO>();
    }
}
