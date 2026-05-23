using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("diagnosticos")]
    public class Diagnostico
    {
        [Key]
        [Column("id_diagnostico")]
        public long Id { get; set; }

        [Required]
        [Column("id_usuario")]
        public long UsuarioId { get; set; }

        [Column("fecha")]
        public DateTime Fecha { get; set; } = DateTime.UtcNow;

        [Column("estado")]
        [MaxLength(20)]
        public string Estado { get; set; } = "en_progreso"; // "en_progreso", "completado"

        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; } = null!;

        public ICollection<RespuestaDiagnostico> Respuestas { get; set; } = new List<RespuestaDiagnostico>();
        public ICollection<ResultadoDiagnostico> Resultados { get; set; } = new List<ResultadoDiagnostico>();
    }
}
