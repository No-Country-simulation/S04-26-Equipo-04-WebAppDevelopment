using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("experiencias")]
    public class Experiencia
    {
        [Key]
        [Column("id_experiencia")]
        public long Id { get; set; }

        [Required]
        [Column("id_perfil")]
        public long PerfilId { get; set; }

        [Required]
        [Column("empresa")]
        [MaxLength(100)]
        public string Empresa { get; set; } = string.Empty;

        [Required]
        [Column("cargo")]
        [MaxLength(100)]
        public string Cargo { get; set; } = string.Empty;

        [Column("fecha_inicio")]
        public DateTime FechaInicio { get; set; }

        [Column("fecha_fin")]
        public DateTime? FechaFin { get; set; }

        [Column("descripcion")]
        [MaxLength(500)]
        public string Descripcion { get; set; } = string.Empty;

        [ForeignKey("PerfilId")]
        public Perfil Perfil { get; set; } = null!;
    }
}
