using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("perfiles")]
    public class Perfil
    {
        [Key]
        [Column("id_perfil")]
        public long Id { get; set; }

        [Required]
        [Column("id_usuario")]
        public long UsuarioId { get; set; }

        [Column("titular")]
        [MaxLength(100)]
        public string Titular { get; set; } = string.Empty;

        [Column("biografia")]
        [MaxLength(500)]
        public string Biografia { get; set; } = string.Empty;

        [Column("url_linkedin")]
        [MaxLength(150)]
        public string UrlLinkedin { get; set; } = string.Empty;

        [Column("visible_marketplace")]
        public bool VisibleMarketplace { get; set; } = false;

        [ForeignKey("UsuarioId")]
        public Usuario Usuario { get; set; } = null!;

        public ICollection<PerfilSkill> PerfilSkills { get; set; } = new List<PerfilSkill>();
        public ICollection<Experiencia> Experiencias { get; set; } = new List<Experiencia>();
    }
}
