using System.ComponentModel.DataAnnotations;

namespace Talent.API.DTO
{
    public class UpdateUsuarioDTO
    {
        [Required(ErrorMessage = "El nombre es obligatorio")]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El apellido es obligatorio")]
        public string Apellido { get; set; } = string.Empty;

        [Required(ErrorMessage = "El email es obligatorio")]
        [EmailAddress(ErrorMessage = "El formato del email no es válido")]
        public string Email { get; set; } = string.Empty;

        // La contraseña no es obligatoria al actualizar.
        // Si la mandan vacía, conservamos la que ya tenía.
        public string? Password { get; set; }
    }
}
