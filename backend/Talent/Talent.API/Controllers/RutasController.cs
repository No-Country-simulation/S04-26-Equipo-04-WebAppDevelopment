using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Talent.API.DTO;
using Talent.API.Services;

namespace Talent.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Todos los endpoints de rutas requieren autenticación
    public class RutasController : ControllerBase
    {
        private readonly IRutaAprendizajeService _service;

        public RutasController(IRutaAprendizajeService service)
        {
            _service = service;
        }

        [HttpGet("mi-ruta")]
        public async Task<ActionResult<RutaAprendizajeResponseDTO>> GetMiRuta()
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var ruta = await _service.GetRutaActivaPorUsuarioIdAsync(usuarioId);
                if (ruta == null)
                {
                    return NotFound(new { message = "No tienes ninguna ruta de aprendizaje activa en este momento." });
                }
                return Ok(ruta);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("generar/{diagnosticoId}")]
        public async Task<ActionResult<RutaAprendizajeResponseDTO>> GenerarRuta(long diagnosticoId)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var ruta = await _service.GenerarRutaDesdeDiagnosticoAsync(diagnosticoId, usuarioId);
                return StatusCode(201, ruta);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("progreso/{progresoModuloId}/clases")]
        public async Task<ActionResult<ProgresoModuloResponseDTO>> GetClasesDeModulo(long progresoModuloId)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var progresoModulo = await _service.GetProgresoModuloConClasesAsync(progresoModuloId, usuarioId);
                return Ok(progresoModulo);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("progreso/clase/{progresoClaseId}")]
        public async Task<ActionResult<ProgresoClaseResponseDTO>> CompletarClase(long progresoClaseId)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var progresoClase = await _service.CompletarClaseAsync(progresoClaseId, usuarioId);
                return Ok(progresoClase);
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
