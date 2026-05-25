using Talent.API.DTO;
using Talent.API.Entities;
using Talent.API.Repositories;

namespace Talent.API.Services
{
    public class DiagnosticoService : IDiagnosticoService
    {
        private readonly IDiagnosticoRepository _repository;
        private readonly IUsuarioRepository _usuarioRepository;

        public DiagnosticoService(IDiagnosticoRepository repository, IUsuarioRepository usuarioRepository)
        {
            _repository = repository;
            _usuarioRepository = usuarioRepository;
        }

        public async Task<List<CategoriaPreguntasDTO>> ObtenerPreguntasAsync()
        {
            return await _repository.GetCategoriasConPreguntasAsync();
        }

        public async Task<DiagnosticoResponseDTO> IniciarDiagnosticoAsync(long usuarioId)
        {
            var diagnostico = new Diagnostico
            {
                UsuarioId = usuarioId,
                Fecha = DateTime.UtcNow,
                Estado = "en_progreso"
            };

            await _repository.CreateDiagnosticoAsync(diagnostico);

            return new DiagnosticoResponseDTO
            {
                Id = diagnostico.Id,
                Fecha = diagnostico.Fecha,
                Estado = diagnostico.Estado
            };
        }

        public async Task<ResultadoDiagnosticoDTO> ResponderDiagnosticoAsync(ResponderDiagnosticoDTO dto, long usuarioId)
        {
            var diagnostico = await _repository.GetDiagnosticoByIdAsync(dto.DiagnosticoId);
            if (diagnostico == null || diagnostico.UsuarioId != usuarioId)
            {
                throw new Exception("Diagnóstico no encontrado o no pertenece al usuario.");
            }

            if (diagnostico.Estado == "completado")
            {
                throw new Exception("El diagnóstico ya fue completado.");
            }

            // Obtener las preguntas y opciones para calcular puntajes
            var preguntaIds = dto.Respuestas.Select(r => r.PreguntaId).ToList();
            var preguntasDb = await _repository.GetPreguntasByListaIdsAsync(preguntaIds);

            var respuestasAGuardar = new List<RespuestaDiagnostico>();
            
            // Diccionario para acumular puntajes por categoria
            // key: CategoriaId, value: (Obtenido, Maximo)
            var puntajesPorCategoria = new Dictionary<long, (int Obtenido, int Maximo)>();

            foreach (var r in dto.Respuestas)
            {
                var pregunta = preguntasDb.FirstOrDefault(p => p.Id == r.PreguntaId);
                if (pregunta == null) continue;

                var opcionElegida = pregunta.Opciones.FirstOrDefault(o => o.Id == r.OpcionId);
                if (opcionElegida == null) continue;

                // Crear la respuesta
                respuestasAGuardar.Add(new RespuestaDiagnostico
                {
                    DiagnosticoId = diagnostico.Id,
                    PreguntaId = pregunta.Id,
                    OpcionId = opcionElegida.Id
                });

                // Encontrar el puntaje máximo posible de esta pregunta
                int maximoPregunta = pregunta.Opciones.Max(o => o.Puntaje);

                // Acumular
                if (!puntajesPorCategoria.ContainsKey(pregunta.CategoriaId))
                {
                    puntajesPorCategoria[pregunta.CategoriaId] = (0, 0);
                }

                var actual = puntajesPorCategoria[pregunta.CategoriaId];
                puntajesPorCategoria[pregunta.CategoriaId] = (actual.Obtenido + opcionElegida.Puntaje, actual.Maximo + maximoPregunta);
            }

            await _repository.AddRespuestasAsync(respuestasAGuardar);

            // Calcular resultados finales
            var resultadosAGuardar = new List<ResultadoDiagnostico>();

            foreach (var kvp in puntajesPorCategoria)
            {
                var catId = kvp.Key;
                var (obtenido, maximo) = kvp.Value;

                // Evitar division por cero
                if(maximo == 0) maximo = 1;

                double porcentaje = (double)obtenido / maximo * 100;
                string nivel = DeterminarNivel(porcentaje);
                string recomendacion = GenerarRecomendacion(nivel);

                resultadosAGuardar.Add(new ResultadoDiagnostico
                {
                    DiagnosticoId = diagnostico.Id,
                    CategoriaId = catId,
                    PuntajeObtenido = obtenido,
                    PuntajeMaximo = maximo,
                    Nivel = nivel,
                    Recomendacion = recomendacion
                });
            }

            await _repository.AddResultadosAsync(resultadosAGuardar);

            diagnostico.Estado = "completado";
            await _repository.UpdateDiagnosticoAsync(diagnostico);

            // Actualizar la bandera HizoDiagnostico del usuario a true
            var usuario = await _usuarioRepository.GetByIdAsync(usuarioId);
            if (usuario != null)
            {
                usuario.HizoDiagnostico = true;
                await _usuarioRepository.UpdateAsync(usuarioId, usuario);
            }

            return await ObtenerResultadoAsync(diagnostico.Id, usuarioId);
        }

        public async Task<ResultadoDiagnosticoDTO> ObtenerResultadoAsync(long diagnosticoId, long usuarioId)
        {
            var diagnostico = await _repository.GetDiagnosticoByIdAsync(diagnosticoId);
            if (diagnostico == null || diagnostico.UsuarioId != usuarioId)
            {
                throw new Exception("Diagnóstico no encontrado o no pertenece al usuario.");
            }

            var dto = new ResultadoDiagnosticoDTO
            {
                DiagnosticoId = diagnostico.Id,
                Estado = diagnostico.Estado,
                Resultados = diagnostico.Resultados.Select(r => new CategoriaResultadoDTO
                {
                    Categoria = r.Categoria?.Nombre ?? "Desconocida",
                    PuntajeObtenido = r.PuntajeObtenido,
                    PuntajeMaximo = r.PuntajeMaximo,
                    Nivel = r.Nivel,
                    Recomendacion = r.Recomendacion
                }).ToList()
            };

            return dto;
        }

        private string DeterminarNivel(double porcentaje)
        {
            if (porcentaje <= 40) return "basico";
            if (porcentaje <= 70) return "intermedio";
            return "avanzado";
        }

        private string GenerarRecomendacion(string nivel)
        {
            return nivel switch
            {
                "basico" => "Se recomienda iniciar con los módulos fundamentales para construir una base sólida.",
                "intermedio" => "Buen nivel. Te sugerimos módulos de perfeccionamiento para consolidar estas habilidades.",
                "avanzado" => "Nivel destacado. Podés enfocarte en compartir conocimiento y actualizar herramientas específicas.",
                _ => ""
            };
        }
    }
}
