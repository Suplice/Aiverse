using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class AiServiceModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Functions");

            migrationBuilder.RenameColumn(
                name: "VerificationStatus",
                table: "AiServices",
                newName: "Title");

            migrationBuilder.RenameColumn(
                name: "ShortDescription",
                table: "AiServices",
                newName: "Status");

            migrationBuilder.RenameColumn(
                name: "Producer",
                table: "AiServices",
                newName: "Price");

            migrationBuilder.RenameColumn(
                name: "PricingModel",
                table: "AiServices",
                newName: "Image");

            migrationBuilder.RenameColumn(
                name: "ModelName",
                table: "AiServices",
                newName: "Description");

            migrationBuilder.AddColumn<int>(
                name: "Reviews",
                table: "AiServices",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Stars",
                table: "AiServices",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FunctionName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropColumn(
                name: "Reviews",
                table: "AiServices");

            migrationBuilder.DropColumn(
                name: "Stars",
                table: "AiServices");

            migrationBuilder.RenameColumn(
                name: "Title",
                table: "AiServices",
                newName: "VerificationStatus");

            migrationBuilder.RenameColumn(
                name: "Status",
                table: "AiServices",
                newName: "ShortDescription");

            migrationBuilder.RenameColumn(
                name: "Price",
                table: "AiServices",
                newName: "Producer");

            migrationBuilder.RenameColumn(
                name: "Image",
                table: "AiServices",
                newName: "PricingModel");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "AiServices",
                newName: "ModelName");

            migrationBuilder.CreateTable(
                name: "Functions",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FunctionName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Functions", x => x.Id);
                });
        }
    }
}
