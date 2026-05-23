namespace Talent.API.DTO
{
    public class ClaseResponseDTO
    {
        public long Id { get; set; }
        public long ModuloId { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string VideoUrl { get; set; } = string.Empty;
        public string ContenidoTexto { get; set; } = string.Empty;
        public int Orden { get; set; }
    }
}
