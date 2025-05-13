using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Domain.Entities;

namespace ParkingRentalSpace.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users { get; set; }
    public DbSet<ParkingSpace> ParkingSpaces { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<Payment> Payments { get; set; }
    public DbSet<QrCheckin> QrCheckins { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // ParkingSpace -> Owner (User)
        modelBuilder.Entity<ParkingSpace>()
            .HasOne(p => p.Owner)
            .WithMany(u => u.OwnedParkingSpaces)
            .HasForeignKey(p => p.OwnerId)
            .OnDelete(DeleteBehavior.Restrict); // Changed from Cascade

        // Booking -> User
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.User)
            .WithMany(u => u.Bookings)
            .HasForeignKey(b => b.UserId)
            .OnDelete(DeleteBehavior.Restrict); // Changed from Cascade

        // Booking -> ParkingSpace
        modelBuilder.Entity<Booking>()
            .HasOne(b => b.ParkingSpace)
            .WithMany(p => p.Bookings)
            .HasForeignKey(b => b.ParkingSpaceId)
            .OnDelete(DeleteBehavior.Restrict); // Changed from Cascade

        // Decimal precision
        modelBuilder.Entity<ParkingSpace>()
            .Property(p => p.PricePerHour)
            .HasColumnType("decimal(18,2)");

        modelBuilder.Entity<Payment>()
            .Property(p => p.Amount)
            .HasColumnType("decimal(18,2)");
    }
}