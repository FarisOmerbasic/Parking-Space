using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkingRentalSpace.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddSpaceNameAndAvailableTimesToParkingSpace : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvailableTimes",
                table: "ParkingSpaces",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "SpaceName",
                table: "ParkingSpaces",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvailableTimes",
                table: "ParkingSpaces");

            migrationBuilder.DropColumn(
                name: "SpaceName",
                table: "ParkingSpaces");
        }
    }
}
