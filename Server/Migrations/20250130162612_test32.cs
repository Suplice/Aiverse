using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class test32 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Category",
                table: "AiServicesCategories",
                newName: "CategoryId");

            migrationBuilder.RenameColumn(
                name: "AiService",
                table: "AiServicesCategories",
                newName: "AiServiceId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "AiServicesCategories",
                newName: "Category");

            migrationBuilder.RenameColumn(
                name: "AiServiceId",
                table: "AiServicesCategories",
                newName: "AiService");
        }
    }
}
