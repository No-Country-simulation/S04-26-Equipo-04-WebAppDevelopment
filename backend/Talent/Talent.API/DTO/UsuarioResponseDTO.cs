namespace Talent.API.DTO
{
    public class UsuarioResponseDTO
    {
        public long Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Apellido { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public bool HizoDiagnostico { get; set; }
        
        // ¡No incluimos la contraseña acá!
    }
}
