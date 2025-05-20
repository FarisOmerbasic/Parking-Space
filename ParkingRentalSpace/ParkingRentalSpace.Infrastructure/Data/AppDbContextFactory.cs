using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace ParkingRentalSpace.Infrastructure.Data
{
    public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
            // Use your actual connection string here or read from a config file if needed
            optionsBuilder.UseSqlServer(
               "Server=.;Database=ParkingRentalSpace;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True");

            return new AppDbContext(optionsBuilder.Options);
        }
    }
}