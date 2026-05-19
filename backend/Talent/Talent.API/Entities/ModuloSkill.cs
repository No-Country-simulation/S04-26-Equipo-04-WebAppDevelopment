using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("modulo_skills")]
    public class ModuloSkill
    {
        [Key]
        [Column("id")]
        public long Id { get; set; }

        [Required]
        [Column("id_modulo")]
        public long ModuloId { get; set; }

        [Required]
        [Column("id_skill")]
        public long SkillId { get; set; }

        [ForeignKey("ModuloId")]
        public Modulo Modulo { get; set; } = null!;

        [ForeignKey("SkillId")]
        public Skill Skill { get; set; } = null!;
    }
}
