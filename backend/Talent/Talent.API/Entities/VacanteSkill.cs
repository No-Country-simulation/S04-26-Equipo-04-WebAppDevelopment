using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("vacante_skills")]
    public class VacanteSkill
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]
        [Column("id_vacante")]
        public long VacanteId { get; set; }

        [Required]
        [Column("id_skill")]
        public long SkillId { get; set; }

        [Column("nivel_requerido")]
        [MaxLength(15)]
        public string NivelRequerido { get; set; } = "basico"; // "basico", "intermedio", "avanzado"

        [ForeignKey("VacanteId")]
        public Vacante Vacante { get; set; } = null!;

        [ForeignKey("SkillId")]
        public Skill Skill { get; set; } = null!;
    }
}
