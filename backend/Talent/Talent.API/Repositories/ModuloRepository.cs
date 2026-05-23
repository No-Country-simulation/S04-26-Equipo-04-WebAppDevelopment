using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public class ModuloRepository : IModuloRepository
    {
        private readonly AppDbContext _context;

        public ModuloRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Modulo>> GetModulosActivosAsync()
        {
            return await _context.Modulos
                .Include(m => m.Categoria)
                .Include(m => m.ModuloSkills)
                    .ThenInclude(ms => ms.Skill)
                .Where(m => m.Activo)
                .OrderBy(m => m.Orden)
                .ToListAsync();
        }

        public async Task<Modulo?> GetModuloByIdAsync(long id)
        {
            return await _context.Modulos
                .Include(m => m.Categoria)
                .Include(m => m.ModuloSkills)
                    .ThenInclude(ms => ms.Skill)
                .FirstOrDefaultAsync(m => m.Id == id);
        }

        public async Task<List<Modulo>> GetModulosPorCategoriasAsync(IEnumerable<long> categoriaIds)
        {
            return await _context.Modulos
                .Include(m => m.Categoria)
                .Include(m => m.ModuloSkills)
                    .ThenInclude(ms => ms.Skill)
                .Where(m => m.Activo && categoriaIds.Contains(m.CategoriaSkillId))
                .OrderBy(m => m.Orden)
                .ToListAsync();
        }
    }
}
