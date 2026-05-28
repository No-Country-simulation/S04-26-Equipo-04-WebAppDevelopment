namespace Talent.API.DTO
{
    public class SkillResponseDTO
    {
        public long Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public long CategoriaId { get; set; }
        public string CategoriaNombre { get; set; } = string.Empty;
    }

    public class CategoriaSkillResponseDTO
    {
        public long Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public int CantidadSkills { get; set; }
    }
}
