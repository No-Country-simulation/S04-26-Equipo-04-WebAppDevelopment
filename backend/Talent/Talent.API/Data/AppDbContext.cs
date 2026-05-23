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

        // Rutas de Aprendizaje
        public DbSet<Modulo> Modulos { get; set; }
        public DbSet<ModuloSkill> ModuloSkills { get; set; }
        public DbSet<RutaAprendizaje> RutasAprendizaje { get; set; }
        public DbSet<ProgresoModulo> ProgresosModulo { get; set; }

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
        }
    }
}
