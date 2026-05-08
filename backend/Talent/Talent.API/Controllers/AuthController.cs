using Microsoft.AspNetCore.Mvc;
using Talent.API.DTO;
using Talent.API.Services;

namespace Talent.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<AuthResponseDTO>> Register(RegisterDTO dto)
        {
            try
            {
                var resultado = await _authService.RegisterAsync(dto);
                return Ok(resultado);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<AuthResponseDTO>> Login(LoginDTO dto)
        {
            var resultado = await _authService.LoginAsync(dto);
            if (resultado == null)
                return Unauthorized(new { message = "Email o contraseña incorrectos" });

            return Ok(resultado);
        }
    }
}
