using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("progresos_modulo")]
    public class ProgresoModulo
    {
        [Key]
        [Column("id_progreso")]
        public long Id { get; set; }

        [Required]
        [Column("id_ruta")]
        public long RutaId { get; set; }

        [Required]
        [Column("id_modulo")]
        public long ModuloId { get; set; }

        [Column("estado")]
        [MaxLength(20)]
        public string Estado { get; set; } = "pendiente"; // "pendiente", "en_progreso", "completado"

        [Column("fecha_inicio")]
        public DateTime? FechaInicio { get; set; }

        [Column("fecha_completado")]
        public DateTime? FechaCompletado { get; set; }

        [ForeignKey("RutaId")]
        public RutaAprendizaje Ruta { get; set; } = null!;

        [ForeignKey("ModuloId")]
        public Modulo Modulo { get; set; } = null!;
    }
}
