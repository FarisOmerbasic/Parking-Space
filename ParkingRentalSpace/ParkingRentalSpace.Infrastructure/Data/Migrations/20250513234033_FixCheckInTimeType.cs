using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkingRentalSpace.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class FixCheckInTimeType : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ActualCheckInTime",
                table: "Bookings",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualCheckInTime",
                table: "Bookings");
        }
    }
}
