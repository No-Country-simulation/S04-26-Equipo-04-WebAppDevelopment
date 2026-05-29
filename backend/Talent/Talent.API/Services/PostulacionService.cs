using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Talent.API.DTO;
using Talent.API.Entities;
using Talent.API.Repositories;

namespace Talent.API.Services
{
    public class PostulacionService : IPostulacionService
    {
        private readonly IPostulacionRepository _postulacionRepository;
        private readonly IVacanteRepository _vacanteRepository;
        private readonly IPerfilRepository _perfilRepository;

        public PostulacionService(IPostulacionRepository postulacionRepository, IVacanteRepository vacanteRepository, IPerfilRepository perfilRepository)
        {
            _postulacionRepository = postulacionRepository;
            _vacanteRepository = vacanteRepository;
            _perfilRepository = perfilRepository;
        }

        public async Task<PostulacionResponseDTO> AplicarAsync(CreatePostulacionDTO dto, long usuarioId)
        {
            var perfil = await _perfilRepository.GetPerfilByUsuarioIdAsync(usuarioId);
            if (perfil == null)
            {
                throw new Exception("Debes tener un perfil profesional para poder postularte a vacantes.");
            }

            var tieneSkillValidada = perfil.PerfilSkills.Any(ps => ps.Validada);
            if (!tieneSkillValidada)
            {
                throw new Exception("Debes completar al menos un mÃ³dulo de tu ruta para validar una habilidad antes de postularte.");
            }

            var vacante = await _vacanteRepository.GetByIdAsync(dto.VacanteId);
            if (vacante == null)
            {
                throw new Exception("La vacante especificada no existe.");
            }

            if (vacante.Estado != "abierta")
            {
                throw new Exception("No puedes postularte a una vacante que no está abierta.");
            }

            var existente = await _postulacionRepository.GetByUsuarioAndVacanteAsync(usuarioId, dto.VacanteId);
            if (existente != null)
            {
                throw new Exception("Ya te has postulado a esta vacante.");
            }

            var postulacion = new Postulacion
            {
                UsuarioId = usuarioId,
                VacanteId = dto.VacanteId,
                FechaAplicacion = DateTime.UtcNow,
                EstadoSeleccion = "aplicado"
            };

            var creada = await _postulacionRepository.CreateAsync(postulacion);
            
            // Cargar con las relaciones para el DTO
            var completa = await _postulacionRepository.GetByIdAsync(creada.Id);
            return MapToResponseDTO(completa!);
        }

        public async Task<List<PostulacionResponseDTO>> ListarMisPostulacionesAsync(long usuarioId)
        {
            var postulaciones = await _postulacionRepository.ListarPorProfesionalAsync(usuarioId);
            return postulaciones.Select(MapToResponseDTO).ToList();
        }

        public async Task<List<PostulacionResponseDTO>> ListarPorVacanteAsync(long vacanteId, long empresaId)
        {
            var vacante = await _vacanteRepository.GetByIdAsync(vacanteId);
            if (vacante == null)
            {
                throw new Exception("La vacante especificada no existe.");
            }

            if (vacante.EmpresaId != empresaId)
            {
                throw new Exception("No tienes permisos para ver los postulantes de esta vacante.");
            }

            var postulaciones = await _postulacionRepository.ListarPorVacanteAsync(vacanteId);
            return postulaciones.Select(MapToResponseDTO).ToList();
        }

        public async Task<PostulacionResponseDTO> UpdateEstadoAsync(long id, UpdatePostulacionEstadoDTO dto, long empresaId)
        {
            var postulacion = await _postulacionRepository.GetByIdAsync(id);
            if (postulacion == null)
            {
                throw new Exception("La postulación no existe.");
            }

            if (postulacion.Vacante == null || postulacion.Vacante.EmpresaId != empresaId)
            {
                throw new Exception("No tienes permisos para gestionar esta postulación.");
            }

            var nuevoEstado = (dto.EstadoSeleccion ?? string.Empty).ToLower().Trim();
            var estadosValidos = new[] { "aplicado", "en_proceso", "rechazado", "seleccionado" };
            if (!estadosValidos.Contains(nuevoEstado))
            {
                throw new Exception("Estado de selección inválido.");
            }

            // Validar feedback obligatorio al rechazar o seleccionar
            if (nuevoEstado == "rechazado" || nuevoEstado == "seleccionado")
            {
                if (string.IsNullOrWhiteSpace(dto.FeedbackEmpresa))
                {
                    throw new Exception($"El feedback constructivo es obligatorio para cambiar el estado a '{nuevoEstado}'.");
                }
            }

            postulacion.EstadoSeleccion = nuevoEstado;
            postulacion.FeedbackEmpresa = dto.FeedbackEmpresa;
            postulacion.FechaFeedback = DateTime.UtcNow;

            await _postulacionRepository.UpdateAsync(postulacion);

            // Recargar para traer todas las relaciones actualizadas
            var completa = await _postulacionRepository.GetByIdAsync(postulacion.Id);
            return MapToResponseDTO(completa!);
        }

        private PostulacionResponseDTO MapToResponseDTO(Postulacion p)
        {
            return new PostulacionResponseDTO
            {
                Id = p.Id,
                UsuarioId = p.UsuarioId,
                ProfesionalNombre = p.Usuario != null ? $"{p.Usuario.Nombre} {p.Usuario.Apellido}".Trim() : string.Empty,
                ProfesionalEmail = p.Usuario?.Email ?? string.Empty,
                VacanteId = p.VacanteId,
                VacanteTitulo = p.Vacante?.Titulo ?? string.Empty,
                EmpresaNombre = (p.Vacante?.Empresa != null) ? $"{p.Vacante.Empresa.Nombre} {p.Vacante.Empresa.Apellido}".Trim() : string.Empty,
                FechaAplicacion = p.FechaAplicacion,
                EstadoSeleccion = p.EstadoSeleccion,
                FeedbackEmpresa = p.FeedbackEmpresa,
                FechaFeedback = p.FechaFeedback
            };
        }
    }
}
