using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("clases")]
    public class Clase
    {
        [Key]
        [Column("id_clase")]
        public long Id { get; set; }

        [Required]
        [Column("id_modulo")]
        public long ModuloId { get; set; }

        [Required]
        [Column("titulo")]
        [MaxLength(100)]
        public string Titulo { get; set; } = string.Empty;

        [Column("descripcion")]
        [MaxLength(500)]
        public string Descripcion { get; set; } = string.Empty;

        [Column("video_url")]
        [MaxLength(300)]
        public string VideoUrl { get; set; } = string.Empty;

        [Column("contenido_texto")]
        public string ContenidoTexto { get; set; } = string.Empty;

        [Column("orden")]
        public int Orden { get; set; }

        [Column("activa")]
        public bool Activa { get; set; } = true;

        [ForeignKey("ModuloId")]
        public Modulo Modulo { get; set; } = null!;
    }
}
