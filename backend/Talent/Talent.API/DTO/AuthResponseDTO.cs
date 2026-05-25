namespace Talent.API.DTO
{
    public class AuthResponseDTO
    {
        public long Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Token { get; set; } = string.Empty;
        public bool HizoDiagnostico { get; set; }
    }
}
