using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Talent.API.Migrations
{
    /// <inheritdoc />
    public partial class AddDiagnosticoModule : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "diagnosticos",
                columns: table => new
                {
                    id_diagnostico = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_usuario = table.Column<long>(type: "bigint", nullable: false),
                    fecha = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    estado = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_diagnosticos", x => x.id_diagnostico);
                    table.ForeignKey(
                        name: "FK_diagnosticos_usuarios_id_usuario",
                        column: x => x.id_usuario,
                        principalTable: "usuarios",
                        principalColumn: "id_usuario",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "preguntas_diagnostico",
                columns: table => new
                {
                    id_pregunta = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_categoria = table.Column<long>(type: "bigint", nullable: false),
                    texto = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    orden = table.Column<int>(type: "integer", nullable: false),
                    activa = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_preguntas_diagnostico", x => x.id_pregunta);
                    table.ForeignKey(
                        name: "FK_preguntas_diagnostico_categorias_skill_id_categoria",
                        column: x => x.id_categoria,
                        principalTable: "categorias_skill",
                        principalColumn: "id_categoria",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "resultados_diagnostico",
                columns: table => new
                {
                    id_resultado = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_diagnostico = table.Column<long>(type: "bigint", nullable: false),
                    id_categoria = table.Column<long>(type: "bigint", nullable: false),
                    puntaje_obtenido = table.Column<int>(type: "integer", nullable: false),
                    puntaje_maximo = table.Column<int>(type: "integer", nullable: false),
                    nivel = table.Column<string>(type: "character varying(15)", maxLength: 15, nullable: false),
                    recomendacion = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_resultados_diagnostico", x => x.id_resultado);
                    table.ForeignKey(
                        name: "FK_resultados_diagnostico_categorias_skill_id_categoria",
                        column: x => x.id_categoria,
                        principalTable: "categorias_skill",
                        principalColumn: "id_categoria",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_resultados_diagnostico_diagnosticos_id_diagnostico",
                        column: x => x.id_diagnostico,
                        principalTable: "diagnosticos",
                        principalColumn: "id_diagnostico",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "opciones_pregunta",
                columns: table => new
                {
                    id_opcion = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_pregunta = table.Column<long>(type: "bigint", nullable: false),
                    texto = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: false),
                    puntaje = table.Column<int>(type: "integer", nullable: false),
                    orden = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_opciones_pregunta", x => x.id_opcion);
                    table.ForeignKey(
                        name: "FK_opciones_pregunta_preguntas_diagnostico_id_pregunta",
                        column: x => x.id_pregunta,
                        principalTable: "preguntas_diagnostico",
                        principalColumn: "id_pregunta",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "respuestas_diagnostico",
                columns: table => new
                {
                    id_respuesta = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_diagnostico = table.Column<long>(type: "bigint", nullable: false),
                    id_pregunta = table.Column<long>(type: "bigint", nullable: false),
                    id_opcion = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_respuestas_diagnostico", x => x.id_respuesta);
                    table.ForeignKey(
                        name: "FK_respuestas_diagnostico_diagnosticos_id_diagnostico",
                        column: x => x.id_diagnostico,
                        principalTable: "diagnosticos",
                        principalColumn: "id_diagnostico",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_respuestas_diagnostico_opciones_pregunta_id_opcion",
                        column: x => x.id_opcion,
                        principalTable: "opciones_pregunta",
                        principalColumn: "id_opcion",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_respuestas_diagnostico_preguntas_diagnostico_id_pregunta",
                        column: x => x.id_pregunta,
                        principalTable: "preguntas_diagnostico",
                        principalColumn: "id_pregunta",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_diagnosticos_id_usuario",
                table: "diagnosticos",
                column: "id_usuario");

            migrationBuilder.CreateIndex(
                name: "IX_opciones_pregunta_id_pregunta",
                table: "opciones_pregunta",
                column: "id_pregunta");

            migrationBuilder.CreateIndex(
                name: "IX_preguntas_diagnostico_id_categoria",
                table: "preguntas_diagnostico",
                column: "id_categoria");

            migrationBuilder.CreateIndex(
                name: "IX_respuestas_diagnostico_id_diagnostico",
                table: "respuestas_diagnostico",
                column: "id_diagnostico");

            migrationBuilder.CreateIndex(
                name: "IX_respuestas_diagnostico_id_opcion",
                table: "respuestas_diagnostico",
                column: "id_opcion");

            migrationBuilder.CreateIndex(
                name: "IX_respuestas_diagnostico_id_pregunta",
                table: "respuestas_diagnostico",
                column: "id_pregunta");

            migrationBuilder.CreateIndex(
                name: "IX_resultados_diagnostico_id_categoria",
                table: "resultados_diagnostico",
                column: "id_categoria");

            migrationBuilder.CreateIndex(
                name: "IX_resultados_diagnostico_id_diagnostico",
                table: "resultados_diagnostico",
                column: "id_diagnostico");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "respuestas_diagnostico");

            migrationBuilder.DropTable(
                name: "resultados_diagnostico");

            migrationBuilder.DropTable(
                name: "opciones_pregunta");

            migrationBuilder.DropTable(
                name: "diagnosticos");

            migrationBuilder.DropTable(
                name: "preguntas_diagnostico");
        }
    }
}
