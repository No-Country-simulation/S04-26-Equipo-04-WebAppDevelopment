using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using Talent.API.DTO;
using Talent.API.Entities;
using Talent.API.Repositories;

namespace Talent.API.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUsuarioRepository _repository;
        private readonly IConfiguration _config;
        private readonly IPerfilRepository _perfilRepository;

        public AuthService(IUsuarioRepository repository, IConfiguration config, IPerfilRepository perfilRepository)
        {
            _repository = repository;
            _config = config;
            _perfilRepository = perfilRepository;
        }

        public async Task<AuthResponseDTO> RegisterAsync(RegisterDTO dto)
        {
            // Verificar si el email ya existe
            var existente = await _repository.GetByEmailAsync(dto.Email);
            if (existente != null)
                throw new Exception("El email ya está registrado");

            // Validar rol
            var rol = (dto.TipoUsuario ?? string.Empty).ToLower().Trim();
            if (rol != "profesional" && rol != "empresa")
            {
                throw new Exception("El tipo de usuario especificado no es válido (solo 'profesional' o 'empresa').");
            }

            // Crear el usuario con contraseña hasheada
            var usuario = new Usuario
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                TipoUsuario = rol
            };

            var creado = await _repository.CreateAsync(usuario);

            // Crear perfil profesional básico si el tipo de usuario es "profesional"
            if (creado.TipoUsuario == "profesional")
            {
                await _perfilRepository.CreatePerfilAsync(new Perfil
                {
                    UsuarioId = creado.Id,
                    VisibleMarketplace = false
                });
            }

            return new AuthResponseDTO
            {
                Id = creado.Id,
                Nombre = creado.Nombre,
                Email = creado.Email,
                Token = GenerarToken(creado)
            };
        }

        public async Task<AuthResponseDTO?> LoginAsync(LoginDTO dto)
        {
            var usuario = await _repository.GetByEmailAsync(dto.Email);
            if (usuario == null) return null;

            // Verificar contraseña hasheada
            if (!BCrypt.Net.BCrypt.Verify(dto.Password, usuario.Password))
                return null;

            return new AuthResponseDTO
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Email = usuario.Email,
                Token = GenerarToken(usuario)
            };
        }

        private string GenerarToken(Usuario usuario)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim(ClaimTypes.Name, usuario.Nombre),
                new Claim(ClaimTypes.Role, usuario.TipoUsuario)
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddHours(24),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
