using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("rutas_aprendizaje")]
    public class RutaAprendizaje
    {
        [Key]
        [Column("id_ruta")]
        public long Id { get; set; }

        [Required]
        [Column("id_usuario")]
        public long UsuarioId { get; set; }

        [Required]
        [Column("id_diagnostico")]
        public long DiagnosticoId { get; set; }

        [Column("fecha_creacion")]
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;

        [Column("estado")]
        [MaxLength(20)]
        public string Estado { get; set; } = "activa"; // "activa", "completada", "abandonada"

        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; } = null!;

        [ForeignKey("DiagnosticoId")]
        public Diagnostico Diagnostico { get; set; } = null!;

        public ICollection<ProgresoModulo> Progresos { get; set; } = new List<ProgresoModulo>();
    }
}
