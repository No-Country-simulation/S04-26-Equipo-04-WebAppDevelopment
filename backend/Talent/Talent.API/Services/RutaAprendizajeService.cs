using Talent.API.DTO;
using Talent.API.Entities;
using Talent.API.Repositories;

namespace Talent.API.Services
{
    public class RutaAprendizajeService : IRutaAprendizajeService
    {
        private readonly IRutaAprendizajeRepository _rutaRepository;
        private readonly IDiagnosticoRepository _diagnosticoRepository;
        private readonly IModuloRepository _moduloRepository;
        private readonly IPerfilRepository _perfilRepository;

        public RutaAprendizajeService(
            IRutaAprendizajeRepository rutaRepository,
            IDiagnosticoRepository diagnosticoRepository,
            IModuloRepository moduloRepository,
            IPerfilRepository perfilRepository)
        {
            _rutaRepository = rutaRepository;
            _diagnosticoRepository = diagnosticoRepository;
            _moduloRepository = moduloRepository;
            _perfilRepository = perfilRepository;
        }

        public async Task<RutaAprendizajeResponseDTO?> GetRutaActivaPorUsuarioIdAsync(long usuarioId)
        {
            var ruta = await _rutaRepository.GetRutaActivaPorUsuarioIdAsync(usuarioId);
            if (ruta == null) return null;

            return MapToRutaResponseDTO(ruta);
        }

        public async Task<RutaAprendizajeResponseDTO> GenerarRutaDesdeDiagnosticoAsync(long diagnosticoId, long usuarioId)
        {
            // 1. Validar diagnóstico
            var diagnostico = await _diagnosticoRepository.GetDiagnosticoByIdAsync(diagnosticoId);
            if (diagnostico == null || diagnostico.UsuarioId != usuarioId)
            {
                throw new Exception("El diagnóstico especificado no existe o no pertenece a este usuario.");
            }

            if (diagnostico.Estado != "completado")
            {
                throw new Exception("El diagnóstico aún no ha sido completado.");
            }

            // 2. Si ya tiene una ruta activa, devolverla
            var rutaExistente = await _rutaRepository.GetRutaActivaPorUsuarioIdAsync(usuarioId);
            if (rutaExistente != null)
            {
                return MapToRutaResponseDTO(rutaExistente);
            }

            // 3. Obtener categorías con brechas (basico o intermedio)
            var categoriasConBrechas = diagnostico.Resultados
                .Where(r => r.Nivel == "basico" || r.Nivel == "intermedio")
                .Select(r => r.CategoriaId)
                .ToList();

            // 4. Buscar módulos activos
            var todosModulos = await _moduloRepository.GetModulosActivosAsync();
            var modulosSeleccionados = new List<Modulo>();

            if (categoriasConBrechas.Any())
            {
                // Agrupar por categoría
                var modulosPorCategoria = todosModulos
                    .Where(m => categoriasConBrechas.Contains(m.CategoriaSkillId))
                    .GroupBy(m => m.CategoriaSkillId)
                    .ToDictionary(g => g.Key, g => g.OrderBy(m => m.NivelDificultad == "basico" ? 0 : 1).ToList());

                // Seleccionar al menos 1 por categoría con brecha, priorizando básico
                foreach (var catId in categoriasConBrechas)
                {
                    if (modulosPorCategoria.ContainsKey(catId) && modulosPorCategoria[catId].Any())
                    {
                        var mod = modulosPorCategoria[catId].First();
                        modulosSeleccionados.Add(mod);
                        modulosPorCategoria[catId].RemoveAt(0); // Remover para no duplicar
                    }
                }

                // Si aún nos faltan para llegar a un mínimo de 3 módulos
                if (modulosSeleccionados.Count < 3)
                {
                    var restantes = modulosPorCategoria.Values.SelectMany(x => x)
                        .OrderBy(m => m.NivelDificultad == "basico" ? 0 : 1)
                        .ToList();

                    while (modulosSeleccionados.Count < 3 && restantes.Any())
                    {
                        modulosSeleccionados.Add(restantes.First());
                        restantes.RemoveAt(0);
                    }
                }
            }

            // 5. Si la lista sigue teniendo menos de 3 (ej. usuario es avanzado en todo o no hay suficientes módulos de sus categorías)
            if (modulosSeleccionados.Count < 3)
            {
                // Completar con cualquier módulo activo disponible
                var noSeleccionados = todosModulos
                    .Where(m => !modulosSeleccionados.Any(ms => ms.Id == m.Id))
                    .OrderBy(m => m.NivelDificultad == "basico" ? 0 : 1)
                    .ToList();

                while (modulosSeleccionados.Count < 3 && noSeleccionados.Any())
                {
                    modulosSeleccionados.Add(noSeleccionados.First());
                    noSeleccionados.RemoveAt(0);
                }
            }

            // Limitar a máximo 4 para no sobrecargar la ruta inicial del MVP
            var seleccionFinal = modulosSeleccionados.Take(4).ToList();

            // 6. Crear la ruta
            var nuevaRuta = new RutaAprendizaje
            {
                UsuarioId = usuarioId,
                DiagnosticoId = diagnosticoId,
                FechaCreacion = DateTime.UtcNow,
                Estado = "activa",
                Progresos = new List<ProgresoModulo>()
            };

            foreach (var m in seleccionFinal)
            {
                nuevaRuta.Progresos.Add(new ProgresoModulo
                {
                    ModuloId = m.Id,
                    Estado = "pendiente"
                });
            }

            var rutaGuardada = await _rutaRepository.CreateRutaAprendizajeAsync(nuevaRuta);

            // 7. Crear el progreso de las clases para cada módulo de la ruta
            var progresosClase = new List<ProgresoClase>();
            foreach (var pm in rutaGuardada.Progresos)
            {
                var clases = await _rutaRepository.GetClasesPorModuloIdAsync(pm.ModuloId);
                foreach (var c in clases)
                {
                    progresosClase.Add(new ProgresoClase
                    {
                        ProgresoModuloId = pm.Id,
                        ClaseId = c.Id,
                        Completado = false
                    });
                }
            }

            if (progresosClase.Any())
            {
                await _rutaRepository.AddProgresosClaseAsync(progresosClase);
            }

            // Recargar la ruta con todas sus inclusiones para devolver el DTO completo
            var rutaCompleta = await _rutaRepository.GetRutaActivaPorUsuarioIdAsync(usuarioId);
            return MapToRutaResponseDTO(rutaCompleta!);
        }

        public async Task<ProgresoModuloResponseDTO> GetProgresoModuloConClasesAsync(long progresoModuloId, long usuarioId)
        {
            var pm = await _rutaRepository.GetProgresoModuloConClasesAsync(progresoModuloId);
            if (pm == null || pm.Ruta.UsuarioId != usuarioId)
            {
                throw new Exception("Progreso de módulo no encontrado o no pertenece a este usuario.");
            }

            return MapToProgresoModuloResponseDTO(pm);
        }

        public async Task<ProgresoClaseResponseDTO> CompletarClaseAsync(long progresoClaseId, long usuarioId)
        {
            // 1. Buscar el progreso de la clase
            var pc = await _rutaRepository.GetProgresoClaseByIdAsync(progresoClaseId);
            if (pc == null || pc.ProgresoModulo.Ruta.UsuarioId != usuarioId)
            {
                throw new Exception("Progreso de clase no encontrado o no pertenece a este usuario.");
            }

            if (pc.Completado)
            {
                return MapToProgresoClaseResponseDTO(pc);
            }

            // 2. Marcar como completada
            pc.Completado = true;
            pc.FechaCompletado = DateTime.UtcNow;

            var pm = pc.ProgresoModulo;

            // Si estaba pendiente, iniciarlo
            if (pm.Estado == "pendiente")
            {
                pm.Estado = "en_progreso";
                pm.FechaInicio = DateTime.UtcNow;
            }

            // 3. Verificar si se completaron todas las clases de este módulo
            // Volvemos a traer el progreso del módulo con todas sus clases asociadas
            var pmConClases = await _rutaRepository.GetProgresoModuloConClasesAsync(pm.Id);
            if (pmConClases != null && pmConClases.ProgresosClase.All(c => c.Completado))
            {
                pmConClases.Estado = "completado";
                pmConClases.FechaCompletado = DateTime.UtcNow;

                // 4. Agregar las skills asociadas al perfil del usuario como VALIDADAS
                var perfil = await _perfilRepository.GetPerfilByUsuarioIdAsync(usuarioId);
                if (perfil == null)
                {
                    // Si no tiene perfil aún, se crea uno básico (por robustez, aunque debió crearse al registrarse)
                    perfil = new Perfil
                    {
                        UsuarioId = usuarioId,
                        VisibleMarketplace = false
                    };
                    await _perfilRepository.CreatePerfilAsync(perfil);
                }

                // Cargar el módulo completo con sus skills asociadas
                var moduloCompleto = await _moduloRepository.GetModuloByIdAsync(pmConClases.ModuloId);
                if (moduloCompleto != null)
                {
                    foreach (var ms in moduloCompleto.ModuloSkills)
                    {
                        var perfilSkill = await _perfilRepository.GetPerfilSkillAsync(perfil.Id, ms.SkillId);
                        if (perfilSkill == null)
                        {
                            await _perfilRepository.AddPerfilSkillAsync(new PerfilSkill
                            {
                                PerfilId = perfil.Id,
                                SkillId = ms.SkillId,
                                Origen = "ruta_aprendizaje",
                                Nivel = moduloCompleto.NivelDificultad,
                                Validada = true
                            });
                        }
                        else if (!perfilSkill.Validada)
                        {
                            // Si ya la tenía manual pero no validada, se promueve a validada por la ruta
                            perfilSkill.Origen = "ruta_aprendizaje";
                            perfilSkill.Nivel = moduloCompleto.NivelDificultad;
                            perfilSkill.Validada = true;
                        }
                    }
                }

                // 5. Verificar si se completaron TODOS los módulos de la ruta activa
                var rutaActiva = await _rutaRepository.GetRutaActivaPorUsuarioIdAsync(usuarioId);
                if (rutaActiva != null && rutaActiva.Progresos.All(p => p.Estado == "completado"))
                {
                    rutaActiva.Estado = "completada";

                    // Desbloquear al usuario en el marketplace
                    perfil.VisibleMarketplace = true;
                    await _perfilRepository.UpdatePerfilAsync(perfil);
                }
            }

            await _rutaRepository.UpdateRutaAndProgresoAsync();

            return MapToProgresoClaseResponseDTO(pc);
        }

        // --- Helpers de Mapeo ---

        private RutaAprendizajeResponseDTO MapToRutaResponseDTO(RutaAprendizaje ruta)
        {
            return new RutaAprendizajeResponseDTO
            {
                Id = ruta.Id,
                UsuarioId = ruta.UsuarioId,
                DiagnosticoId = ruta.DiagnosticoId,
                FechaCreacion = ruta.FechaCreacion,
                Estado = ruta.Estado,
                Progresos = ruta.Progresos.Select(MapToProgresoModuloResponseDTO).ToList()
            };
        }

        private ProgresoModuloResponseDTO MapToProgresoModuloResponseDTO(ProgresoModulo pm)
        {
            return new ProgresoModuloResponseDTO
            {
                Id = pm.Id,
                RutaId = pm.RutaId,
                ModuloId = pm.ModuloId,
                Estado = pm.Estado,
                FechaInicio = pm.FechaInicio,
                FechaCompletado = pm.FechaCompletado,
                Modulo = new ModuloResponseDTO
                {
                    Id = pm.Modulo.Id,
                    Titulo = pm.Modulo.Titulo,
                    Descripcion = pm.Modulo.Descripcion,
                    CategoriaSkillId = pm.Modulo.CategoriaSkillId,
                    CategoriaNombre = pm.Modulo.Categoria?.Nombre ?? string.Empty,
                    DuracionEstimada = pm.Modulo.DuracionEstimada,
                    NivelDificultad = pm.Modulo.NivelDificultad,
                    Orden = pm.Modulo.Orden,
                    SkillsDesarrolladas = pm.Modulo.ModuloSkills.Select(ms => ms.Skill?.Nombre ?? string.Empty).ToList()
                },
                ProgresosClase = pm.ProgresosClase.OrderBy(pc => pc.Clase.Orden).Select(MapToProgresoClaseResponseDTO).ToList()
            };
        }

        private ProgresoClaseResponseDTO MapToProgresoClaseResponseDTO(ProgresoClase pc)
        {
            return new ProgresoClaseResponseDTO
            {
                Id = pc.Id,
                ProgresoModuloId = pc.ProgresoModuloId,
                ClaseId = pc.ClaseId,
                Completado = pc.Completado,
                FechaCompletado = pc.FechaCompletado,
                Clase = new ClaseResponseDTO
                {
                    Id = pc.Clase.Id,
                    ModuloId = pc.Clase.ModuloId,
                    Titulo = pc.Clase.Titulo,
                    Descripcion = pc.Clase.Descripcion,
                    VideoUrl = pc.Clase.VideoUrl,
                    ContenidoTexto = pc.Clase.ContenidoTexto,
                    Orden = pc.Clase.Orden
                }
            };
        }
    }
}
