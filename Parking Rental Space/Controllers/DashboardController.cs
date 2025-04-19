using Microsoft.AspNetCore.Mvc;
using Parking_Rental_Space.Data;
using Microsoft.EntityFrameworkCore;

namespace Parking_Rental_Space.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DashboardController(AppDbContext context)
        {
            _context = context;
        }

      
        [HttpGet("summary")]
        public async Task<IActionResult> GetSummary()
        {
            var totalUsers = await _context.Users.CountAsync();
            var totalParkingSpaces = await _context.ParkingSpaces.CountAsync();
            var totalBookings = await _context.Bookings.CountAsync();
            var totalPayments = await _context.Payments.SumAsync(p => p.Amount);

            return Ok(new
            {
                TotalUsers = totalUsers,
                TotalParkingSpaces = totalParkingSpaces,
                TotalBookings = totalBookings,
                TotalRevenue = totalPayments
            });
        }

        
        [HttpGet("latest-bookings")]
        public async Task<IActionResult> GetLatestBookings()
        {
            var latestBookings = await _context.Bookings
                .Include(b => b.User)
                .Include(b => b.ParkingSpace)
                .OrderByDescending(b => b.StartTime)
                .Take(5)
                .Select(b => new
                {
                    b.Id,
                    User = b.User.FullName,
                    ParkingAddress = b.ParkingSpace.Address,
                    b.StartTime,
                    b.EndTime,
                    b.Status
                })
                .ToListAsync();

            return Ok(latestBookings);
        }
    }
}
