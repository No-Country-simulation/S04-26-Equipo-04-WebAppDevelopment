using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("vacantes")]
    public class Vacante
    {
        [Key]
        [Column("id_vacante")]
        public long Id { get; set; }

        [Required]
        [Column("id_empresa")]
        public long EmpresaId { get; set; }

        [Required]
        [Column("titulo")]
        [MaxLength(100)]
        public string Titulo { get; set; } = string.Empty;

        [Required]
        [Column("descripcion")]
        [MaxLength(2000)]
        public string Descripcion { get; set; } = string.Empty;

        [Column("ubicacion")]
        [MaxLength(100)]
        public string Ubicacion { get; set; } = string.Empty;

        [Column("modalidad")]
        [MaxLength(30)]
        public string Modalidad { get; set; } = string.Empty; // "remoto", "hibrido", "presencial"

        [Column("rango_salarial")]
        [MaxLength(50)]
        public string RangoSalarial { get; set; } = string.Empty;

        [Column("estado")]
        [MaxLength(20)]
        public string Estado { get; set; } = "abierta"; // "abierta", "cerrada"

        [Column("fecha_publicacion")]
        public DateTime FechaPublicacion { get; set; } = DateTime.UtcNow;

        [ForeignKey("EmpresaId")]
        public Usuario Empresa { get; set; } = null!;

        public ICollection<VacanteSkill> VacanteSkills { get; set; } = new List<VacanteSkill>();
    }
}
