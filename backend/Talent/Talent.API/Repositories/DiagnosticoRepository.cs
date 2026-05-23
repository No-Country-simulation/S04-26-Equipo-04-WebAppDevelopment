using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.DTO;
using Talent.API.Entities;

namespace Talent.API.Repositories
{
    public class DiagnosticoRepository : IDiagnosticoRepository
    {
        private readonly AppDbContext _context;

        public DiagnosticoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoriaPreguntasDTO>> GetCategoriasConPreguntasAsync()
        {
            var preguntas = await _context.PreguntasDiagnostico
                .Include(p => p.Opciones)
                .Include(p => p.Categoria)
                .Where(p => p.Activa)
                .ToListAsync();

            var agrupadas = preguntas.GroupBy(p => p.Categoria.Nombre)
                .Select(g => new CategoriaPreguntasDTO
                {
                    Categoria = g.Key,
                    Preguntas = g.Select(p => new PreguntaResponseDTO
                    {
                        Id = p.Id,
                        Texto = p.Texto,
                        Opciones = p.Opciones.OrderBy(o => o.Orden).Select(o => new OpcionResponseDTO
                        {
                            Id = o.Id,
                            Texto = o.Texto,
                            Orden = o.Orden
                        }).ToList()
                    }).ToList()
                }).ToList();

            return agrupadas;
        }

        public async Task<Diagnostico> CreateDiagnosticoAsync(Diagnostico diagnostico)
        {
            _context.Diagnosticos.Add(diagnostico);
            await _context.SaveChangesAsync();
            return diagnostico;
        }

        public async Task<Diagnostico?> GetDiagnosticoByIdAsync(long id)
        {
            return await _context.Diagnosticos
                .Include(d => d.Resultados)
                .ThenInclude(r => r.Categoria)
                .FirstOrDefaultAsync(d => d.Id == id);
        }

        public async Task UpdateDiagnosticoAsync(Diagnostico diagnostico)
        {
            _context.Diagnosticos.Update(diagnostico);
            await _context.SaveChangesAsync();
        }

        public async Task AddRespuestasAsync(IEnumerable<RespuestaDiagnostico> respuestas)
        {
            await _context.RespuestasDiagnostico.AddRangeAsync(respuestas);
            await _context.SaveChangesAsync();
        }

        public async Task AddResultadosAsync(IEnumerable<ResultadoDiagnostico> resultados)
        {
            await _context.ResultadosDiagnostico.AddRangeAsync(resultados);
            await _context.SaveChangesAsync();
        }

        public async Task<List<PreguntaDiagnostico>> GetPreguntasByListaIdsAsync(IEnumerable<long> preguntaIds)
        {
            return await _context.PreguntasDiagnostico
                .Include(p => p.Opciones)
                .Where(p => preguntaIds.Contains(p.Id))
                .ToListAsync();
        }
    }
}
