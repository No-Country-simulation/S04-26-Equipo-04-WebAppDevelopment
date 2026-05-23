using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Talent.API.Migrations
{
    /// <inheritdoc />
    public partial class AddClasesAndPerfilModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "clases",
                columns: table => new
                {
                    id_clase = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_modulo = table.Column<long>(type: "bigint", nullable: false),
                    titulo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    video_url = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    contenido_texto = table.Column<string>(type: "text", nullable: false),
                    orden = table.Column<int>(type: "integer", nullable: false),
                    activa = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_clases", x => x.id_clase);
                    table.ForeignKey(
                        name: "FK_clases_modulos_id_modulo",
                        column: x => x.id_modulo,
                        principalTable: "modulos",
                        principalColumn: "id_modulo",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "perfiles",
                columns: table => new
                {
                    id_perfil = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_usuario = table.Column<long>(type: "bigint", nullable: false),
                    titular = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    biografia = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    url_linkedin = table.Column<string>(type: "character varying(150)", maxLength: 150, nullable: false),
                    visible_marketplace = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_perfiles", x => x.id_perfil);
                    table.ForeignKey(
                        name: "FK_perfiles_usuarios_id_usuario",
                        column: x => x.id_usuario,
                        principalTable: "usuarios",
                        principalColumn: "id_usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "progresos_clase",
                columns: table => new
                {
                    id_progreso_clase = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_progreso_modulo = table.Column<long>(type: "bigint", nullable: false),
                    id_clase = table.Column<long>(type: "bigint", nullable: false),
                    completado = table.Column<bool>(type: "boolean", nullable: false),
                    fecha_completado = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_progresos_clase", x => x.id_progreso_clase);
                    table.ForeignKey(
                        name: "FK_progresos_clase_clases_id_clase",
                        column: x => x.id_clase,
                        principalTable: "clases",
                        principalColumn: "id_clase",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_progresos_clase_progresos_modulo_id_progreso_modulo",
                        column: x => x.id_progreso_modulo,
                        principalTable: "progresos_modulo",
                        principalColumn: "id_progreso",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "experiencias",
                columns: table => new
                {
                    id_experiencia = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_perfil = table.Column<long>(type: "bigint", nullable: false),
                    empresa = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    cargo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    fecha_inicio = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    fecha_fin = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    descripcion = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_experiencias", x => x.id_experiencia);
                    table.ForeignKey(
                        name: "FK_experiencias_perfiles_id_perfil",
                        column: x => x.id_perfil,
                        principalTable: "perfiles",
                        principalColumn: "id_perfil",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "perfil_skills",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_perfil = table.Column<long>(type: "bigint", nullable: false),
                    id_skill = table.Column<long>(type: "bigint", nullable: false),
                    origen = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    nivel = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    validada = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_perfil_skills", x => x.id);
                    table.ForeignKey(
                        name: "FK_perfil_skills_perfiles_id_perfil",
                        column: x => x.id_perfil,
                        principalTable: "perfiles",
                        principalColumn: "id_perfil",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_perfil_skills_skills_id_skill",
                        column: x => x.id_skill,
                        principalTable: "skills",
                        principalColumn: "id_skill",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_clases_id_modulo",
                table: "clases",
                column: "id_modulo");

            migrationBuilder.CreateIndex(
                name: "IX_experiencias_id_perfil",
                table: "experiencias",
                column: "id_perfil");

            migrationBuilder.CreateIndex(
                name: "IX_perfil_skills_id_perfil",
                table: "perfil_skills",
                column: "id_perfil");

            migrationBuilder.CreateIndex(
                name: "IX_perfil_skills_id_skill",
                table: "perfil_skills",
                column: "id_skill");

            migrationBuilder.CreateIndex(
                name: "IX_perfiles_id_usuario",
                table: "perfiles",
                column: "id_usuario");

            migrationBuilder.CreateIndex(
                name: "IX_progresos_clase_id_clase",
                table: "progresos_clase",
                column: "id_clase");

            migrationBuilder.CreateIndex(
                name: "IX_progresos_clase_id_progreso_modulo",
                table: "progresos_clase",
                column: "id_progreso_modulo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "experiencias");

            migrationBuilder.DropTable(
                name: "perfil_skills");

            migrationBuilder.DropTable(
                name: "progresos_clase");

            migrationBuilder.DropTable(
                name: "perfiles");

            migrationBuilder.DropTable(
                name: "clases");
        }
    }
}
