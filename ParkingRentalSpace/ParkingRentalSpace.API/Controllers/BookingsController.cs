using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
            TotalPrice = totalPrice
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
    [HttpPost("{id}/checkin")]
    [Authorize]
    public async Task<IActionResult> CheckIn(int id)
    {
        var userId = int.Parse(User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier));
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null)
            return NotFound();

        // Only the user who made the booking can check in
        if (booking.UserId != userId)
            return Forbid();

        if (booking.Status != "Pending")
            return BadRequest("Booking is not pending.");

        booking.Status = "active";
        await _context.SaveChangesAsync();
        return Ok(new { status = "active" });
    }
[HttpPost("{id}/complete")]
[Authorize]
public async Task<IActionResult> Complete(int id)
{
    var userId = int.Parse(User.FindFirstValue(System.Security.Claims.ClaimTypes.NameIdentifier));
    var booking = await _context.Bookings.FindAsync(id);
    if (booking == null)
        return NotFound();

    if (booking.UserId != userId)
        return Forbid();

    if (!string.Equals(booking.Status, "active", StringComparison.OrdinalIgnoreCase))
        return BadRequest("Booking is not active.");

    booking.Status = "completed";
    await _context.SaveChangesAsync();
    return Ok(new { status = "completed" });
}
}