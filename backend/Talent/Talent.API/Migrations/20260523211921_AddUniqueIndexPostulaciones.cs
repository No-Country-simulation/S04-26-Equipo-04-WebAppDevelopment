using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talent.API.Migrations
{
    /// <inheritdoc />
    public partial class AddUniqueIndexPostulaciones : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_postulaciones_id_usuario",
                table: "postulaciones");

            migrationBuilder.CreateIndex(
                name: "IX_postulaciones_usuario_vacante_unique",
                table: "postulaciones",
                columns: new[] { "id_usuario", "id_vacante" },
                unique: true);

            migrationBuilder.Sql("UPDATE vacantes SET estado = 'abierta' WHERE estado = '' OR estado IS NULL;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_postulaciones_usuario_vacante_unique",
                table: "postulaciones");

            migrationBuilder.CreateIndex(
                name: "IX_postulaciones_id_usuario",
                table: "postulaciones",
                column: "id_usuario");
        }
    }
}
