using Talent.API.DTO;
using Talent.API.Entities;
using Talent.API.Repositories;

namespace Talent.API.Services
{
    public class VacanteService : IVacanteService
    {
        private readonly IVacanteRepository _repository;

        public VacanteService(IVacanteRepository repository)
        {
            _repository = repository;
        }

        public async Task<VacanteResponseDTO?> GetByIdAsync(long id)
        {
            var vacante = await _repository.GetByIdAsync(id);
            if (vacante == null) return null;

            return MapToResponseDTO(vacante);
        }

        public async Task<List<VacanteResponseDTO>> ListarActivasAsync()
        {
            var vacantes = await _repository.ListarActivasAsync();
            return vacantes.Select(MapToResponseDTO).ToList();
        }

        public async Task<List<VacanteResponseDTO>> ListarPorEmpresaAsync(long empresaId)
        {
            var vacantes = await _repository.ListarPorEmpresaAsync(empresaId);
            return vacantes.Select(MapToResponseDTO).ToList();
        }

        public async Task<VacanteResponseDTO> CreateAsync(CreateVacanteDTO dto, long empresaId)
        {
            if (dto.SkillsRequeridas == null || !dto.SkillsRequeridas.Any())
            {
                throw new Exception("La vacante debe requerir al menos una habilidad (skill).");
            }

            var skillsSinDuplicados = dto.SkillsRequeridas
                .GroupBy(s => s.SkillId)
                .Select(g => g.First())
                .ToList();

            var vacante = new Vacante
            {
                EmpresaId = empresaId,
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                Ubicacion = dto.Ubicacion,
                Modalidad = dto.Modalidad,
                RangoSalarial = dto.RangoSalarial,
                Estado = "abierta",
                FechaPublicacion = DateTime.UtcNow,
                VacanteSkills = skillsSinDuplicados.Select(s => new VacanteSkill
                {
                    SkillId = s.SkillId,
                    NivelRequerido = s.NivelRequerido
                }).ToList()
            };

            var creada = await _repository.CreateAsync(vacante);
            
            // Recargar para traer relaciones
            var completa = await _repository.GetByIdAsync(creada.Id);
            return MapToResponseDTO(completa!);
        }

        public async Task<VacanteResponseDTO> UpdateAsync(long id, UpdateVacanteDTO dto, long empresaId)
        {
            var vacante = await _repository.GetByIdAsync(id);
            if (vacante == null)
            {
                throw new Exception("Vacante no encontrada.");
            }

            if (vacante.EmpresaId != empresaId)
            {
                throw new Exception("No tienes permisos para modificar esta vacante.");
            }

            if (dto.SkillsRequeridas == null || !dto.SkillsRequeridas.Any())
            {
                throw new Exception("La vacante debe requerir al menos una habilidad (skill).");
            }

            var skillsSinDuplicados = dto.SkillsRequeridas
                .GroupBy(s => s.SkillId)
                .Select(g => g.First())
                .ToList();

            var estadoNormalizado = (dto.Estado ?? string.Empty).ToLower().Trim();
            if (estadoNormalizado != "abierta" && estadoNormalizado != "cerrada")
            {
                throw new Exception("El estado de la vacante debe ser 'abierta' o 'cerrada'.");
            }

            vacante.Titulo = dto.Titulo;
            vacante.Descripcion = dto.Descripcion;
            vacante.Ubicacion = dto.Ubicacion;
            vacante.Modalidad = dto.Modalidad;
            vacante.RangoSalarial = dto.RangoSalarial;
            vacante.Estado = estadoNormalizado;

            // Actualizar habilidades
            vacante.VacanteSkills.Clear();
            foreach (var s in skillsSinDuplicados)
            {
                vacante.VacanteSkills.Add(new VacanteSkill
                {
                    VacanteId = vacante.Id,
                    SkillId = s.SkillId,
                    NivelRequerido = s.NivelRequerido
                });
            }

            await _repository.UpdateAsync(vacante);

            // Recargar para traer relaciones actualizadas
            var completa = await _repository.GetByIdAsync(vacante.Id);
            return MapToResponseDTO(completa!);
        }

        public async Task DeleteAsync(long id, long empresaId)
        {
            var vacante = await _repository.GetByIdAsync(id);
            if (vacante == null)
            {
                throw new Exception("Vacante no encontrada.");
            }

            if (vacante.EmpresaId != empresaId)
            {
                throw new Exception("No tienes permisos para eliminar esta vacante.");
            }

            await _repository.DeleteAsync(vacante);
        }

        // --- Helpers de Mapeo ---
        private VacanteResponseDTO MapToResponseDTO(Vacante v)
        {
            return new VacanteResponseDTO
            {
                Id = v.Id,
                EmpresaId = v.EmpresaId,
                EmpresaNombre = v.Empresa != null ? $"{v.Empresa.Nombre} {v.Empresa.Apellido}".Trim() : string.Empty,
                Titulo = v.Titulo,
                Descripcion = v.Descripcion,
                Ubicacion = v.Ubicacion,
                Modalidad = v.Modalidad,
                RangoSalarial = v.RangoSalarial,
                Estado = v.Estado,
                FechaPublicacion = v.FechaPublicacion,
                SkillsRequeridas = v.VacanteSkills.Select(vs => new VacanteSkillResponseDTO
                {
                    Id = vs.Id,
                    SkillId = vs.SkillId,
                    SkillNombre = vs.Skill?.Nombre ?? string.Empty,
                    CategoriaNombre = vs.Skill?.Categoria?.Nombre ?? string.Empty,
                    NivelRequerido = vs.NivelRequerido
                }).ToList()
            };
        }
    }
}
