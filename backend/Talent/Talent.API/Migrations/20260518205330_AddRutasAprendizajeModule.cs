using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Talent.API.Migrations
{
    /// <inheritdoc />
    public partial class AddRutasAprendizajeModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "modulos",
                columns: table => new
                {
                    id_modulo = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    titulo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    id_categoria_skill = table.Column<long>(type: "bigint", nullable: false),
                    duracion_estimada = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    contenido_url = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    nivel_dificultad = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    orden = table.Column<int>(type: "integer", nullable: false),
                    activo = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_modulos", x => x.id_modulo);
                    table.ForeignKey(
                        name: "FK_modulos_categorias_skill_id_categoria_skill",
                        column: x => x.id_categoria_skill,
                        principalTable: "categorias_skill",
                        principalColumn: "id_categoria",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "rutas_aprendizaje",
                columns: table => new
                {
                    id_ruta = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_usuario = table.Column<long>(type: "bigint", nullable: false),
                    id_diagnostico = table.Column<long>(type: "bigint", nullable: false),
                    fecha_creacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rutas_aprendizaje", x => x.id_ruta);
                    table.ForeignKey(
                        name: "FK_rutas_aprendizaje_diagnosticos_id_diagnostico",
                        column: x => x.id_diagnostico,
                        principalTable: "diagnosticos",
                        principalColumn: "id_diagnostico",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_rutas_aprendizaje_usuarios_id_usuario",
                        column: x => x.id_usuario,
                        principalTable: "usuarios",
                        principalColumn: "id_usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "modulo_skills",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_modulo = table.Column<long>(type: "bigint", nullable: false),
                    id_skill = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_modulo_skills", x => x.id);
                    table.ForeignKey(
                        name: "FK_modulo_skills_modulos_id_modulo",
                        column: x => x.id_modulo,
                        principalTable: "modulos",
                        principalColumn: "id_modulo",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_modulo_skills_skills_id_skill",
                        column: x => x.id_skill,
                        principalTable: "skills",
                        principalColumn: "id_skill",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "progresos_modulo",
                columns: table => new
                {
                    id_progreso = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_ruta = table.Column<long>(type: "bigint", nullable: false),
                    id_modulo = table.Column<long>(type: "bigint", nullable: false),
                    estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    fecha_inicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    fecha_completado = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_progresos_modulo", x => x.id_progreso);
                    table.ForeignKey(
                        name: "FK_progresos_modulo_modulos_id_modulo",
                        column: x => x.id_modulo,
                        principalTable: "modulos",
                        principalColumn: "id_modulo",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_progresos_modulo_rutas_aprendizaje_id_ruta",
                        column: x => x.id_ruta,
                        principalTable: "rutas_aprendizaje",
                        principalColumn: "id_ruta",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_modulo_skills_id_modulo",
                table: "modulo_skills",
                column: "id_modulo");

            migrationBuilder.CreateIndex(
                name: "IX_modulo_skills_id_skill",
                table: "modulo_skills",
                column: "id_skill");

            migrationBuilder.CreateIndex(
                name: "IX_modulos_id_categoria_skill",
                table: "modulos",
                column: "id_categoria_skill");

            migrationBuilder.CreateIndex(
                name: "IX_progresos_modulo_id_modulo",
                table: "progresos_modulo",
                column: "id_modulo");

            migrationBuilder.CreateIndex(
                name: "IX_progresos_modulo_id_ruta",
                table: "progresos_modulo",
                column: "id_ruta");

            migrationBuilder.CreateIndex(
                name: "IX_rutas_aprendizaje_id_diagnostico",
                table: "rutas_aprendizaje",
                column: "id_diagnostico");

            migrationBuilder.CreateIndex(
                name: "IX_rutas_aprendizaje_id_usuario",
                table: "rutas_aprendizaje",
                column: "id_usuario");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "modulo_skills");

            migrationBuilder.DropTable(
                name: "progresos_modulo");

            migrationBuilder.DropTable(
                name: "modulos");

            migrationBuilder.DropTable(
                name: "rutas_aprendizaje");
        }
    }
}
