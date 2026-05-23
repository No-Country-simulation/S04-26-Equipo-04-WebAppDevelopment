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
    public class MarketplaceController : ControllerBase
    {
        private readonly IMatchService _matchService;
        private readonly IPerfilService _perfilService;

        public MarketplaceController(IMatchService matchService, IPerfilService perfilService)
        {
            _matchService = matchService;
            _perfilService = perfilService;
        }

        [HttpGet("talentos")]
        [Authorize(Roles = "empresa,admin")]
        public async Task<ActionResult<List<PerfilResponseDTO>>> GetTalentosDisponibles()
        {
            try
            {
                var talentos = await _perfilService.GetPerfilesVisiblesAsync();
                return Ok(talentos);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("vacantes/{vacanteId}/match")]
        [Authorize(Roles = "empresa")]
        public async Task<ActionResult<List<MatchCandidatoDTO>>> GetMatchCandidatos(long vacanteId)
        {
            try
            {
                var empresaId = ObtenerUsuarioId();
                var matches = await _matchService.GetCandidatosParaVacanteAsync(vacanteId, empresaId);
                return Ok(matches);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("mis-oportunidades/match")]
        [Authorize(Roles = "profesional")]
        public async Task<ActionResult<List<MatchVacanteDTO>>> GetMatchVacantes()
        {
            try
            {
                var usuarioId = ObtenerUsuarioId();
                var matches = await _matchService.GetVacantesParaProfesionalAsync(usuarioId);
                return Ok(matches);
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
