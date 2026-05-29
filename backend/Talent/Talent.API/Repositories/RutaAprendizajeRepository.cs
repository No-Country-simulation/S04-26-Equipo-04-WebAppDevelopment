using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public class RutaAprendizajeRepository : IRutaAprendizajeRepository
    {
        private readonly AppDbContext _context;

        public RutaAprendizajeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<RutaAprendizaje?> GetRutaActivaPorUsuarioIdAsync(long usuarioId)
        {
            return await _context.RutasAprendizaje
                .Include(r => r.Progresos)
                    .ThenInclude(p => p.Modulo)
                        .ThenInclude(m => m.Categoria)
                .Include(r => r.Progresos)
                    .ThenInclude(p => p.Modulo)
                        .ThenInclude(m => m.ModuloSkills)
                            .ThenInclude(ms => ms.Skill)
                .Include(r => r.Progresos)
                    .ThenInclude(p => p.ProgresosClase)
                        .ThenInclude(pc => pc.Clase)
                .Where(r => r.UsuarioId == usuarioId && (r.Estado == "activa" || r.Estado == "completada"))
                .OrderBy(r => r.Estado == "activa" ? 0 : 1)
                .ThenByDescending(r => r.FechaCreacion)
                .FirstOrDefaultAsync();
        }

        public async Task<RutaAprendizaje> CreateRutaAprendizajeAsync(RutaAprendizaje ruta)
        {
            await _context.RutasAprendizaje.AddAsync(ruta);
            await _context.SaveChangesAsync();
            return ruta;
        }

        public async Task<ProgresoModulo?> GetProgresoModuloByIdAsync(long progresoId)
        {
            return await _context.ProgresosModulo
                .Include(p => p.Ruta)
                .Include(p => p.Modulo)
                .FirstOrDefaultAsync(p => p.Id == progresoId);
        }

        public async Task<ProgresoClase?> GetProgresoClaseByIdAsync(long progresoClaseId)
        {
            return await _context.ProgresosClase
                .Include(pc => pc.ProgresoModulo)
                    .ThenInclude(pm => pm.Ruta)
                .Include(pc => pc.Clase)
                .FirstOrDefaultAsync(pc => pc.Id == progresoClaseId);
        }

        public async Task<List<Clase>> GetClasesPorModuloIdAsync(long moduloId)
        {
            return await _context.Clases
                .Where(c => c.ModuloId == moduloId && c.Activa)
                .OrderBy(c => c.Orden)
                .ToListAsync();
        }

        public async Task<ProgresoModulo?> GetProgresoModuloConClasesAsync(long progresoModuloId)
        {
            return await _context.ProgresosModulo
                .Include(pm => pm.ProgresosClase)
                    .ThenInclude(pc => pc.Clase)
                .Include(pm => pm.Modulo)
                    .ThenInclude(m => m.Categoria)
                .Include(pm => pm.Modulo)
                    .ThenInclude(m => m.ModuloSkills)
                        .ThenInclude(ms => ms.Skill)
                .Include(pm => pm.Ruta)
                .FirstOrDefaultAsync(pm => pm.Id == progresoModuloId);
        }

        public async Task AddProgresosClaseAsync(IEnumerable<ProgresoClase> progresos)
        {
            await _context.ProgresosClase.AddRangeAsync(progresos);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateRutaAndProgresoAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
