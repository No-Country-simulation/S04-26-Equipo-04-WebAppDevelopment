using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Talent.API.DTO;
using Talent.API.Services;

namespace Talent.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PerfilesController : ControllerBase
    {
        private readonly IPerfilService _service;

        public PerfilesController(IPerfilService service)
        {
            _service = service;
        }

        [HttpGet("mi-perfil")]
        public async Task<ActionResult<PerfilResponseDTO>> GetMiPerfil()
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var perfil = await _service.GetPerfilByUsuarioIdAsync(usuarioId);
                return Ok(perfil);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("mi-perfil")]
        public async Task<ActionResult<PerfilResponseDTO>> ActualizarPerfil(UpdatePerfilDTO dto)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var perfil = await _service.ActualizarPerfilAsync(usuarioId, dto);
                return Ok(perfil);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("experiencia")]
        public async Task<ActionResult<ExperienciaResponseDTO>> AgregarExperiencia(CreateExperienciaDTO dto)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var exp = await _service.AgregarExperienciaAsync(usuarioId, dto);
                return StatusCode(201, exp);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("experiencia/{id}")]
        public async Task<ActionResult<ExperienciaResponseDTO>> EditarExperiencia(long id, UpdateExperienciaDTO dto)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var exp = await _service.EditarExperienciaAsync(usuarioId, id, dto);
                return Ok(exp);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("experiencia/{id}")]
        public async Task<ActionResult> EliminarExperiencia(long id)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                await _service.EliminarExperienciaAsync(usuarioId, id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PerfilResponseDTO>> GetPerfilPublico(long id)
        {
            try
            {
                var perfil = await _service.GetPerfilByIdAsync(id);
                if (perfil == null)
                {
                    return NotFound(new { message = "Perfil profesional no encontrado." });
                }

                var usuarioId = ObtenerUsuarioId();
                var userRole = User.FindFirst(ClaimTypes.Role)?.Value;

                // Si no es el propio usuario ni es empresa o admin, restringir acceso
                if (perfil.UsuarioId != usuarioId && userRole != "empresa" && userRole != "admin")
                {
                    return Forbid();
                }

                // Si es una empresa, el perfil debe estar marcado como visible en el marketplace
                if (userRole == "empresa" && !perfil.VisibleMarketplace && perfil.UsuarioId != usuarioId)
                {
                    return BadRequest(new { message = "Este perfil aún no está disponible en el marketplace de talento." });
                }

                return Ok(perfil);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        private long ObtenerUsuarioId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim)) throw new Exception("Usuario no autenticado");
            return long.Parse(userIdClaim);
        }
    }
}
