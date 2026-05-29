using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.DTO;

namespace Talent.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SkillsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SkillsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<SkillResponseDTO>>> GetSkills()
        {
            var skills = await _context.Skills
                .AsNoTracking()
                .Include(s => s.Categoria)
                .OrderBy(s => s.Categoria.Nombre)
                .ThenBy(s => s.Nombre)
                .Select(s => new SkillResponseDTO
                {
                    Id = s.Id,
                    Nombre = s.Nombre,
                    Descripcion = s.Descripcion,
                    CategoriaId = s.CategoriaId,
                    CategoriaNombre = s.Categoria.Nombre
                })
                .ToListAsync();

            return Ok(skills);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SkillResponseDTO>> GetSkill(long id)
        {
            var skill = await _context.Skills
                .AsNoTracking()
                .Include(s => s.Categoria)
                .Where(s => s.Id == id)
                .Select(s => new SkillResponseDTO
                {
                    Id = s.Id,
                    Nombre = s.Nombre,
                    Descripcion = s.Descripcion,
                    CategoriaId = s.CategoriaId,
                    CategoriaNombre = s.Categoria.Nombre
                })
                .FirstOrDefaultAsync();

            if (skill == null)
            {
                return NotFound(new { message = "Skill no encontrada." });
            }

            return Ok(skill);
        }

        [HttpGet("categoria/{categoriaId}")]
        public async Task<ActionResult<List<SkillResponseDTO>>> GetSkillsPorCategoria(long categoriaId)
        {
            var skills = await _context.Skills
                .AsNoTracking()
                .Include(s => s.Categoria)
                .Where(s => s.CategoriaId == categoriaId)
                .OrderBy(s => s.Nombre)
                .Select(s => new SkillResponseDTO
                {
                    Id = s.Id,
                    Nombre = s.Nombre,
                    Descripcion = s.Descripcion,
                    CategoriaId = s.CategoriaId,
                    CategoriaNombre = s.Categoria.Nombre
                })
                .ToListAsync();

            return Ok(skills);
        }

        [HttpGet("categorias")]
        public async Task<ActionResult<List<CategoriaSkillResponseDTO>>> GetCategorias()
        {
            var categorias = await _context.CategoriasSkill
                .AsNoTracking()
                .Include(c => c.Skills)
                .OrderBy(c => c.Nombre)
                .Select(c => new CategoriaSkillResponseDTO
                {
                    Id = c.Id,
                    Nombre = c.Nombre,
                    Descripcion = c.Descripcion,
                    CantidadSkills = c.Skills.Count
                })
                .ToListAsync();

            return Ok(categorias);
        }
    }
}
