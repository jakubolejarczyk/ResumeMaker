using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ResumeMakerApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCompanyRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Resumes_Companies_CompanyId",
                table: "Resumes");

            migrationBuilder.DropIndex(
                name: "IX_Resumes_CompanyId",
                table: "Resumes");

            migrationBuilder.DropColumn(
                name: "CompanyId",
                table: "Resumes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CompanyId",
                table: "Resumes",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Resumes_CompanyId",
                table: "Resumes",
                column: "CompanyId");

            migrationBuilder.AddForeignKey(
                name: "FK_Resumes_Companies_CompanyId",
                table: "Resumes",
                column: "CompanyId",
                principalTable: "Companies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
