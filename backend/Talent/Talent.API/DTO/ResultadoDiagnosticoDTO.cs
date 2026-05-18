namespace Talent.API.DTO
{
    public class ResultadoDiagnosticoDTO
    {
        public long DiagnosticoId { get; set; }
        public string Estado { get; set; } = string.Empty;
        public List<CategoriaResultadoDTO> Resultados { get; set; } = new List<CategoriaResultadoDTO>();
    }

    public class CategoriaResultadoDTO
    {
        public string Categoria { get; set; } = string.Empty;
        public int PuntajeObtenido { get; set; }
        public int PuntajeMaximo { get; set; }
        public string Nivel { get; set; } = string.Empty;
        public string Recomendacion { get; set; } = string.Empty;
    }
}
