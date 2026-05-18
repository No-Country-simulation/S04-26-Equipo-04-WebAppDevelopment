using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.Entities;

namespace Talent.API
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            // Si ya hay categorías, asumimos que ya se corrió el seed y salimos.
            if (await context.CategoriasSkill.AnyAsync())
            {
                return;
            }

            // 1. Crear las Categorías
            var categorias = new Dictionary<string, CategoriaSkill>
            {
                { "Ventas", new CategoriaSkill { Nombre = "Ventas y Marketing", Descripcion = "Habilidades comerciales y marketing digital" } },
                { "Sistemas", new CategoriaSkill { Nombre = "Sistemas y Tecnología", Descripcion = "Desarrollo, nube y tecnologías IT" } },
                { "Finanzas", new CategoriaSkill { Nombre = "Finanzas y Administración", Descripcion = "Gestión contable, finanzas y reportes" } },
                { "RRHH", new CategoriaSkill { Nombre = "RRHH y Operaciones", Descripcion = "Gestión humana, logística y operaciones" } },
                { "Liderazgo", new CategoriaSkill { Nombre = "Liderazgo", Descripcion = "Manejo de equipos y liderazgo" } },
                { "Gestion", new CategoriaSkill { Nombre = "Gestión Estratégica", Descripcion = "Planificación y gestión de proyectos" } },
                { "Adaptabilidad", new CategoriaSkill { Nombre = "Adaptabilidad", Descripcion = "Gestión del cambio y agilidad" } },
                { "MarcaPersonal", new CategoriaSkill { Nombre = "Marca Personal", Descripcion = "Networking y presencia profesional" } }
            };

            await context.CategoriasSkill.AddRangeAsync(categorias.Values);
            await context.SaveChangesAsync(); // Guardamos para obtener los IDs

            var preguntas = new List<PreguntaDiagnostico>();

            // --- 2. PREGUNTAS ESPECÍFICAS ---

            // VENTAS Y MARKETING
            preguntas.AddRange(CrearPreguntas(categorias["Ventas"].Id, new[]
            {
                "¿Qué experiencia tiene en ventas por internet o marketing digital?",
                "¿Cómo lleva el registro y seguimiento de sus clientes?",
                "¿Cómo evalúa los resultados de ventas y el rendimiento del negocio?",
                "¿Cómo busca o contacta habitualmente a clientes nuevos hoy en día?",
                "¿Usa herramientas modernas como Inteligencia Artificial (ej: ChatGPT) para ayudarle a redactar correos o estrategias de ventas?"
            }));

            // SISTEMAS Y TECNOLOGÍA
            preguntas.AddRange(CrearPreguntas(categorias["Sistemas"].Id, new[]
            {
                "¿Cuál es su experiencia trabajando con servicios 'en la nube' (guardar sistemas en internet)?",
                "¿Cómo organiza el ritmo y los tiempos de trabajo de su equipo?",
                "¿Qué tan actualizados están sus conocimientos sobre programas y tecnologías?",
                "¿Cómo maneja la seguridad de los datos corporativos en su día a día?",
                "¿Utiliza asistentes de Inteligencia Artificial (como ChatGPT) para ayudarle a programar o encontrar errores técnicos rápidos?"
            }));

            // FINANZAS Y ADMINISTRACIÓN
            preguntas.AddRange(CrearPreguntas(categorias["Finanzas"].Id, new[]
            {
                "¿Qué tanto automatiza sus cálculos matemáticos y reportes de números?",
                "¿Cómo presenta y analiza los reportes financieros a nivel visual?",
                "¿Cuál es su experiencia usando sistemas integrales para administrar la empresa (como SAP)?",
                "¿Cómo se maneja con las nuevas formas de facturación y métodos de pagos digitales?",
                "¿Usa Inteligencia Artificial para ayudarle a resumir datos, redactar informes largos o detectar errores numéricos?"
            }));

            // RRHH Y OPERACIONES
            preguntas.AddRange(CrearPreguntas(categorias["RRHH"].Id, new[]
            {
                "¿Cómo organiza la información del personal o de la mercadería (stock)?",
                "¿Cómo utiliza los números o datos para medir el rendimiento de los empleados o los procesos logísticos?",
                "¿Cómo maneja el clima de trabajo y la mejora continua en las formas de trabajar?",
                "¿Cómo busca habitualmente nuevo personal o nuevos proveedores hoy en día?",
                "¿Usa herramientas de Inteligencia Artificial para optimizar procesos como redactar avisos de empleo, planificar rutas o armar planillas?"
            }));

            // --- 3. PREGUNTAS GENERALES ---

            preguntas.AddRange(CrearPreguntas(categorias["Liderazgo"].Id, new[] { "¿Ha tenido personas a cargo o ha supervisado equipos de trabajo?" }));
            preguntas.AddRange(CrearPreguntas(categorias["Gestion"].Id, new[] { "¿Tiene experiencia planificando proyectos o definiendo los objetivos de un área?" }));
            preguntas.AddRange(CrearPreguntas(categorias["Adaptabilidad"].Id, new[] { "¿Cómo se adapta cuando hay grandes cambios o reestructuraciones en la empresa?" }));
            preguntas.AddRange(CrearPreguntas(categorias["MarcaPersonal"].Id, new[] { 
                "¿Cuál es su objetivo principal en este momento de su vida laboral?",
                "¿Cómo maneja su perfil profesional en internet (por ejemplo, LinkedIn)?" 
            }));

            await context.PreguntasDiagnostico.AddRangeAsync(preguntas);
            await context.SaveChangesAsync();
        }

        private static List<PreguntaDiagnostico> CrearPreguntas(long categoriaId, string[] textos)
        {
            var lista = new List<PreguntaDiagnostico>();
            for (int i = 0; i < textos.Length; i++)
            {
                lista.Add(new PreguntaDiagnostico
                {
                    CategoriaId = categoriaId,
                    Texto = textos[i],
                    Orden = i + 1,
                    Activa = true,
                    Opciones = new List<OpcionPregunta>
                    {
                        new OpcionPregunta { Texto = "Nulo / Totalmente tradicional", Puntaje = 1, Orden = 1 },
                        new OpcionPregunta { Texto = "Básico / Uso herramientas intermedias", Puntaje = 3, Orden = 2 },
                        new OpcionPregunta { Texto = "Avanzado / Uso tecnología moderna y metodologías ágiles", Puntaje = 5, Orden = 3 }
                    }
                });
            }
            return lista;
        }
    }
}
