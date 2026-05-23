using Microsoft.EntityFrameworkCore;
using Talent.API.Entities;

namespace Talent.API.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<CategoriaSkill> CategoriasSkill { get; set; }
        public DbSet<Skill> Skills { get; set; }

        // Diagnóstico
        public DbSet<PreguntaDiagnostico> PreguntasDiagnostico { get; set; }
        public DbSet<OpcionPregunta> OpcionesPregunta { get; set; }
        public DbSet<Diagnostico> Diagnosticos { get; set; }
        public DbSet<RespuestaDiagnostico> RespuestasDiagnostico { get; set; }
        public DbSet<ResultadoDiagnostico> ResultadosDiagnostico { get; set; }

        // Rutas de Aprendizaje y Clases
        public DbSet<Modulo> Modulos { get; set; }
        public DbSet<ModuloSkill> ModuloSkills { get; set; }
        public DbSet<RutaAprendizaje> RutasAprendizaje { get; set; }
        public DbSet<ProgresoModulo> ProgresosModulo { get; set; }
        public DbSet<Clase> Clases { get; set; }
        public DbSet<ProgresoClase> ProgresosClase { get; set; }

        // Perfil Dinámico (CV Vivo)
        public DbSet<Perfil> Perfiles { get; set; }
        public DbSet<PerfilSkill> PerfilSkills { get; set; }
        public DbSet<Experiencia> Experiencias { get; set; }

        // Vacantes y Matching
        public DbSet<Vacante> Vacantes { get; set; }
        public DbSet<VacanteSkill> VacanteSkills { get; set; }
        public DbSet<Postulacion> Postulaciones { get; set; }

        // Este método le dice a EF cómo mapear tu clase a la tabla real
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Usuario>(entity =>
            {
                entity.ToTable("usuarios"); // nombre real de la tabla en PostgreSQL
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id_usuario");
                entity.Property(e => e.Nombre).HasColumnName("nombre");
                entity.Property(e => e.Apellido).HasColumnName("apellido");
                entity.Property(e => e.Email).HasColumnName("email");
                entity.Property(e => e.Password).HasColumnName("contraseña");
                entity.Property(e => e.TipoUsuario).HasColumnName("tipo_usuario");
                entity.Property(e => e.FechaRegistro).HasColumnName("fecha_registro");
            });

            modelBuilder.Entity<CategoriaSkill>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            modelBuilder.Entity<Skill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(d => d.Categoria)
                    .WithMany(p => p.Skills)
                    .HasForeignKey(d => d.CategoriaId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            // --- Configuración Módulo Diagnóstico ---
            
            modelBuilder.Entity<PreguntaDiagnostico>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(d => d.Categoria)
                    .WithMany()
                    .HasForeignKey(d => d.CategoriaId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<OpcionPregunta>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(d => d.Pregunta)
                    .WithMany(p => p.Opciones)
                    .HasForeignKey(d => d.PreguntaId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Diagnostico>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(d => d.Usuario)
                    .WithMany()
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<RespuestaDiagnostico>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.HasOne(d => d.Diagnostico)
                    .WithMany(p => p.Respuestas)
                    .HasForeignKey(d => d.DiagnosticoId)
                    .OnDelete(DeleteBehavior.Cascade);
                    
                entity.HasOne(d => d.Pregunta)
                    .WithMany()
                    .HasForeignKey(d => d.PreguntaId)
                    .OnDelete(DeleteBehavior.Restrict);
                    
                entity.HasOne(d => d.Opcion)
                    .WithMany()
                    .HasForeignKey(d => d.OpcionId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<ResultadoDiagnostico>(entity =>
            {
                entity.HasKey(e => e.Id);
                
                entity.HasOne(d => d.Diagnostico)
                    .WithMany(p => p.Resultados)
                    .HasForeignKey(d => d.DiagnosticoId)
                    .OnDelete(DeleteBehavior.Cascade);
                    
                entity.HasOne(d => d.Categoria)
                    .WithMany()
                    .HasForeignKey(d => d.CategoriaId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            // --- Configuración Módulo Rutas de Aprendizaje ---

            modelBuilder.Entity<Modulo>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(d => d.Categoria)
                    .WithMany()
                    .HasForeignKey(d => d.CategoriaSkillId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<ModuloSkill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(d => d.Modulo)
                    .WithMany(p => p.ModuloSkills)
                    .HasForeignKey(d => d.ModuloId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(d => d.Skill)
                    .WithMany()
                    .HasForeignKey(d => d.SkillId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<RutaAprendizaje>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(d => d.Usuario)
                    .WithMany()
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(d => d.Diagnostico)
                    .WithMany()
                    .HasForeignKey(d => d.DiagnosticoId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<ProgresoModulo>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.HasOne(d => d.Ruta)
                    .WithMany(p => p.Progresos)
                    .HasForeignKey(d => d.RutaId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(d => d.Modulo)
                    .WithMany()
                    .HasForeignKey(d => d.ModuloId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Clase>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id_clase");
                entity.Property(e => e.ModuloId).HasColumnName("id_modulo");
                entity.Property(e => e.Titulo).HasColumnName("titulo");
                entity.Property(e => e.Descripcion).HasColumnName("descripcion");
                entity.Property(e => e.VideoUrl).HasColumnName("video_url");
                entity.Property(e => e.ContenidoTexto).HasColumnName("contenido_texto");
                entity.Property(e => e.Orden).HasColumnName("orden");
                entity.Property(e => e.Activa).HasColumnName("activa");

                entity.HasOne(d => d.Modulo)
                    .WithMany()
                    .HasForeignKey(d => d.ModuloId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ProgresoClase>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id_progreso_clase");
                entity.Property(e => e.ProgresoModuloId).HasColumnName("id_progreso_modulo");
                entity.Property(e => e.ClaseId).HasColumnName("id_clase");
                entity.Property(e => e.Completado).HasColumnName("completado");
                entity.Property(e => e.FechaCompletado).HasColumnName("fecha_completado");

                entity.HasOne(d => d.ProgresoModulo)
                    .WithMany(p => p.ProgresosClase)
                    .HasForeignKey(d => d.ProgresoModuloId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(d => d.Clase)
                    .WithMany()
                    .HasForeignKey(d => d.ClaseId)
                    .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Perfil>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id_perfil");
                entity.Property(e => e.UsuarioId).HasColumnName("id_usuario");
                entity.Property(e => e.Titular).HasColumnName("titular");
                entity.Property(e => e.Biografia).HasColumnName("biografia");
                entity.Property(e => e.UrlLinkedin).HasColumnName("url_linkedin");
                entity.Property(e => e.VisibleMarketplace).HasColumnName("visible_marketplace");

                entity.HasOne(d => d.Usuario)
                    .WithMany()
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<PerfilSkill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.PerfilId).HasColumnName("id_perfil");
                entity.Property(e => e.SkillId).HasColumnName("id_skill");
                entity.Property(e => e.Origen).HasColumnName("origen");
                entity.Property(e => e.Nivel).HasColumnName("nivel");
                entity.Property(e => e.Validada).HasColumnName("validada");

                entity.HasOne(d => d.Perfil)
                    .WithMany(p => p.PerfilSkills)
                    .HasForeignKey(d => d.PerfilId)
                    .OnDelete(DeleteBehavior.Cascade);
                entity.HasOne(d => d.Skill)
                    .WithMany()
                    .HasForeignKey(d => d.SkillId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Experiencia>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id_experiencia");
                entity.Property(e => e.PerfilId).HasColumnName("id_perfil");
                entity.Property(e => e.Empresa).HasColumnName("empresa");
                entity.Property(e => e.Cargo).HasColumnName("cargo");
                entity.Property(e => e.FechaInicio).HasColumnName("fecha_inicio");
                entity.Property(e => e.FechaFin).HasColumnName("fecha_fin");
                entity.Property(e => e.Descripcion).HasColumnName("descripcion");

                entity.HasOne(d => d.Perfil)
                    .WithMany(p => p.Experiencias)
                    .HasForeignKey(d => d.PerfilId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Vacante>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id_vacante");
                entity.Property(e => e.EmpresaId).HasColumnName("id_empresa");
                entity.Property(e => e.Titulo).HasColumnName("titulo");
                entity.Property(e => e.Descripcion).HasColumnName("descripcion");
                entity.Property(e => e.Ubicacion).HasColumnName("ubicacion");
                entity.Property(e => e.Modalidad).HasColumnName("modalidad");
                entity.Property(e => e.RangoSalarial).HasColumnName("rango_salarial");
                entity.Property(e => e.Estado).HasColumnName("estado");
                entity.Property(e => e.FechaPublicacion).HasColumnName("fecha_publicacion");

                entity.HasOne(d => d.Empresa)
                    .WithMany()
                    .HasForeignKey(d => d.EmpresaId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<VacanteSkill>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.VacanteId).HasColumnName("id_vacante");
                entity.Property(e => e.SkillId).HasColumnName("id_skill");
                entity.Property(e => e.NivelRequerido).HasColumnName("nivel_requerido");

                entity.HasOne(d => d.Vacante)
                    .WithMany(p => p.VacanteSkills)
                    .HasForeignKey(d => d.VacanteId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(d => d.Skill)
                    .WithMany()
                    .HasForeignKey(d => d.SkillId)
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Postulacion>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id_postulacion");
                entity.Property(e => e.UsuarioId).HasColumnName("id_usuario");
                entity.Property(e => e.VacanteId).HasColumnName("id_vacante");
                entity.Property(e => e.FechaAplicacion).HasColumnName("fecha_aplicacion");
                entity.Property(e => e.EstadoSeleccion).HasColumnName("estado_seleccion");
                entity.Property(e => e.FeedbackEmpresa).HasColumnName("feedback_empresa");
                entity.Property(e => e.FechaFeedback).HasColumnName("fecha_feedback");

                entity.HasOne(d => d.Usuario)
                    .WithMany()
                    .HasForeignKey(d => d.UsuarioId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(d => d.Vacante)
                    .WithMany()
                    .HasForeignKey(d => d.VacanteId)
                    .OnDelete(DeleteBehavior.Cascade);

                entity.HasIndex(e => new { e.UsuarioId, e.VacanteId })
                    .IsUnique()
                    .HasDatabaseName("IX_postulaciones_usuario_vacante_unique");
            });
        }
    }
}
