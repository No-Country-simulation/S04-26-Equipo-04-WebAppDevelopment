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
    public class VacantesController : ControllerBase
    {
        private readonly IVacanteService _vacanteService;

        public VacantesController(IVacanteService vacanteService)
        {
            _vacanteService = vacanteService;
        }

        [HttpGet]
        public async Task<ActionResult<List<VacanteResponseDTO>>> GetVacantesActivas()
        {
            try
            {
                var vacantes = await _vacanteService.ListarActivasAsync();
                return Ok(vacantes);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<VacanteResponseDTO>> GetVacantePorId(long id)
        {
            try
            {
                var vacante = await _vacanteService.GetByIdAsync(id);
                if (vacante == null)
                {
                    return NotFound(new { message = "Vacante no encontrada." });
                }
                return Ok(vacante);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("mis-vacantes")]
        [Authorize(Roles = "empresa")]
        public async Task<ActionResult<List<VacanteResponseDTO>>> GetMisVacantes()
        {
            try
            {
                var empresaId = ObtenerUsuarioId();
                var vacantes = await _vacanteService.ListarPorEmpresaAsync(empresaId);
                return Ok(vacantes);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Authorize(Roles = "empresa")]
        public async Task<ActionResult<VacanteResponseDTO>> CrearVacante(CreateVacanteDTO dto)
        {
            try
            {
                var empresaId = ObtenerUsuarioId();
                var vacante = await _vacanteService.CreateAsync(dto, empresaId);
                return StatusCode(201, vacante);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "empresa")]
        public async Task<ActionResult<VacanteResponseDTO>> ActualizarVacante(long id, UpdateVacanteDTO dto)
        {
            try
            {
                var empresaId = ObtenerUsuarioId();
                var vacante = await _vacanteService.UpdateAsync(id, dto, empresaId);
                return Ok(vacante);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "empresa")]
        public async Task<ActionResult> EliminarVacante(long id)
        {
            try
            {
                var empresaId = ObtenerUsuarioId();
                await _vacanteService.DeleteAsync(id, empresaId);
                return NoContent();
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
