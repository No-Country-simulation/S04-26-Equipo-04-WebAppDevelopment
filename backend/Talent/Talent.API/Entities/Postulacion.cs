using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("postulaciones")]
    public class Postulacion
    {
        [Key]
        [Column("id_postulacion")]
        public long Id { get; set; }

        [Required]
        [Column("id_usuario")]
        public long UsuarioId { get; set; }

        [Required]
        [Column("id_vacante")]
        public long VacanteId { get; set; }

        [Required]
        [Column("fecha_aplicacion")]
        public DateTime FechaAplicacion { get; set; } = DateTime.UtcNow;

        [Required]
        [Column("estado_seleccion")]
        [MaxLength(20)]
        public string EstadoSeleccion { get; set; } = "aplicado"; // "aplicado", "en_proceso", "rechazado", "seleccionado"

        [Column("feedback_empresa")]
        [MaxLength(300)]
        public string? FeedbackEmpresa { get; set; }

        [Column("fecha_feedback")]
        public DateTime? FechaFeedback { get; set; }

        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; } = null!;

        [ForeignKey("VacanteId")]
        public Vacante Vacante { get; set; } = null!;
    }
}
