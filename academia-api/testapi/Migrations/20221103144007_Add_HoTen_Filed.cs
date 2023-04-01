using Microsoft.EntityFrameworkCore.Migrations;

namespace testapi.Migrations
{
    public partial class Add_HoTen_Filed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "HoTen",
                table: "AspNetUsers",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HoTen",
                table: "AspNetUsers");
        }
    }
}
