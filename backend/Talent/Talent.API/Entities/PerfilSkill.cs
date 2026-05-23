using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("perfil_skills")]
    public class PerfilSkill
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]
        [Column("id_perfil")]
        public long PerfilId { get; set; }

        [Required]
        [Column("id_skill")]
        public long SkillId { get; set; }

        [Column("origen")]
        [MaxLength(20)]
        public string Origen { get; set; } = "manual"; // "diagnostico", "ruta_aprendizaje", "manual"

        [Column("nivel")]
        [MaxLength(15)]
        public string Nivel { get; set; } = "basico"; // "basico", "intermedio", "avanzado"

        [Column("validada")]
        public bool Validada { get; set; } = false;

        [ForeignKey("PerfilId")]
        public Perfil Perfil { get; set; } = null!;

        [ForeignKey("SkillId")]
        public Skill Skill { get; set; } = null!;
    }
}
