using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Data;
using System.Security.Claims;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingsController(AppDbContext context)
    {
        _context = context;
    }

    // POST: api/bookings
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Book([FromBody] CreateBookingDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var user = await _context.Users.FindAsync(userId);

        var space = await _context.ParkingSpaces.FindAsync(dto.ParkingSpaceId);
        if (space == null || !space.IsAvailable)
            return BadRequest("Space not available.");

        var owner = await _context.Users.FindAsync(space.OwnerId);
        if (owner == null)
            return BadRequest("Owner not found.");

        var totalPrice = space.PricePerHour * dto.Hours;

        if (user.Balance < totalPrice)
            return BadRequest("Insufficient balance.");

        // Deduct from user, add to owner
        user.Balance -= totalPrice;
        owner.Balance += totalPrice;

        var booking = new Booking
        {
            ParkingSpaceId = dto.ParkingSpaceId,
            UserId = userId,
            UserEmail = user.Email,
            StartTime = dto.StartTime,
            Hours = dto.Hours,
            TotalPrice = totalPrice,
            Status = "Pending"
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        return Ok(new { success = true });
    }

    // GET: api/bookings/owner
    [HttpGet("owner")]
    [Authorize]
    public IActionResult GetOwnerBookings()
    {
        var ownerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var bookings = _context.Bookings
            .Include(b => b.ParkingSpace)
            .Where(b => b.ParkingSpace.OwnerId == ownerId)
            .Select(b => new BookingDto
            {
                Id = b.Id,
                ParkingSpaceId = b.ParkingSpaceId,
                ParkingSpaceName = b.ParkingSpace.SpaceName,
                UserEmail = b.UserEmail,
                StartTime = b.StartTime,
                Hours = b.Hours,
                TotalPrice = b.TotalPrice
            })
            .OrderByDescending(b => b.StartTime)
            .ToList();

        return Ok(bookings);
    }

    // GET: api/bookings/my
    [HttpGet("my")]
    [Authorize]
    public IActionResult GetMyBookings()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var bookings = _context.Bookings
            .Include(b => b.ParkingSpace)
            .Where(b => b.UserId == userId)
            .Select(b => new
            {
                b.Id,
                b.ParkingSpaceId,
                ParkingSpaceName = b.ParkingSpace.SpaceName,
                b.StartTime,
                b.Hours,
                b.TotalPrice,
                b.Status
            })
            .OrderByDescending(b => b.StartTime)
            .ToList();

        return Ok(bookings);
    }

    // GET: api/bookings/my/upcoming
  [HttpGet("my/upcoming")]
[Authorize]
public async Task<IActionResult> GetMyUpcomingBookings()
{
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
    var upcomingBookings = await _context.Bookings
        .Where(b => b.UserId == userId && b.StartTime > DateTime.Now)
        .OrderBy(b => b.StartTime)
        .Take(5)
        .Include(b => b.ParkingSpace)
        .Include(b => b.User) // Include user details
        .Select(b => new
        {
            b.Id,
            b.TotalPrice,
            b.StartTime,
            b.EndTime,
            SpaceName = b.ParkingSpace.SpaceName,
            UserName = b.User.Name, // <-- include user name
        })
        .ToListAsync();

    return Ok(upcomingBookings);
}


    // GET: api/bookings/my/recent
   [HttpGet("my/recent")]
[Authorize]
public async Task<IActionResult> GetRecentBookings()
{
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
    var now = DateTime.UtcNow;

    var recent = await _context.Bookings
        .Where(b => b.UserId == userId && b.StartTime <= now)
        .OrderByDescending(b => b.StartTime)
        .Take(5)
        .Include(b => b.ParkingSpace)
        .Include(b => b.User)
        .Select(b => new
        {
            b.Id,
            b.TotalPrice,
            UserName = b.User.Name,
            SpaceName = b.ParkingSpace.SpaceName,
            b.StartTime,
            b.EndTime,
            b.Status
        })
        .ToListAsync();

    return Ok(recent);
}

    // GET: api/bookings/balance
    [HttpGet("balance")]
    [Authorize]
    public async Task<IActionResult> GetBalance()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var user = await _context.Users.FindAsync(userId);
        return Ok(new { balance = user.Balance });
    }

    // POST: api/bookings/topup
    [HttpPost("topup")]
    [Authorize]
    public async Task<IActionResult> TopUp([FromBody] decimal amount)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var user = await _context.Users.FindAsync(userId);
        user.Balance += amount;
        await _context.SaveChangesAsync();
        return Ok(new { balance = user.Balance });
    }

    // POST: api/bookings/{id}/checkin
    [HttpPost("{id}/checkin")]
    [Authorize]
    public async Task<IActionResult> CheckIn(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null)
            return NotFound();

        if (booking.UserId != userId)
            return Forbid();

        if (booking.Status != "Pending")
            return BadRequest("Booking is not pending.");

        booking.Status = "Active";
        await _context.SaveChangesAsync();
        return Ok(new { status = "active" });
    }

    // POST: api/bookings/{id}/complete
    [HttpPost("{id}/complete")]
    [Authorize]
    public async Task<IActionResult> Complete(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null)
            return NotFound();

        if (booking.UserId != userId)
            return Forbid();

        if (!string.Equals(booking.Status, "Active", StringComparison.OrdinalIgnoreCase))
            return BadRequest("Booking is not active.");

        booking.Status = "Completed";
        await _context.SaveChangesAsync();
        return Ok(new { status = "completed" });
    }
}
