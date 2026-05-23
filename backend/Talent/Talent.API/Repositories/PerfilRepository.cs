using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public class PerfilRepository : IPerfilRepository
    {
        private readonly AppDbContext _context;

        public PerfilRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Perfil?> GetPerfilByUsuarioIdAsync(long usuarioId)
        {
            return await _context.Perfiles
                .Include(p => p.Usuario)
                .Include(p => p.PerfilSkills)
                    .ThenInclude(ps => ps.Skill)
                        .ThenInclude(s => s.Categoria)
                .Include(p => p.Experiencias)
                .FirstOrDefaultAsync(p => p.UsuarioId == usuarioId);
        }

        public async Task<Perfil?> GetPerfilByIdAsync(long perfilId)
        {
            return await _context.Perfiles
                .Include(p => p.Usuario)
                .Include(p => p.PerfilSkills)
                    .ThenInclude(ps => ps.Skill)
                        .ThenInclude(s => s.Categoria)
                .Include(p => p.Experiencias)
                .FirstOrDefaultAsync(p => p.Id == perfilId);
        }

        public async Task<List<Perfil>> GetPerfilesVisiblesAsync()
        {
            return await _context.Perfiles
                .Include(p => p.Usuario)
                .Include(p => p.PerfilSkills)
                    .ThenInclude(ps => ps.Skill)
                        .ThenInclude(s => s.Categoria)
                .Include(p => p.Experiencias)
                .Where(p => p.VisibleMarketplace)
                .ToListAsync();
        }

        public async Task<Perfil> CreatePerfilAsync(Perfil perfil)
        {
            await _context.Perfiles.AddAsync(perfil);
            await _context.SaveChangesAsync();
            return perfil;
        }

        public async Task UpdatePerfilAsync(Perfil perfil)
        {
            _context.Perfiles.Update(perfil);
            await _context.SaveChangesAsync();
        }

        public async Task<Experiencia> AddExperienciaAsync(Experiencia experiencia)
        {
            await _context.Experiencias.AddAsync(experiencia);
            await _context.SaveChangesAsync();
            return experiencia;
        }

        public async Task<Experiencia?> GetExperienciaByIdAsync(long id)
        {
            return await _context.Experiencias
                .Include(e => e.Perfil)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task DeleteExperienciaAsync(Experiencia experiencia)
        {
            _context.Experiencias.Remove(experiencia);
            await _context.SaveChangesAsync();
        }

        public async Task AddPerfilSkillAsync(PerfilSkill perfilSkill)
        {
            await _context.PerfilSkills.AddAsync(perfilSkill);
            await _context.SaveChangesAsync();
        }

        public async Task<PerfilSkill?> GetPerfilSkillAsync(long perfilId, long skillId)
        {
            return await _context.PerfilSkills
                .FirstOrDefaultAsync(ps => ps.PerfilId == perfilId && ps.SkillId == skillId);
        }

        public async Task SaveAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
