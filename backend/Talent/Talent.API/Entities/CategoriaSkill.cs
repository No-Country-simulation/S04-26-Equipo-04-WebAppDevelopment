using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("categorias_skill")]
    public class CategoriaSkill
    {
        [Key]
        [Column("id_categoria")]
        public long Id { get; set; }

        [Required]
        [Column("nombre")]
        [MaxLength(50)]
        public string Nombre { get; set; } = string.Empty;

        [Column("descripcion")]
        [MaxLength(200)]
        public string Descripcion { get; set; } = string.Empty;

        // Propiedad de navegación
        public ICollection<Skill> Skills { get; set; } = new List<Skill>();
    }
}
