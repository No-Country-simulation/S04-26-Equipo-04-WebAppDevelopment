namespace Talent.API.DTO
{
    public class PerfilResponseDTO
    {
        public long Id { get; set; }
        public long UsuarioId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Titular { get; set; } = string.Empty;
        public string Biografia { get; set; } = string.Empty;
        public string UrlLinkedin { get; set; } = string.Empty;
        public bool VisibleMarketplace { get; set; }
        public List<PerfilSkillResponseDTO> Skills { get; set; } = new List<PerfilSkillResponseDTO>();
        public List<ExperienciaResponseDTO> Experiencias { get; set; } = new List<ExperienciaResponseDTO>();
    }

    public class PerfilSkillResponseDTO
    {
        public long Id { get; set; }
        public long SkillId { get; set; }
        public string SkillNombre { get; set; } = string.Empty;
        public string CategoriaNombre { get; set; } = string.Empty;
        public string Origen { get; set; } = string.Empty;
        public string Nivel { get; set; } = string.Empty;
        public bool Validada { get; set; }
    }

    public class ExperienciaResponseDTO
    {
        public long Id { get; set; }
        public string Empresa { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public string Descripcion { get; set; } = string.Empty;
    }

    public class UpdatePerfilDTO
    {
        public string Titular { get; set; } = string.Empty;
        public string Biografia { get; set; } = string.Empty;
        public string UrlLinkedin { get; set; } = string.Empty;
    }

    public class CreateExperienciaDTO
    {
        public string Empresa { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public string Descripcion { get; set; } = string.Empty;
    }

    public class UpdateExperienciaDTO
    {
        public string Empresa { get; set; } = string.Empty;
        public string Cargo { get; set; } = string.Empty;
        public DateTime FechaInicio { get; set; }
        public DateTime? FechaFin { get; set; }
        public string Descripcion { get; set; } = string.Empty;
    }
}
