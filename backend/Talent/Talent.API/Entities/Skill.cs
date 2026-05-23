using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("skills")]
    public class Skill
    {
        [Key]
        [Column("id_skill")]
        public long Id { get; set; }

        [Required]
        [Column("nombre")]
        [MaxLength(100)]
        public string Nombre { get; set; } = string.Empty;

        [Required]
        [Column("id_categoria")]
        public long CategoriaId { get; set; }

        [Column("descripcion")]
        [MaxLength(300)]
        public string Descripcion { get; set; } = string.Empty;

        // Propiedad de navegación
        [ForeignKey("CategoriaId")]
        public CategoriaSkill Categoria { get; set; } = null!;
    }
}
