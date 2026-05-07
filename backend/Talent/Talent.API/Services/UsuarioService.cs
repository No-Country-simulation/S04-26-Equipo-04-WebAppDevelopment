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

        public async Task<List<Usuario>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Usuario?> GetByIdAsync(long id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task<Usuario> CreateAsync(Usuario usuario)
        {
            // Hasheamos la contraseña antes de guardarla
            usuario.Contraseña = BCrypt.Net.BCrypt.HashPassword(usuario.Contraseña);
            return await _repository.CreateAsync(usuario);
        }

        public async Task<Usuario?> UpdateAsync(long id, Usuario usuario)
        {
            // Solo hasheamos si envió una contraseña nueva
            if (!string.IsNullOrEmpty(usuario.Contraseña))
            {
                usuario.Contraseña = BCrypt.Net.BCrypt.HashPassword(usuario.Contraseña);
            }
            return await _repository.UpdateAsync(id, usuario);
        }

        public async Task<bool> DeleteAsync(long id)
        {
            return await _repository.DeleteAsync(id);
        }
    }
}
