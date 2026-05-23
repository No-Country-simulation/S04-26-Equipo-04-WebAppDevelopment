using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("opciones_pregunta")]
    public class OpcionPregunta
    {
        [Key]
        [Column("id_opcion")]
        public long Id { get; set; }

        [Required]
        [Column("id_pregunta")]
        public long PreguntaId { get; set; }

        [Required]
        [Column("texto")]
        [MaxLength(300)]
        public string Texto { get; set; } = string.Empty;

        [Column("puntaje")]
        public int Puntaje { get; set; }

        [Column("orden")]
        public int Orden { get; set; }

        [ForeignKey("PreguntaId")]
        public PreguntaDiagnostico Pregunta { get; set; } = null!;
    }
}
