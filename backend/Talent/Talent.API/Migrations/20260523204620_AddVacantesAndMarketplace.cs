using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Talent.API.Migrations
{
    /// <inheritdoc />
    public partial class AddVacantesAndMarketplace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "vacantes",
                columns: table => new
                {
                    id_vacante = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_empresa = table.Column<long>(type: "bigint", nullable: false),
                    titulo = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    descripcion = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    ubicacion = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    modalidad = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    rango_salarial = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    activa = table.Column<bool>(type: "boolean", nullable: false),
                    fecha_publicacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vacantes", x => x.id_vacante);
                    table.ForeignKey(
                        name: "FK_vacantes_usuarios_id_empresa",
                        column: x => x.id_empresa,
                        principalTable: "usuarios",
                        principalColumn: "id_usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "vacante_skills",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_vacante = table.Column<long>(type: "bigint", nullable: false),
                    id_skill = table.Column<long>(type: "bigint", nullable: false),
                    nivel_requerido = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_vacante_skills", x => x.id);
                    table.ForeignKey(
                        name: "FK_vacante_skills_skills_id_skill",
                        column: x => x.id_skill,
                        principalTable: "skills",
                        principalColumn: "id_skill",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_vacante_skills_vacantes_id_vacante",
                        column: x => x.id_vacante,
                        principalTable: "vacantes",
                        principalColumn: "id_vacante",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_vacante_skills_id_skill",
                table: "vacante_skills",
                column: "id_skill");

            migrationBuilder.CreateIndex(
                name: "IX_vacante_skills_id_vacante",
                table: "vacante_skills",
                column: "id_vacante");

            migrationBuilder.CreateIndex(
                name: "IX_vacantes_id_empresa",
                table: "vacantes",
                column: "id_empresa");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "vacante_skills");

            migrationBuilder.DropTable(
                name: "vacantes");
        }
    }
}
