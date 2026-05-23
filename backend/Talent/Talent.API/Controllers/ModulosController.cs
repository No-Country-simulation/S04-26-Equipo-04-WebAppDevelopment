using Microsoft.AspNetCore.Mvc;
using Talent.API.DTO;
using Talent.API.Services;

namespace Talent.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModulosController : ControllerBase
    {
        private readonly IModuloService _service;

        public ModulosController(IModuloService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<List<ModuloResponseDTO>>> GetModulos()
        {
            var modulos = await _service.GetModulosActivosAsync();
            return Ok(modulos);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ModuloResponseDTO>> GetModulo(long id)
        {
            var modulo = await _service.GetModuloByIdAsync(id);
            if (modulo == null)
            {
                return NotFound(new { message = $"Módulo con ID {id} no encontrado." });
            }
            return Ok(modulo);
        }
    }
}
