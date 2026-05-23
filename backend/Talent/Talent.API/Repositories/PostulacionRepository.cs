using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public class PostulacionRepository : IPostulacionRepository
    {
        private readonly AppDbContext _context;

        public PostulacionRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Postulacion?> GetByIdAsync(long id)
        {
            return await _context.Postulaciones
                .Include(p => p.Usuario)
                .Include(p => p.Vacante)
                    .ThenInclude(v => v.Empresa)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Postulacion>> ListarPorProfesionalAsync(long usuarioId)
        {
            return await _context.Postulaciones
                .Include(p => p.Vacante)
                    .ThenInclude(v => v.Empresa)
                .Where(p => p.UsuarioId == usuarioId)
                .OrderByDescending(p => p.FechaAplicacion)
                .ToListAsync();
        }

        public async Task<List<Postulacion>> ListarPorVacanteAsync(long vacanteId)
        {
            return await _context.Postulaciones
                .Include(p => p.Usuario)
                .Where(p => p.VacanteId == vacanteId)
                .OrderByDescending(p => p.FechaAplicacion)
                .ToListAsync();
        }

        public async Task<Postulacion?> GetByUsuarioAndVacanteAsync(long usuarioId, long vacanteId)
        {
            return await _context.Postulaciones
                .FirstOrDefaultAsync(p => p.UsuarioId == usuarioId && p.VacanteId == vacanteId);
        }

        public async Task<Postulacion> CreateAsync(Postulacion postulacion)
        {
            _context.Postulaciones.Add(postulacion);
            await _context.SaveChangesAsync();
            return postulacion;
        }

        public async Task<Postulacion> UpdateAsync(Postulacion postulacion)
        {
            _context.Entry(postulacion).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return postulacion;
        }
    }
}
