using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public class VacanteRepository : IVacanteRepository
    {
        private readonly AppDbContext _context;

        public VacanteRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Vacante?> GetByIdAsync(long id)
        {
            return await _context.Vacantes
                .Include(v => v.Empresa)
                .Include(v => v.VacanteSkills)
                    .ThenInclude(vs => vs.Skill)
                        .ThenInclude(s => s.Categoria)
                .FirstOrDefaultAsync(v => v.Id == id);
        }

        public async Task<List<Vacante>> ListarActivasAsync()
        {
            return await _context.Vacantes
                .Include(v => v.Empresa)
                .Include(v => v.VacanteSkills)
                    .ThenInclude(vs => vs.Skill)
                        .ThenInclude(s => s.Categoria)
                .Where(v => v.Estado == "abierta")
                .OrderByDescending(v => v.FechaPublicacion)
                .ToListAsync();
        }

        public async Task<List<Vacante>> ListarPorEmpresaAsync(long empresaId)
        {
            return await _context.Vacantes
                .Include(v => v.Empresa)
                .Include(v => v.VacanteSkills)
                    .ThenInclude(vs => vs.Skill)
                        .ThenInclude(s => s.Categoria)
                .Where(v => v.EmpresaId == empresaId)
                .OrderByDescending(v => v.FechaPublicacion)
                .ToListAsync();
        }

        public async Task<Vacante> CreateAsync(Vacante vacante)
        {
            _context.Vacantes.Add(vacante);
            await _context.SaveChangesAsync();
            return vacante;
        }

        public async Task UpdateAsync(Vacante vacante)
        {
            _context.Vacantes.Update(vacante);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Vacante vacante)
        {
            _context.Vacantes.Remove(vacante);
            await _context.SaveChangesAsync();
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
