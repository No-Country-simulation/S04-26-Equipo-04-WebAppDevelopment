using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Talent.API.Migrations
{
    /// <inheritdoc />
    public partial class AgregarHizoDiagnostico : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "hizo_diagnostico",
                table: "usuarios",
                type: "boolean",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "hizo_diagnostico",
                table: "usuarios");
        }
    }
}
