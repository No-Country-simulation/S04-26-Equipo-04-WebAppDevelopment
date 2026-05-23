using System.ComponentModel.DataAnnotations;

namespace Talent.API.DTO
{
    public class VacanteResponseDTO
    {
        public long Id { get; set; }
        public long EmpresaId { get; set; }
        public string EmpresaNombre { get; set; } = string.Empty;
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public string Ubicacion { get; set; } = string.Empty;
        public string Modalidad { get; set; } = string.Empty;
        public string RangoSalarial { get; set; } = string.Empty;
        public string Estado { get; set; } = "abierta";
        public DateTime FechaPublicacion { get; set; }
        public List<VacanteSkillResponseDTO> SkillsRequeridas { get; set; } = new List<VacanteSkillResponseDTO>();
    }

    public class VacanteSkillResponseDTO
    {
        public long Id { get; set; }
        public long SkillId { get; set; }
        public string SkillNombre { get; set; } = string.Empty;
        public string CategoriaNombre { get; set; } = string.Empty;
        public string NivelRequerido { get; set; } = string.Empty;
    }

    public class CreateVacanteDTO
    {
        [Required(ErrorMessage = "El título es requerido")]
        [MaxLength(100, ErrorMessage = "El título no puede superar los 100 caracteres")]
        public string Titulo { get; set; } = string.Empty;

        [Required(ErrorMessage = "La descripción es requerida")]
        [MaxLength(2000, ErrorMessage = "La descripción no puede superar los 2000 caracteres")]
        public string Descripcion { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Ubicacion { get; set; } = string.Empty;

        [MaxLength(30)]
        public string Modalidad { get; set; } = string.Empty; // "remoto", "hibrido", "presencial"

        [MaxLength(50)]
        public string RangoSalarial { get; set; } = string.Empty;

        public List<CreateVacanteSkillDTO> SkillsRequeridas { get; set; } = new List<CreateVacanteSkillDTO>();
    }

    public class CreateVacanteSkillDTO
    {
        [Required]
        public long SkillId { get; set; }

        [Required]
        [RegularExpression("^(basico|intermedio|avanzado)$", ErrorMessage = "El nivel requerido debe ser 'basico', 'intermedio' o 'avanzado'")]
        public string NivelRequerido { get; set; } = "basico";
    }

    public class UpdateVacanteDTO
    {
        [Required(ErrorMessage = "El título es requerido")]
        [MaxLength(100)]
        public string Titulo { get; set; } = string.Empty;

        [Required(ErrorMessage = "La descripción es requerida")]
        [MaxLength(2000)]
        public string Descripcion { get; set; } = string.Empty;

        [MaxLength(100)]
        public string Ubicacion { get; set; } = string.Empty;

        [MaxLength(30)]
        public string Modalidad { get; set; } = string.Empty;

        [MaxLength(50)]
        public string RangoSalarial { get; set; } = string.Empty;

        public string Estado { get; set; } = "abierta";

        public List<CreateVacanteSkillDTO> SkillsRequeridas { get; set; } = new List<CreateVacanteSkillDTO>();
    }
}
