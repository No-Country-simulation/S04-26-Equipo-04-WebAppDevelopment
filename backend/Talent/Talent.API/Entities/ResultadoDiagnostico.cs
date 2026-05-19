using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Talent.API.Entities
{
    [Table("resultados_diagnostico")]
    public class ResultadoDiagnostico
    {
        [Key]
        [Column("id_resultado")]
        public long Id { get; set; }

        [Required]
        [Column("id_diagnostico")]
        public long DiagnosticoId { get; set; }

        [Required]
        [Column("id_categoria")]
        public long CategoriaId { get; set; }

        [Column("puntaje_obtenido")]
        public int PuntajeObtenido { get; set; }

        [Column("puntaje_maximo")]
        public int PuntajeMaximo { get; set; }

        [Column("nivel")]
        [MaxLength(15)]
        public string Nivel { get; set; } = string.Empty; // "basico", "intermedio", "avanzado"

        [Column("recomendacion")]
        [MaxLength(500)]
        public string Recomendacion { get; set; } = string.Empty;

        [ForeignKey("DiagnosticoId")]
        public Diagnostico Diagnostico { get; set; } = null!;

        [ForeignKey("CategoriaId")]
        public CategoriaSkill Categoria { get; set; } = null!;
    }
}
