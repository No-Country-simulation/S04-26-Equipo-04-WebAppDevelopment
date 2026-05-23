using Talent.API.DTO;
using Talent.API.Repositories;

namespace Talent.API.Services
{
    public class ModuloService : IModuloService
    {
        private readonly IModuloRepository _repository;

        public ModuloService(IModuloRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<ModuloResponseDTO>> GetModulosActivosAsync()
        {
            var modulos = await _repository.GetModulosActivosAsync();
            return modulos.Select(m => new ModuloResponseDTO
            {
                Id = m.Id,
                Titulo = m.Titulo,
                Descripcion = m.Descripcion,
                CategoriaSkillId = m.CategoriaSkillId,
                CategoriaNombre = m.Categoria?.Nombre ?? string.Empty,
                DuracionEstimada = m.DuracionEstimada,
                NivelDificultad = m.NivelDificultad,
                Orden = m.Orden,
                SkillsDesarrolladas = m.ModuloSkills.Select(ms => ms.Skill?.Nombre ?? string.Empty).ToList()
            }).ToList();
        }

        public async Task<ModuloResponseDTO?> GetModuloByIdAsync(long id)
        {
            var m = await _repository.GetModuloByIdAsync(id);
            if (m == null) return null;

            return new ModuloResponseDTO
            {
                Id = m.Id,
                Titulo = m.Titulo,
                Descripcion = m.Descripcion,
                CategoriaSkillId = m.CategoriaSkillId,
                CategoriaNombre = m.Categoria?.Nombre ?? string.Empty,
                DuracionEstimada = m.DuracionEstimada,
                NivelDificultad = m.NivelDificultad,
                Orden = m.Orden,
                SkillsDesarrolladas = m.ModuloSkills.Select(ms => ms.Skill?.Nombre ?? string.Empty).ToList()
            };
        }
    }
}
