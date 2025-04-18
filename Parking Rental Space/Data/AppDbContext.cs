using Microsoft.EntityFrameworkCore;

namespace Parking_Rental_Space.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) {}

        public DbSet<User> Users { get; set; }
        public DbSet<ParkingSpace> ParkingSpaces { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<QrCheckin> QrCheckins { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasMany(u => u.OwnedParkingSpaces)
                .WithOne(p => p.Owner)
                .HasForeignKey(p => p.OwnerId);

            modelBuilder.Entity<User>()
                .HasMany(u => u.Bookings)
                .WithOne(b => b.User)
                .HasForeignKey(b => b.UserId);

            modelBuilder.Entity<ParkingSpace>()
                .HasMany(p => p.Bookings)
                .WithOne(b => b.ParkingSpace)
                .HasForeignKey(b => b.ParkingSpaceId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.Payment)
                .WithOne(p => p.Booking)
                .HasForeignKey<Payment>(p => p.BookingId);

            modelBuilder.Entity<Booking>()
                .HasOne(b => b.QrCheckin)
                .WithOne(q => q.Booking)
                .HasForeignKey<QrCheckin>(q => q.BookingId);

            base.OnModelCreating(modelBuilder);
        }
    }
}