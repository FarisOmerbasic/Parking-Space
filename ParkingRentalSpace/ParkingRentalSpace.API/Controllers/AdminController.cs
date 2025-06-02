using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ParkingRentalSpace.API.Controllers
{
    [ApiController]
    [Route("api/admin")]
    [Authorize(Roles = "Admin")] // This correctly protects the admin routes
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.Users.ToListAsync();
            var userDtos = new List<AdminUserDto>();

            foreach (var user in users)
            {
                var spacesCount = await _context.ParkingSpaces
                    .CountAsync(p => p.OwnerId == user.Id);

                var bookingsCount = await _context.Bookings
                    .CountAsync(b => b.UserId == user.Id);

                userDtos.Add(new AdminUserDto
                {
                    Id = user.Id,
                    Name = user.Name,
                    Email = user.Email,
                    Balance = user.Balance,
                    ParkingSpacesCount = spacesCount,
                    BookingsCount = bookingsCount
                });
            }

            return Ok(userDtos);
        }

        [HttpGet("payments")]
        public async Task<IActionResult> GetAllPayments()
        {
            var payments = await _context.Payments
                .Include(p => p.Booking)
                .ThenInclude(b => b.User)
                .OrderByDescending(p => p.PaidAt)
                .Select(p => new PaymentRecordDto
                {
                    Id = p.Id,
                    UserId = p.Booking.UserId, // Ensure userId is int on frontend if using this
                    UserName = p.Booking.User.Name,
                    UserEmail = p.Booking.User.Email,
                    Amount = p.Amount,
                    PaymentDate = p.PaidAt,
                    Description = $"Payment for booking #{p.BookingId}",
                    Status = p.Status
                })
                .ToListAsync();

            return Ok(payments);
        }

        // This method is not an API endpoint and seems to be a helper, no changes needed.
        private decimal GetUserBalance(int userId)
        {
            var payments = _context.Payments
                .Where(p => p.Booking.UserId == userId)
                .Sum(p => p.Amount);

            var bookingsCost = _context.Bookings
                .Where(b => b.UserId == userId && b.Status == "Completed")
                .Sum(b => b.TotalPrice);

            return payments - bookingsCost;
        }


    [HttpPost("payments/add-test")]
    [Authorize(Roles = "Admin")] // Ensure only admins can use this test endpoint
    public async Task<IActionResult> AddTestPayment([FromBody] AddTestPaymentDto model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        // Find the user and booking to ensure they exist in your actual database
        var user = await _context.Users.FindAsync(model.UserId);
        if (user == null)
        {
            return BadRequest($"User with ID {model.UserId} not found in your database.");
        }

        var booking = await _context.Bookings.FindAsync(model.BookingId);
        if (booking == null)
        {
            return BadRequest($"Booking with ID {model.BookingId} not found in your database.");
        }

        var newPayment = new Payment
        {
            UserId = model.UserId,
            BookingId = model.BookingId,
            Amount = model.Amount,
            PaidAt = DateTime.UtcNow, // Use current time
            Status = model.Status
        };

        _context.Payments.Add(newPayment);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Test payment added successfully!", paymentId = newPayment.Id });
    }
}
    }
    
    public class AddTestPaymentDto
{
    public int UserId { get; set; }
    public int BookingId { get; set; }
    public decimal Amount { get; set; }
    public string Status { get; set; } = "Completed"; // Default to Completed
}

    // DTOs (assuming these are in separate files or nested)
public class AdminUserDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public int ParkingSpacesCount { get; set; }
    public int BookingsCount { get; set; }
}

    public class PaymentRecordDto
    {
        public int Id { get; set; }
        public int UserId { get; set; } // Changed to int to match database
        public string UserName { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public string Description { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
    }
