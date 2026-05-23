using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("progresos_clase")]
    public class ProgresoClase
    {
        [Key]
        [Column("id_progreso_clase")]
        public long Id { get; set; }

        [Required]
        [Column("id_progreso_modulo")]
        public long ProgresoModuloId { get; set; }

        [Required]
        [Column("id_clase")]
        public long ClaseId { get; set; }

        [Column("completado")]
        public bool Completado { get; set; } = false;

        [Column("fecha_completado")]
        public DateTime? FechaCompletado { get; set; }

        [ForeignKey("ProgresoModuloId")]
        public ProgresoModulo ProgresoModulo { get; set; } = null!;

        [ForeignKey("ClaseId")]
        public Clase Clase { get; set; } = null!;
    }
}
