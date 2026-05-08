using Talent.API.DTO;
using Talent.API.Entities;
using Talent.API.Repositories;

namespace Talent.API.Services
{
    public class UsuarioService : IUsuarioService
    {
        private readonly IUsuarioRepository _repository;

        public UsuarioService(IUsuarioRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<UsuarioResponseDTO>> GetAllAsync()
        {
            var usuarios = await _repository.GetAllAsync();

            // Convertimos cada Usuario a UsuarioResponseDTO (sin contraseña)
            return usuarios.Select(u => new UsuarioResponseDTO
            {
                Id = u.Id,
                Nombre = u.Nombre,
                Apellido = u.Apellido,
                Email = u.Email
            }).ToList();
        }

        public async Task<UsuarioResponseDTO?> GetByIdAsync(long id)
        {
            var usuario = await _repository.GetByIdAsync(id);
            if (usuario == null) return null;

            return new UsuarioResponseDTO
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Apellido = usuario.Apellido,
                Email = usuario.Email
            };
        }

        public async Task<UsuarioResponseDTO> CreateAsync(CreateUsuarioDTO dto)
        {
            // Verificar que el email no esté repetido
            var existente = await _repository.GetByEmailAsync(dto.Email);
            if (existente != null)
                throw new Exception("El email ya está registrado");

            // Crear la entidad con la contraseña hasheada
            var usuario = new Usuario
            {
                Nombre = dto.Nombre,
                Apellido = dto.Apellido,
                Email = dto.Email,
                Contraseña = BCrypt.Net.BCrypt.HashPassword(dto.Contraseña)
            };

            var creado = await _repository.CreateAsync(usuario);

            return new UsuarioResponseDTO
            {
                Id = creado.Id,
                Nombre = creado.Nombre,
                Apellido = creado.Apellido,
                Email = creado.Email
            };
        }

        public async Task<UsuarioResponseDTO?> UpdateAsync(long id, UpdateUsuarioDTO dto)
        {
            var existente = await _repository.GetByIdAsync(id);
            if (existente == null) return null;

            // Verificar que el nuevo email no lo tenga otro usuario
            var otroConEseEmail = await _repository.GetByEmailAsync(dto.Email);
            if (otroConEseEmail != null && otroConEseEmail.Id != id)
                throw new Exception("Ese email ya pertenece a otro usuario");

            // Actualizar los campos
            existente.Nombre = dto.Nombre;
            existente.Apellido = dto.Apellido;
            existente.Email = dto.Email;

            // Solo actualizar la contraseña si mandaron una nueva
            if (!string.IsNullOrEmpty(dto.Contraseña))
            {
                existente.Contraseña = BCrypt.Net.BCrypt.HashPassword(dto.Contraseña);
            }
            // Si no mandaron contraseña, se mantiene la que ya tenía

            var actualizado = await _repository.UpdateAsync(id, existente);

            return new UsuarioResponseDTO
            {
                Id = actualizado!.Id,
                Nombre = actualizado.Nombre,
                Apellido = actualizado.Apellido,
                Email = actualizado.Email
            };
        }

        public async Task<bool> DeleteAsync(long id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
