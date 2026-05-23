using Talent.API.DTO;
using Talent.API.Entities;
using Talent.API.Repositories;

namespace Talent.API.Services
{
    public class MatchService : IMatchService
    {
        private readonly IVacanteRepository _vacanteRepository;
        private readonly IPerfilRepository _perfilRepository;

        public MatchService(IVacanteRepository vacanteRepository, IPerfilRepository perfilRepository)
        {
            _vacanteRepository = vacanteRepository;
            _perfilRepository = perfilRepository;
        }

        public async Task<List<MatchCandidatoDTO>> GetCandidatosParaVacanteAsync(long vacanteId, long empresaId)
        {
            var vacante = await _vacanteRepository.GetByIdAsync(vacanteId);
            if (vacante == null)
            {
                throw new Exception("Vacante no encontrada.");
            }

            if (vacante.EmpresaId != empresaId)
            {
                throw new Exception("No tienes permisos para ver los candidatos de esta vacante.");
            }

            var candidatos = await _perfilRepository.GetPerfilesVisiblesAsync();
            var matches = new List<MatchCandidatoDTO>();

            foreach (var perfil in candidatos)
            {
                var skillsCoincidentes = new List<string>();
                var skillsFaltantes = new List<string>();
                double porcentajeMatch = 100.0;

                if (vacante.VacanteSkills != null && vacante.VacanteSkills.Any())
                {
                    double sumaPuntos = 0.0;
                    int totalSkillsRequeridas = vacante.VacanteSkills.Count;

                    foreach (var vs in vacante.VacanteSkills)
                    {
                        var ps = perfil.PerfilSkills.FirstOrDefault(x => x.SkillId == vs.SkillId);
                        if (ps != null)
                        {
                            int valCandidato = GetNivelValor(ps.Nivel);
                            int valRequerido = GetNivelValor(vs.NivelRequerido);

                            if (valCandidato >= valRequerido)
                            {
                                sumaPuntos += 1.0;
                                skillsCoincidentes.Add(vs.Skill?.Nombre ?? "Habilidad");
                            }
                            else
                            {
                                // Coincidencia parcial (tiene la habilidad pero en menor nivel)
                                sumaPuntos += 0.5;
                                string label = vs.Skill?.Nombre ?? "Habilidad";
                                skillsCoincidentes.Add($"{label} ({ps.Nivel} - Requerido: {vs.NivelRequerido})");
                            }
                        }
                        else
                        {
                            skillsFaltantes.Add(vs.Skill?.Nombre ?? "Habilidad");
                        }
                    }

                    porcentajeMatch = Math.Round((sumaPuntos / totalSkillsRequeridas) * 100, 2);
                }

                matches.Add(new MatchCandidatoDTO
                {
                    PerfilId = perfil.Id,
                    UsuarioId = perfil.UsuarioId,
                    Nombre = perfil.Usuario?.Nombre ?? string.Empty,
                    Apellido = perfil.Usuario?.Apellido ?? string.Empty,
                    Titular = perfil.Titular,
                    UrlLinkedin = perfil.UrlLinkedin,
                    PorcentajeMatch = porcentajeMatch,
                    SkillsCoincidentes = skillsCoincidentes,
                    SkillsFaltantes = skillsFaltantes
                });
            }

            return matches.OrderByDescending(m => m.PorcentajeMatch).ToList();
        }

        public async Task<List<MatchVacanteDTO>> GetVacantesParaProfesionalAsync(long usuarioId)
        {
            var perfil = await _perfilRepository.GetPerfilByUsuarioIdAsync(usuarioId);
            if (perfil == null)
            {
                throw new Exception("Perfil profesional no encontrado.");
            }

            var vacantes = await _vacanteRepository.ListarActivasAsync();
            var matches = new List<MatchVacanteDTO>();

            foreach (var vacante in vacantes)
            {
                var skillsCoincidentes = new List<string>();
                var skillsFaltantes = new List<string>();
                double porcentajeMatch = 100.0;

                if (vacante.VacanteSkills != null && vacante.VacanteSkills.Any())
                {
                    double sumaPuntos = 0.0;
                    int totalSkillsRequeridas = vacante.VacanteSkills.Count;

                    foreach (var vs in vacante.VacanteSkills)
                    {
                        var ps = perfil.PerfilSkills.FirstOrDefault(x => x.SkillId == vs.SkillId);
                        if (ps != null)
                        {
                            int valCandidato = GetNivelValor(ps.Nivel);
                            int valRequerido = GetNivelValor(vs.NivelRequerido);

                            if (valCandidato >= valRequerido)
                            {
                                sumaPuntos += 1.0;
                                skillsCoincidentes.Add(vs.Skill?.Nombre ?? "Habilidad");
                            }
                            else
                            {
                                sumaPuntos += 0.5;
                                string label = vs.Skill?.Nombre ?? "Habilidad";
                                skillsCoincidentes.Add($"{label} ({ps.Nivel} - Requerido: {vs.NivelRequerido})");
                            }
                        }
                        else
                        {
                            skillsFaltantes.Add(vs.Skill?.Nombre ?? "Habilidad");
                        }
                    }

                    porcentajeMatch = Math.Round((sumaPuntos / totalSkillsRequeridas) * 100, 2);
                }

                matches.Add(new MatchVacanteDTO
                {
                    VacanteId = vacante.Id,
                    Titulo = vacante.Titulo,
                    EmpresaNombre = vacante.Empresa != null ? $"{vacante.Empresa.Nombre} {vacante.Empresa.Apellido}".Trim() : string.Empty,
                    Ubicacion = vacante.Ubicacion,
                    Modalidad = vacante.Modalidad,
                    RangoSalarial = vacante.RangoSalarial,
                    PorcentajeMatch = porcentajeMatch,
                    SkillsCoincidentes = skillsCoincidentes,
                    SkillsFaltantes = skillsFaltantes
                });
            }

            return matches.OrderByDescending(m => m.PorcentajeMatch).ToList();
        }

        private int GetNivelValor(string nivel)
        {
            return (nivel ?? string.Empty).ToLower() switch
            {
                "basico" => 1,
                "intermedio" => 2,
                "avanzado" => 3,
                _ => 1
            };
        }
    }
}
