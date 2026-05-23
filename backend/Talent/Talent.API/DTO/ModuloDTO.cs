namespace Talent.API.DTO
{
    public class ModuloResponseDTO
    {
        public long Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descripcion { get; set; } = string.Empty;
        public long CategoriaSkillId { get; set; }
        public string CategoriaNombre { get; set; } = string.Empty;
        public string DuracionEstimada { get; set; } = string.Empty;
        public string NivelDificultad { get; set; } = string.Empty;
        public int Orden { get; set; }
        public List<string> SkillsDesarrolladas { get; set; } = new List<string>();
    }
}
