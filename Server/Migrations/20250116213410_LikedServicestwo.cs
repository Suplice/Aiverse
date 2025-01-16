using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Server.Migrations
{
    /// <inheritdoc />
    public partial class LikedServicestwo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Functions_AiServices_AiServiceId",
                table: "Functions");

            migrationBuilder.DropForeignKey(
                name: "FK_LikedServices_AiServices_AiServiceId",
                table: "LikedServices");

            migrationBuilder.DropForeignKey(
                name: "FK_LikedServices_Users_UserId",
                table: "LikedServices");

            migrationBuilder.DropIndex(
                name: "IX_LikedServices_AiServiceId",
                table: "LikedServices");

            migrationBuilder.DropIndex(
                name: "IX_LikedServices_UserId",
                table: "LikedServices");

            migrationBuilder.DropIndex(
                name: "IX_Functions_AiServiceId",
                table: "Functions");

            migrationBuilder.DropColumn(
                name: "AiServiceId",
                table: "Functions");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "AiServiceId",
                table: "Functions",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_LikedServices_AiServiceId",
                table: "LikedServices",
                column: "AiServiceId");

            migrationBuilder.CreateIndex(
                name: "IX_LikedServices_UserId",
                table: "LikedServices",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Functions_AiServiceId",
                table: "Functions",
                column: "AiServiceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Functions_AiServices_AiServiceId",
                table: "Functions",
                column: "AiServiceId",
                principalTable: "AiServices",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_LikedServices_AiServices_AiServiceId",
                table: "LikedServices",
                column: "AiServiceId",
                principalTable: "AiServices",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_LikedServices_Users_UserId",
                table: "LikedServices",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
