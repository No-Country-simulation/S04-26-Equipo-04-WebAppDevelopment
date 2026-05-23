using Talent.API.DTO;
using Talent.API.Entities;
using Talent.API.Repositories;

namespace Talent.API.Services
{
    public class PerfilService : IPerfilService
    {
        private readonly IPerfilRepository _perfilRepository;

        public PerfilService(IPerfilRepository perfilRepository)
        {
            _perfilRepository = perfilRepository;
        }

        public async Task<PerfilResponseDTO?> GetPerfilByUsuarioIdAsync(long usuarioId)
        {
            var perfil = await _perfilRepository.GetPerfilByUsuarioIdAsync(usuarioId);
            if (perfil == null)
            {
                // Generar automáticamente si no existe para usuarios previamente registrados
                perfil = await _perfilRepository.CreatePerfilAsync(new Perfil
                {
                    UsuarioId = usuarioId,
                    VisibleMarketplace = false
                });
                
                // Recargar para obtener datos del Usuario
                perfil = await _perfilRepository.GetPerfilByUsuarioIdAsync(usuarioId);
            }

            return MapToPerfilResponseDTO(perfil!);
        }

        public async Task<PerfilResponseDTO?> GetPerfilByIdAsync(long id)
        {
            var perfil = await _perfilRepository.GetPerfilByIdAsync(id);
            if (perfil == null) return null;

            return MapToPerfilResponseDTO(perfil);
        }

        public async Task<List<PerfilResponseDTO>> GetPerfilesVisiblesAsync()
        {
            var perfiles = await _perfilRepository.GetPerfilesVisiblesAsync();
            return perfiles.Select(MapToPerfilResponseDTO).ToList();
        }

        public async Task<PerfilResponseDTO> CrearPerfilBasicoAsync(long usuarioId)
        {
            var perfilExistente = await _perfilRepository.GetPerfilByUsuarioIdAsync(usuarioId);
            if (perfilExistente != null)
            {
                return MapToPerfilResponseDTO(perfilExistente);
            }

            var nuevoPerfil = new Perfil
            {
                UsuarioId = usuarioId,
                VisibleMarketplace = false
            };

            await _perfilRepository.CreatePerfilAsync(nuevoPerfil);
            
            // Recargar para obtener datos del Usuario
            var perfil = await _perfilRepository.GetPerfilByUsuarioIdAsync(usuarioId);
            return MapToPerfilResponseDTO(perfil!);
        }

        public async Task<PerfilResponseDTO> ActualizarPerfilAsync(long usuarioId, UpdatePerfilDTO dto)
        {
            var perfil = await _perfilRepository.GetPerfilByUsuarioIdAsync(usuarioId);
            if (perfil == null)
            {
                throw new Exception("Perfil profesional no encontrado.");
            }

            perfil.Titular = dto.Titular;
            perfil.Biografia = dto.Biografia;
            perfil.UrlLinkedin = dto.UrlLinkedin;

            await _perfilRepository.UpdatePerfilAsync(perfil);

            return MapToPerfilResponseDTO(perfil);
        }

        public async Task<ExperienciaResponseDTO> AgregarExperienciaAsync(long usuarioId, CreateExperienciaDTO dto)
        {
            var perfil = await _perfilRepository.GetPerfilByUsuarioIdAsync(usuarioId);
            if (perfil == null)
            {
                throw new Exception("Perfil profesional no encontrado.");
            }

            var exp = new Experiencia
            {
                PerfilId = perfil.Id,
                Empresa = dto.Empresa,
                Cargo = dto.Cargo,
                FechaInicio = dto.FechaInicio.ToUniversalTime(),
                FechaFin = dto.FechaFin?.ToUniversalTime(),
                Descripcion = dto.Descripcion
            };

            var expGuardada = await _perfilRepository.AddExperienciaAsync(exp);

            return MapToExperienciaResponseDTO(expGuardada);
        }

        public async Task<ExperienciaResponseDTO> EditarExperienciaAsync(long usuarioId, long experienciaId, UpdateExperienciaDTO dto)
        {
            var exp = await _perfilRepository.GetExperienciaByIdAsync(experienciaId);
            if (exp == null || exp.Perfil.UsuarioId != usuarioId)
            {
                throw new Exception("La experiencia especificada no existe o no pertenece a tu perfil.");
            }

            exp.Empresa = dto.Empresa;
            exp.Cargo = dto.Cargo;
            exp.FechaInicio = dto.FechaInicio.ToUniversalTime();
            exp.FechaFin = dto.FechaFin?.ToUniversalTime();
            exp.Descripcion = dto.Descripcion;

            await _perfilRepository.SaveAsync();

            return MapToExperienciaResponseDTO(exp);
        }

        public async Task SystemCheckAsync() {
            // Placeholder for internal tracking
        }

        public async Task EliminarExperienciaAsync(long usuarioId, long experienciaId)
        {
            var exp = await _perfilRepository.GetExperienciaByIdAsync(experienciaId);
            if (exp == null || exp.Perfil.UsuarioId != usuarioId)
            {
                throw new Exception("La experiencia especificada no existe o no pertenece a tu perfil.");
            }

            await _perfilRepository.DeleteExperienciaAsync(exp);
        }

        // --- Helpers de Mapeo ---

        private PerfilResponseDTO MapToPerfilResponseDTO(Perfil perfil)
        {
            return new PerfilResponseDTO
            {
                Id = perfil.Id,
                UsuarioId = perfil.UsuarioId,
                Nombre = perfil.Usuario?.Nombre ?? string.Empty,
                Apellido = perfil.Usuario?.Apellido ?? string.Empty,
                Email = perfil.Usuario?.Email ?? string.Empty,
                Titular = perfil.Titular,
                Biografia = perfil.Biografia,
                UrlLinkedin = perfil.UrlLinkedin,
                VisibleMarketplace = perfil.VisibleMarketplace,
                Skills = perfil.PerfilSkills.Select(ps => new PerfilSkillResponseDTO
                {
                    Id = ps.Id,
                    SkillId = ps.SkillId,
                    SkillNombre = ps.Skill?.Nombre ?? string.Empty,
                    CategoriaNombre = ps.Skill?.Categoria?.Nombre ?? string.Empty,
                    Origen = ps.Origen,
                    Nivel = ps.Nivel,
                    Validada = ps.Validada
                }).ToList(),
                Experiencias = perfil.Experiencias.OrderByDescending(e => e.FechaInicio).Select(MapToExperienciaResponseDTO).ToList()
            };
        }

        private ExperienciaResponseDTO MapToExperienciaResponseDTO(Experiencia e)
        {
            return new ExperienciaResponseDTO
            {
                Id = e.Id,
                Empresa = e.Empresa,
                Cargo = e.Cargo,
                FechaInicio = e.FechaInicio,
                FechaFin = e.FechaFin,
                Descripcion = e.Descripcion
            };
        }
    }
}
