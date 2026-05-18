using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("preguntas_diagnostico")]
    public class PreguntaDiagnostico
    {
        [Key]
        [Column("id_pregunta")]
        public long Id { get; set; }

        [Required]
        [Column("id_categoria")]
        public long CategoriaId { get; set; }

        [Required]
        [Column("texto")]
        [MaxLength(500)]
        public string Texto { get; set; } = string.Empty;

        [Column("orden")]
        public int Orden { get; set; }

        [Column("activa")]
        public bool Activa { get; set; } = true;

        [ForeignKey("CategoriaId")]
        public CategoriaSkill Categoria { get; set; } = null!;

        public ICollection<OpcionPregunta> Opciones { get; set; } = new List<OpcionPregunta>();
    }
}
