using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Talent.API.DTO;
using Talent.API.Services;

namespace Talent.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // Todo el diagnóstico requiere estar logueado
    public class DiagnosticoController : ControllerBase
    {
        private readonly IDiagnosticoService _service;

        public DiagnosticoController(IDiagnosticoService service)
        {
            _service = service;
        }

        [HttpGet("preguntas")]
        public async Task<ActionResult<List<CategoriaPreguntasDTO>>> GetPreguntas()
        {
            var preguntas = await _service.ObtenerPreguntasAsync();
            return Ok(preguntas);
        }

        [HttpPost("iniciar")]
        public async Task<ActionResult<DiagnosticoResponseDTO>> IniciarDiagnostico()
        {
            var usuarioId = ObtenerUsuarioId();
            var response = await _service.IniciarDiagnosticoAsync(usuarioId);
            return StatusCode(201, response);
        }

        [HttpPost("responder")]
        public async Task<ActionResult<ResultadoDiagnosticoDTO>> Responder(ResponderDiagnosticoDTO dto)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var resultado = await _service.ResponderDiagnosticoAsync(dto, usuarioId);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("resultado/{id}")]
        public async Task<ActionResult<ResultadoDiagnosticoDTO>> ObtenerResultado(long id)
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var resultado = await _service.ObtenerResultadoAsync(id, usuarioId);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return NotFound(new { message = ex.Message });
            }
        }

        private long ObtenerUsuarioId()
        {
            var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userIdClaim)) throw new Exception("Usuario no autenticado");
            return long.Parse(userIdClaim);
        }
    }
}
