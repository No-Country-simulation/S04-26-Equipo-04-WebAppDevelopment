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
    public class PostulacionesController : ControllerBase
    {
        private readonly IPostulacionService _postulacionService;

        public PostulacionesController(IPostulacionService postulacionService)
        {
            _postulacionService = postulacionService;
        }

        [HttpPost]
        [Authorize(Roles = "profesional")]
        public async Task<ActionResult<PostulacionResponseDTO>> Aplicar(CreatePostulacionDTO dto)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var postulacion = await _postulacionService.AplicarAsync(dto, usuarioId);
                return StatusCode(201, postulacion);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("mis-postulaciones")]
        [HttpGet("mis-aplicaciones")]
        [Authorize(Roles = "profesional")]
        public async Task<ActionResult<List<PostulacionResponseDTO>>> GetMisPostulaciones()
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var postulaciones = await _postulacionService.ListarMisPostulacionesAsync(usuarioId);
                return Ok(postulaciones);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("vacante/{vacanteId}")]
        [Authorize(Roles = "empresa")]
        public async Task<ActionResult<List<PostulacionResponseDTO>>> GetPostulantesPorVacante(long vacanteId)
        {
            try
            {
                var empresaId = ObtenerUsuarioId();
                var postulaciones = await _postulacionService.ListarPorVacanteAsync(vacanteId, empresaId);
                return Ok(postulaciones);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}/estado")]
        [Authorize(Roles = "empresa")]
        public async Task<ActionResult<PostulacionResponseDTO>> ActualizarEstado(long id, UpdatePostulacionEstadoDTO dto)
        {
            try
            {
                var empresaId = ObtenerUsuarioId();
                var postulacion = await _postulacionService.UpdateEstadoAsync(id, dto, empresaId);
                return Ok(postulacion);
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
