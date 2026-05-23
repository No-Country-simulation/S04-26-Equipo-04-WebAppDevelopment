using System;

namespace Talent.API.DTO
{
    public class PostulacionResponseDTO
    {
        public long Id { get; set; }
        public long UsuarioId { get; set; }
        public string ProfesionalNombre { get; set; } = string.Empty;
        public string ProfesionalEmail { get; set; } = string.Empty;
        public long VacanteId { get; set; }
        public string VacanteTitulo { get; set; } = string.Empty;
        public string EmpresaNombre { get; set; } = string.Empty;
        public DateTime FechaAplicacion { get; set; }
        public string EstadoSeleccion { get; set; } = string.Empty;
        public string? FeedbackEmpresa { get; set; }
        public DateTime? FechaFeedback { get; set; }
    }

    public class CreatePostulacionDTO
    {
        public long VacanteId { get; set; }
    }

    public class UpdatePostulacionEstadoDTO
    {
        public string EstadoSeleccion { get; set; } = string.Empty; // "aplicado", "en_proceso", "rechazado", "seleccionado"
        public string? FeedbackEmpresa { get; set; }
    }
}
