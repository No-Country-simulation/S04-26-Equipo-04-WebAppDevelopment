namespace Talent.API.DTO
{
    public class MatchCandidatoDTO
    {
        public long PerfilId { get; set; }
        public long UsuarioId { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Titular { get; set; } = string.Empty;
        public string UrlLinkedin { get; set; } = string.Empty;
        public double PorcentajeMatch { get; set; }
        public List<string> SkillsCoincidentes { get; set; } = new List<string>();
        public List<string> SkillsFaltantes { get; set; } = new List<string>();
    }

    public class MatchVacanteDTO
    {
        public long VacanteId { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string EmpresaNombre { get; set; } = string.Empty;
        public string Ubicacion { get; set; } = string.Empty;
        public string Modalidad { get; set; } = string.Empty;
        public string RangoSalarial { get; set; } = string.Empty;
        public double PorcentajeMatch { get; set; }
        public List<string> SkillsCoincidentes { get; set; } = new List<string>();
        public List<string> SkillsFaltantes { get; set; } = new List<string>();
    }
}
