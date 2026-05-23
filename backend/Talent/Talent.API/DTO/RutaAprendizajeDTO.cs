namespace Talent.API.DTO
{
    public class RutaAprendizajeResponseDTO
    {
        public long Id { get; set; }
        public long UsuarioId { get; set; }
        public long DiagnosticoId { get; set; }
        public DateTime FechaCreacion { get; set; }
        public string Estado { get; set; } = string.Empty;
        public List<ProgresoModuloResponseDTO> Progresos { get; set; } = new List<ProgresoModuloResponseDTO>();
    }

    public class ProgresoModuloResponseDTO
    {
        public long Id { get; set; }
        public long RutaId { get; set; }
        public long ModuloId { get; set; }
        public string Estado { get; set; } = string.Empty;
        public DateTime? FechaInicio { get; set; }
        public DateTime? FechaCompletado { get; set; }
        public ModuloResponseDTO Modulo { get; set; } = null!;
        public List<ProgresoClaseResponseDTO> ProgresosClase { get; set; } = new List<ProgresoClaseResponseDTO>();
    }

    public class ProgresoClaseResponseDTO
    {
        public long Id { get; set; }
        public long ProgresoModuloId { get; set; }
        public long ClaseId { get; set; }
        public bool Completado { get; set; }
        public DateTime? FechaCompletado { get; set; }
        public ClaseResponseDTO Clase { get; set; } = null!;
    }
}
