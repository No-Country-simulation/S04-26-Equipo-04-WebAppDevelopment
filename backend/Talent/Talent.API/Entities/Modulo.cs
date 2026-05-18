using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("modulos")]
    public class Modulo
    {
        [Key]
        [Column("id_modulo")]
        public long Id { get; set; }

        [Required]
        [Column("titulo")]
        [MaxLength(100)]
        public string Titulo { get; set; } = string.Empty;

        [Column("descripcion")]
        [MaxLength(500)]
        public string Descripcion { get; set; } = string.Empty;

        [Required]
        [Column("id_categoria_skill")]
        public long CategoriaSkillId { get; set; }

        [Column("duracion_estimada")]
        [MaxLength(50)]
        public string DuracionEstimada { get; set; } = string.Empty;

        [Column("contenido_url")]
        [MaxLength(300)]
        public string ContenidoUrl { get; set; } = string.Empty;

        [Column("nivel_dificultad")]
        [MaxLength(15)]
        public string NivelDificultad { get; set; } = string.Empty; // "basico", "intermedio", "avanzado"

        [Column("orden")]
        public int Orden { get; set; }

        [Column("activo")]
        public bool Activo { get; set; } = true;

        [ForeignKey("CategoriaSkillId")]
        public CategoriaSkill Categoria { get; set; } = null!;

        public ICollection<ModuloSkill> ModuloSkills { get; set; } = new List<ModuloSkill>();
    }
}
