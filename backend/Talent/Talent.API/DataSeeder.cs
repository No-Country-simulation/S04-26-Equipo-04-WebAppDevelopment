using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.Entities;

namespace Talent.API
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(AppDbContext context)
        {
            // 1. Crear las Categorías (Si no existen)
            if (!await context.CategoriasSkill.AnyAsync())
            {
                var categoriasDict = new Dictionary<string, CategoriaSkill>
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

                await context.CategoriasSkill.AddRangeAsync(categoriasDict.Values);
                await context.SaveChangesAsync(); // Guardamos para obtener los IDs
            }

            // Recuperar categorías con IDs
            var categorias = await context.CategoriasSkill.ToDictionaryAsync(c => c.Nombre, c => c);

            // 2. Crear las Preguntas del Diagnóstico (Si no existen)
            if (!await context.PreguntasDiagnostico.AnyAsync())
            {
                var preguntas = new List<PreguntaDiagnostico>();

                // VENTAS Y MARKETING
                preguntas.AddRange(CrearPreguntas(categorias["Ventas y Marketing"].Id, new[]
                {
                    "¿Qué experiencia tiene en ventas por internet o marketing digital?",
                    "¿Cómo lleva el registro y seguimiento de sus clientes?",
                    "¿Cómo evalúa los resultados de ventas y el rendimiento del negocio?",
                    "¿Cómo busca o contacta habitualmente a clientes nuevos hoy en día?",
                    "¿Usa herramientas modernas como Inteligencia Artificial (ej: ChatGPT) para ayudarle a redactar correos o estrategias de ventas?"
                }));

                // SISTEMAS Y TECNOLOGÍA
                preguntas.AddRange(CrearPreguntas(categorias["Sistemas y Tecnología"].Id, new[]
                {
                    "¿Cuál es su experiencia trabajando con servicios 'en la nube' (guardar sistemas en internet)?",
                    "¿Cómo organiza el ritmo y los tiempos de trabajo de su equipo?",
                    "¿Qué tan actualizados están sus conocimientos sobre programas y tecnologías?",
                    "¿Cómo maneja la seguridad de los datos corporativos en su día a día?",
                    "¿Utiliza asistentes de Inteligencia Artificial (como ChatGPT) para ayudarle a programar o encontrar errores técnicos rápidos?"
                }));

                // FINANZAS Y ADMINISTRACIÓN
                preguntas.AddRange(CrearPreguntas(categorias["Finanzas y Administración"].Id, new[]
                {
                    "¿Qué tanto automatiza sus cálculos matemáticos y reportes de números?",
                    "¿Cómo presenta y analiza los reportes financieros a nivel visual?",
                    "¿Cuál es su experiencia usando sistemas integrales para administrar la empresa (como SAP)?",
                    "¿Cómo se maneja con las nuevas formas de facturación y métodos de pagos digitales?",
                    "¿Usa Inteligencia Artificial para ayudarle a resumir datos, redactar informes largos o detectar errores numéricos?"
                }));

                // RRHH Y OPERACIONES
                preguntas.AddRange(CrearPreguntas(categorias["RRHH y Operaciones"].Id, new[]
                {
                    "¿Cómo organiza la información del personal o de la mercadería (stock)?",
                    "¿Cómo utiliza los números o datos para medir el rendimiento de los empleados o los procesos logísticos?",
                    "¿Cómo maneja el clima de trabajo y la mejora continua en las formas de trabajar?",
                    "¿Cómo busca habitualmente nuevo personal o nuevos proveedores hoy en día?",
                    "¿Usa herramientas de Inteligencia Artificial para optimizar procesos como redactar avisos de empleo, planificar rutas o armar planillas?"
                }));

                // PREGUNTAS GENERALES
                preguntas.AddRange(CrearPreguntas(categorias["Liderazgo"].Id, new[] { "¿Ha tenido personas a cargo o ha supervisado equipos de trabajo?" }));
                preguntas.AddRange(CrearPreguntas(categorias["Gestión Estratégica"].Id, new[] { "¿Tiene experiencia planificando proyectos o definiendo los objetivos de un área?" }));
                preguntas.AddRange(CrearPreguntas(categorias["Adaptabilidad"].Id, new[] { "¿Cómo se adapta cuando hay grandes cambios o reestructuraciones en la empresa?" }));
                preguntas.AddRange(CrearPreguntas(categorias["Marca Personal"].Id, new[] { 
                    "¿Cuál es su objetivo principal en este momento de su vida laboral?",
                    "¿Cómo maneja su perfil profesional en internet (por ejemplo, LinkedIn)?" 
                }));

                await context.PreguntasDiagnostico.AddRangeAsync(preguntas);
                await context.SaveChangesAsync();
            }

            // 3. Crear las Skills (Si no existen)
            if (!await context.Skills.AnyAsync())
            {
                var skills = new List<Skill>
                {
                    // Ventas
                    new Skill { Nombre = "Marketing Digital", CategoriaId = categorias["Ventas y Marketing"].Id, Descripcion = "Campañas online, SEO y publicidad digital básica" },
                    new Skill { Nombre = "CRM & Seguimiento de Clientes", CategoriaId = categorias["Ventas y Marketing"].Id, Descripcion = "Uso de herramientas como Salesforce, HubSpot o planillas de seguimiento comercial" },
                    
                    // Sistemas
                    new Skill { Nombre = "Uso de Inteligencia Artificial (ChatGPT/Prompts)", CategoriaId = categorias["Sistemas y Tecnología"].Id, Descripcion = "Ingeniería de prompts básica para redacción, análisis y automatización" },
                    new Skill { Nombre = "Herramientas de Colaboración (Slack/Teams)", CategoriaId = categorias["Sistemas y Tecnología"].Id, Descripcion = "Gestión de tareas y comunicación en Teams, Slack y Google Workspace" },
                    new Skill { Nombre = "Servicios en la Nube", CategoriaId = categorias["Sistemas y Tecnología"].Id, Descripcion = "Guardar y gestionar archivos y plataformas compartidas" },

                    // Finanzas
                    new Skill { Nombre = "Reportes Financieros Dinámicos", CategoriaId = categorias["Finanzas y Administración"].Id, Descripcion = "Creación de reportes, presupuestos y control de costos mediante hojas de cálculo" },
                    new Skill { Nombre = "Sistemas ERP (SAP/Odoo)", CategoriaId = categorias["Finanzas y Administración"].Id, Descripcion = "Gestión integral de operaciones de la compañía" },

                    // RRHH
                    new Skill { Nombre = "Planificación Operativa y Logística", CategoriaId = categorias["RRHH y Operaciones"].Id, Descripcion = "Control de stock, rutas operativas y distribución eficiente" },

                    // Liderazgo
                    new Skill { Nombre = "Liderazgo de Equipos Híbridos", CategoriaId = categorias["Liderazgo"].Id, Descripcion = "Gestión y motivación de personal de forma presencial y remota" },
                    
                    // Gestión
                    new Skill { Nombre = "Gestión de Proyectos (Scrum/Ágil)", CategoriaId = categorias["Gestión Estratégica"].Id, Descripcion = "Coordinación de iniciativas usando marcos de trabajo modernos y ágiles" },
                    new Skill { Nombre = "Planificación Estratégica", CategoriaId = categorias["Gestión Estratégica"].Id, Descripcion = "Establecimiento de metas y KPIs para el crecimiento de un área" },

                    // Adaptabilidad
                    new Skill { Nombre = "Gestión del Cambio Organizacional", CategoriaId = categorias["Adaptabilidad"].Id, Descripcion = "Adaptación y guía de personal ante reestructuraciones corporativas" },

                    // Marca Personal
                    new Skill { Nombre = "Posicionamiento en LinkedIn", CategoriaId = categorias["Marca Personal"].Id, Descripcion = "Optimización de perfil y networking profesional online" },
                    new Skill { Nombre = "CV Basado en Logros", CategoriaId = categorias["Marca Personal"].Id, Descripcion = "Estructura de currículum resaltando valor numérico e impactos concretos" }
                };

                await context.Skills.AddRangeAsync(skills);
                await context.SaveChangesAsync();
            }

            // Recuperar Skills con IDs
            var skillsDb = await context.Skills.ToDictionaryAsync(s => s.Nombre, s => s);

            // 4. Crear los Módulos de Aprendizaje y sus Clases (Si no existen)
            if (!await context.Modulos.AnyAsync())
            {
                // MÓDULO 1: Inteligencia Artificial para la Productividad Diaria
                var modIA = new Modulo
                {
                    Titulo = "Inteligencia Artificial para la Productividad Diaria",
                    Descripcion = "Aprende a usar ChatGPT y Copilot para redactar, resumir y organizar tu jornada laboral de forma moderna.",
                    CategoriaSkillId = categorias["Sistemas y Tecnología"].Id,
                    DuracionEstimada = "4 horas",
                    ContenidoUrl = "",
                    NivelDificultad = "basico",
                    Orden = 1,
                    Activo = true
                };

                await context.Modulos.AddAsync(modIA);
                await context.SaveChangesAsync(); // Guardar para obtener el ID de Módulo

                // Skills del Módulo 1
                await context.ModuloSkills.AddRangeAsync(new List<ModuloSkill>
                {
                    new ModuloSkill { ModuloId = modIA.Id, SkillId = skillsDb["Uso de Inteligencia Artificial (ChatGPT/Prompts)"].Id },
                    new ModuloSkill { ModuloId = modIA.Id, SkillId = skillsDb["Herramientas de Colaboración (Slack/Teams)"].Id }
                });

                // Clases del Módulo 1 (10 clases integradas)
                await context.Clases.AddRangeAsync(new List<Clase>
                {
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 1: Introducción a la IA Generativa", Descripcion = "Qué es la Inteligencia Artificial y cómo está transformando el empleo sénior.", VideoUrl = "https://www.youtube.com/embed/ZzLl20FnKhE", ContenidoTexto = "La IA generativa no reemplaza al profesional, sino que potencia su productividad...", Orden = 1 },
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 2: Creación de Cuenta y Primeros Pasos", Descripcion = "Cómo registrarse en ChatGPT y dar tus primeros comandos básicos.", VideoUrl = "https://www.youtube.com/embed/mw59ENZKiME", ContenidoTexto = "Para interactuar con la IA de manera eficiente, debemos crear un usuario y familiarizarnos...", Orden = 2 },
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 3: La Anatomía de un Buen Prompt", Descripcion = "Aprende a redactar instrucciones claras utilizando rol, contexto y formato.", VideoUrl = "https://www.youtube.com/embed/p2PqfRte46k", ContenidoTexto = "Un prompt efectivo consta de: 1. Rol, 2. Tarea, 3. Contexto, 4. Formato de salida.", Orden = 3 },
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 4: Redacción de Correos Profesionales", Descripcion = "Utiliza IA para redactar y pulir correos de negociación, seguimiento o disculpa.", VideoUrl = "https://www.youtube.com/embed/-pRqogF0Q9k", ContenidoTexto = "Puedes pedirle a la IA: 'Actúa como un Gerente de Ventas y redacta un correo para...'", Orden = 4 },
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 5: Resumen de Reportes y Documentos Largos", Descripcion = "Cómo subir o copiar textos extensos para obtener resúmenes ejecutivos al instante.", VideoUrl = "https://www.youtube.com/embed/02VLXc7ieC0", ContenidoTexto = "Copia el texto del reporte y pídele a ChatGPT: 'Haz un resumen en 5 viñetas clave de...'", Orden = 5 },
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 6: Generación de Ideas y Lluvia de Brainstorming", Descripcion = "Usa ChatGPT como un colega interactivo para proponer estrategias y agendas.", VideoUrl = "https://www.youtube.com/embed/gfUOxpHWLWI", ContenidoTexto = "El brainstorming interactivo permite pulir ideas iniciales y explorar alternativas organizativas...", Orden = 6 },
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 7: ChatGPT como Asistente de Aprendizaje", Descripcion = "Cómo pedirle a la IA que te explique conceptos técnicos complejos como si fueras un principiante.", VideoUrl = "https://www.youtube.com/embed/vQVzUG1LKLU", ContenidoTexto = "Usa el prompt: 'Explícame qué es Blockchain como si fuera un niño de 10 años...'", Orden = 7 },
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 8: IA para la Búsqueda Laboral", Descripcion = "Simulación de entrevistas y adaptación de tu perfil profesional usando prompts inteligentes.", VideoUrl = "https://www.youtube.com/embed/pKswgMO3Xps", ContenidoTexto = "Copia el aviso de empleo y pídele: 'Hazme 5 preguntas de entrevista para esta vacante...'", Orden = 8 },
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 9: Ética, Privacidad y Limitaciones de la IA", Descripcion = "Qué datos NUNCA debes compartir con la IA y cómo verificar respuestas incorrectas.", VideoUrl = "https://www.youtube.com/embed/k83SrYTh0Zg", ContenidoTexto = "Evita subir datos personales de clientes o información confidencial financiera...", Orden = 9 },
                    new Clase { ModuloId = modIA.Id, Titulo = "Clase 10: Proyecto Final - Tu Asistente Personalizado", Descripcion = "Configura tus prompts diarios ideales para automatizar tus tareas recurrentes.", VideoUrl = "https://www.youtube.com/embed/-zxjtN7hzS4", ContenidoTexto = "Aplica todo lo aprendido creando una hoja de comandos predefinidos para tu trabajo diario...", Orden = 10 }
                });

                // MÓDULO 2: Excel Avanzado para Reportes de Negocio
                var modExcel = new Modulo
                {
                    Titulo = "Excel Avanzado para Reportes de Negocio",
                    Descripcion = "Domina el armado de reportes, presupuestos y control de costos mediante hojas de cálculo profesionales.",
                    CategoriaSkillId = categorias["Finanzas y Administración"].Id,
                    DuracionEstimada = "5 horas",
                    ContenidoUrl = "",
                    NivelDificultad = "intermedio",
                    Orden = 2,
                    Activo = true
                };

                await context.Modulos.AddAsync(modExcel);
                await context.SaveChangesAsync();

                await context.ModuloSkills.AddAsync(new ModuloSkill { ModuloId = modExcel.Id, SkillId = skillsDb["Reportes Financieros Dinámicos"].Id });

                await context.Clases.AddRangeAsync(new List<Clase>
                {
                    new Clase { ModuloId = modExcel.Id, Titulo = "Clase 1: Fórmulas Condicionales y BUSCARX", Descripcion = "Aprende a buscar datos eficientemente en tablas masivas.", VideoUrl = "https://www.youtube.com/embed/bVJ3UbYkS8s", ContenidoTexto = "BUSCARX reemplaza a BUSCARV ofreciendo mayor flexibilidad y seguridad al insertar columnas...", Orden = 1 },
                    new Clase { ModuloId = modExcel.Id, Titulo = "Clase 2: Tablas Dinámicas y Segmentación", Descripcion = "Organiza y cruza miles de filas de datos de ventas u operaciones.", VideoUrl = "https://www.youtube.com/embed/Qslu3EuH-oQ", ContenidoTexto = "Las tablas dinámicas te permiten agrupar datos por fecha, categoría y región en un clic...", Orden = 2 },
                    new Clase { ModuloId = modExcel.Id, Titulo = "Clase 3: Diseño de Dashboards Ejecutivos", Descripcion = "Combina gráficos sencillos y filtros dinámicos para presentar resultados visuales.", VideoUrl = "https://www.youtube.com/embed/OeBMWKr5xFY", ContenidoTexto = "Un dashboard efectivo debe ser fácil de leer para directivos y actualizarse automáticamente...", Orden = 3 }
                });

                // MÓDULO 3: Liderazgo de Equipos Híbridos
                var modLid = new Modulo
                {
                    Titulo = "Liderazgo de Equipos Híbridos y Gestión del Cambio",
                    Descripcion = "Aprende a coordinar colaboradores en entornos combinados (presencial/remoto) y guiar procesos de cambio.",
                    CategoriaSkillId = categorias["Liderazgo"].Id,
                    DuracionEstimada = "6 horas",
                    ContenidoUrl = "",
                    NivelDificultad = "intermedio",
                    Orden = 3,
                    Activo = true
                };

                await context.Modulos.AddAsync(modLid);
                await context.SaveChangesAsync();

                await context.ModuloSkills.AddRangeAsync(new List<ModuloSkill>
                {
                    new ModuloSkill { ModuloId = modLid.Id, SkillId = skillsDb["Liderazgo de Equipos Híbridos"].Id },
                    new ModuloSkill { ModuloId = modLid.Id, SkillId = skillsDb["Gestión del Cambio Organizacional"].Id }
                });

                await context.Clases.AddRangeAsync(new List<Clase>
                {
                    new Clase { ModuloId = modLid.Id, Titulo = "Clase 1: Coordinación de Tiempos y Canales de Comunicación", Descripcion = "Cuándo usar Slack, cuándo mandar un correo y cuándo hacer una videollamada.", VideoUrl = "https://www.youtube.com/embed/ldjwrzl4mEM", ContenidoTexto = "Establecer reglas claras de comunicación asincrónica evita interrupciones y mejora la productividad...", Orden = 1 },
                    new Clase { ModuloId = modLid.Id, Titulo = "Clase 2: Medición por Objetivos (OKRs)", Descripcion = "Deja atrás el control presencial y aprende a evaluar a tu equipo basado en resultados reales.", VideoUrl = "https://www.youtube.com/embed/luTStxmXmFo", ContenidoTexto = "Los objetivos y resultados clave (OKRs) alinean los esfuerzos diarios con la estrategia de la empresa...", Orden = 2 },
                    new Clase { ModuloId = modLid.Id, Titulo = "Clase 3: Motivación y Confianza en Entornos Híbridos", Descripcion = "Estrategias para mantener integrados a colaboradores remotos y presenciales.", VideoUrl = "https://www.youtube.com/embed/Pkb7m7bqb2o", ContenidoTexto = "La seguridad psicológica y los espacios casuales de integración digital evitan el aislamiento...", Orden = 3 }
                });

                // MÓDULO 4: Marca Personal Digital y LinkedIn para +45
                var modMarca = new Modulo
                {
                    Titulo = "Marca Personal Digital y LinkedIn para +45",
                    Descripcion = "Destaca tu sólida trayectoria adaptando tu currículum y perfil de LinkedIn al mercado laboral actual.",
                    CategoriaSkillId = categorias["Marca Personal"].Id,
                    DuracionEstimada = "5 horas",
                    ContenidoUrl = "",
                    NivelDificultad = "basico",
                    Orden = 4,
                    Activo = true
                };

                await context.Modulos.AddAsync(modMarca);
                await context.SaveChangesAsync();

                await context.ModuloSkills.AddRangeAsync(new List<ModuloSkill>
                {
                    new ModuloSkill { ModuloId = modMarca.Id, SkillId = skillsDb["Posicionamiento en LinkedIn"].Id },
                    new ModuloSkill { ModuloId = modMarca.Id, SkillId = skillsDb["CV Basado en Logros"].Id }
                });

                await context.Clases.AddRangeAsync(new List<Clase>
                {
                    new Clase { ModuloId = modMarca.Id, Titulo = "Clase 1: Optimización de tu Perfil de LinkedIn", Descripcion = "Configura tu titular, foto profesional y sección 'Acerca de' para destacar tu propuesta de valor.", VideoUrl = "https://www.youtube.com/embed/diroxCwKS4k", ContenidoTexto = "Tu perfil de LinkedIn no debe ser solo una copia de tu CV, sino una carta de presentación interactiva...", Orden = 1 },
                    new Clase { ModuloId = modMarca.Id, Titulo = "Clase 2: Redacción de CV Basado en Logros", Descripcion = "Aprende a redactar tus experiencias previas enfocándote en métricas, porcentajes e impactos numéricos.", VideoUrl = "https://www.youtube.com/embed/LhSEYXR9jI4", ContenidoTexto = "En lugar de 'Responsable de presupuestos', escribe 'Optimicé un 15% el presupuesto anual mediante...'", Orden = 2 },
                    new Clase { ModuloId = modMarca.Id, Titulo = "Clase 3: Estrategias de Networking Digital", Descripcion = "Cómo conectar con decisores de empleo y participar activamente en debates de tu sector.", VideoUrl = "https://www.youtube.com/embed/la3VEf96ipk", ContenidoTexto = "Interactuar con aportes valiosos en publicaciones de tu sector incrementa tu visibilidad frente a reclutadores...", Orden = 3 }
                });

                // MÓDULO 5: Gestión de Proyectos con Scrum
                var modScrum = new Modulo
                {
                    Titulo = "Gestión de Proyectos con Scrum",
                    Descripcion = "Aprende los fundamentos del marco ágil más utilizado para liderar y organizar proyectos eficientemente.",
                    CategoriaSkillId = categorias["Gestión Estratégica"].Id,
                    DuracionEstimada = "10 horas",
                    ContenidoUrl = "",
                    NivelDificultad = "basico",
                    Orden = 5,
                    Activo = true
                };

                await context.Modulos.AddAsync(modScrum);
                await context.SaveChangesAsync();

                await context.ModuloSkills.AddAsync(new ModuloSkill { ModuloId = modScrum.Id, SkillId = skillsDb["Gestión de Proyectos (Scrum/Ágil)"].Id });

                await context.Clases.AddRangeAsync(new List<Clase>
                {
                    new Clase { ModuloId = modScrum.Id, Titulo = "Clase 1: Mentalidad Ágil vs Tradicional", Descripcion = "Comprende el manifiesto ágil y por qué las empresas buscan perfiles adaptables.", VideoUrl = "https://www.youtube.com/embed/yVA1yI3orDA", ContenidoTexto = "La agilidad prioriza la entrega de valor temprano y la adaptación al cambio sobre planes rígidos...", Orden = 1 },
                    new Clase { ModuloId = modScrum.Id, Titulo = "Clase 2: Eventos y Ceremonias en Scrum", Descripcion = "Cómo llevar el día a día con Sprint Plannings, Dailies, Reviews y Retrospectivas.", VideoUrl = "https://www.youtube.com/embed/0r7eZkAbh14", ContenidoTexto = "Las reuniones de Scrum deben ser breves, enfocadas y buscar la mejora continua en cada iteración...", Orden = 2 },
                    new Clase { ModuloId = modScrum.Id, Titulo = "Clase 3: Tableros Trello y Jira para el Día a Día", Descripcion = "Aprende a usar herramientas digitales de organización Kanban para visualizar tus flujos de trabajo.", VideoUrl = "https://www.youtube.com/embed/hGsWUrujmXM", ContenidoTexto = "Un tablero digital Kanban mejora la transparencia del equipo, permitiendo ver cuellos de botella al instante...", Orden = 3 }
                });

                await context.SaveChangesAsync();
            }

            await ActualizarVideoUrlsAsync(context);
        }

        private static async Task ActualizarVideoUrlsAsync(AppDbContext context)
        {
            var videoUrlsPorClase = new Dictionary<string, string>
            {
                ["Clase 1: Introducción a la IA Generativa"] = "https://www.youtube.com/embed/ZzLl20FnKhE",
                ["Clase 2: Creación de Cuenta y Primeros Pasos"] = "https://www.youtube.com/embed/mw59ENZKiME",
                ["Clase 3: La Anatomía de un Buen Prompt"] = "https://www.youtube.com/embed/p2PqfRte46k",
                ["Clase 4: Redacción de Correos Profesionales"] = "https://www.youtube.com/embed/-pRqogF0Q9k",
                ["Clase 5: Resumen de Reportes y Documentos Largos"] = "https://www.youtube.com/embed/02VLXc7ieC0",
                ["Clase 6: Generación de Ideas y Lluvia de Brainstorming"] = "https://www.youtube.com/embed/gfUOxpHWLWI",
                ["Clase 7: ChatGPT como Asistente de Aprendizaje"] = "https://www.youtube.com/embed/vQVzUG1LKLU",
                ["Clase 8: IA para la Búsqueda Laboral"] = "https://www.youtube.com/embed/pKswgMO3Xps",
                ["Clase 9: Ética, Privacidad y Limitaciones de la IA"] = "https://www.youtube.com/embed/k83SrYTh0Zg",
                ["Clase 10: Proyecto Final - Tu Asistente Personalizado"] = "https://www.youtube.com/embed/-zxjtN7hzS4",
                ["Clase 1: Fórmulas Condicionales y BUSCARX"] = "https://www.youtube.com/embed/bVJ3UbYkS8s",
                ["Clase 2: Tablas Dinámicas y Segmentación"] = "https://www.youtube.com/embed/Qslu3EuH-oQ",
                ["Clase 3: Diseño de Dashboards Ejecutivos"] = "https://www.youtube.com/embed/OeBMWKr5xFY",
                ["Clase 1: Coordinación de Tiempos y Canales de Comunicación"] = "https://www.youtube.com/embed/ldjwrzl4mEM",
                ["Clase 2: Medición por Objetivos (OKRs)"] = "https://www.youtube.com/embed/luTStxmXmFo",
                ["Clase 3: Motivación y Confianza en Entornos Híbridos"] = "https://www.youtube.com/embed/Pkb7m7bqb2o",
                ["Clase 1: Optimización de tu Perfil de LinkedIn"] = "https://www.youtube.com/embed/diroxCwKS4k",
                ["Clase 2: Redacción de CV Basado en Logros"] = "https://www.youtube.com/embed/LhSEYXR9jI4",
                ["Clase 3: Estrategias de Networking Digital"] = "https://www.youtube.com/embed/la3VEf96ipk",
                ["Clase 1: Mentalidad Ágil vs Tradicional"] = "https://www.youtube.com/embed/yVA1yI3orDA",
                ["Clase 2: Eventos y Ceremonias en Scrum"] = "https://www.youtube.com/embed/0r7eZkAbh14",
                ["Clase 3: Tableros Trello y Jira para el Día a Día"] = "https://www.youtube.com/embed/hGsWUrujmXM"
            };

            var titulos = videoUrlsPorClase.Keys.ToList();
            var clases = await context.Clases
                .Where(c => titulos.Contains(c.Titulo))
                .ToListAsync();

            var huboCambios = false;
            foreach (var clase in clases)
            {
                var nuevoVideoUrl = videoUrlsPorClase[clase.Titulo];
                if (clase.VideoUrl == nuevoVideoUrl) continue;

                clase.VideoUrl = nuevoVideoUrl;
                huboCambios = true;
            }

            if (huboCambios)
            {
                await context.SaveChangesAsync();
            }
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
