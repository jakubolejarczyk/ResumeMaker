using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ResumeMakerApi.Migrations
{
    /// <inheritdoc />
    public partial class RemoveAreaCodeFromPhone : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AreaCode",
                table: "Phones");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AreaCode",
                table: "Phones",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
