﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ParkingRentalSpace.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddBookingStatusAndEndTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Bookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Bookings");
        }
    }
}
