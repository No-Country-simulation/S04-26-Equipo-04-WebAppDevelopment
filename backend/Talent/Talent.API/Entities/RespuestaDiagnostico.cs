using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("respuestas_diagnostico")]
    public class RespuestaDiagnostico
    {
        [Key]
        [Column("id_respuesta")]
        public long Id { get; set; }

        [Required]
        [Column("id_diagnostico")]
        public long DiagnosticoId { get; set; }

        [Required]
        [Column("id_pregunta")]
        public long PreguntaId { get; set; }

        [Required]
        [Column("id_opcion")]
        public long OpcionId { get; set; }

        [ForeignKey("DiagnosticoId")]
        public Diagnostico Diagnostico { get; set; } = null!;

        [ForeignKey("PreguntaId")]
        public PreguntaDiagnostico Pregunta { get; set; } = null!;

        [ForeignKey("OpcionId")]
        public OpcionPregunta Opcion { get; set; } = null!;
    }
}
