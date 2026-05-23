using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Talent.API.Migrations
{
    /// <inheritdoc />
    public partial class AddPostulacionesAndVacanteEstado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "activa",
                table: "vacantes");

            migrationBuilder.AddColumn<string>(
                name: "estado",
                table: "vacantes",
                type: "character varying(20)",
                maxLength: 20,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "postulaciones",
                columns: table => new
                {
                    id_postulacion = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    id_usuario = table.Column<long>(type: "bigint", nullable: false),
                    id_vacante = table.Column<long>(type: "bigint", nullable: false),
                    fecha_aplicacion = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    estado_seleccion = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    feedback_empresa = table.Column<string>(type: "character varying(300)", maxLength: 300, nullable: true),
                    fecha_feedback = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_postulaciones", x => x.id_postulacion);
                    table.ForeignKey(
                        name: "FK_postulaciones_usuarios_id_usuario",
                        column: x => x.id_usuario,
                        principalTable: "usuarios",
                        principalColumn: "id_usuario",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_postulaciones_vacantes_id_vacante",
                        column: x => x.id_vacante,
                        principalTable: "vacantes",
                        principalColumn: "id_vacante",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_postulaciones_id_usuario",
                table: "postulaciones",
                column: "id_usuario");

            migrationBuilder.CreateIndex(
                name: "IX_postulaciones_id_vacante",
                table: "postulaciones",
                column: "id_vacante");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "postulaciones");

            migrationBuilder.DropColumn(
                name: "estado",
                table: "vacantes");

            migrationBuilder.AddColumn<bool>(
                name: "activa",
                table: "vacantes",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }
    }
}
