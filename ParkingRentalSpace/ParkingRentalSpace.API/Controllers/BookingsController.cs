using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Data;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly AppDbContext _context;

    public BookingsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Book([FromBody] CreateBookingDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var userEmail = User.FindFirstValue(ClaimTypes.Email);

        var space = await _context.ParkingSpaces.FindAsync(dto.ParkingSpaceId);
        if (space == null || !space.IsAvailable)
            return BadRequest("Space not available.");

        var totalPrice = space.PricePerHour * dto.Hours;

        var booking = new Booking
        {
            ParkingSpaceId = dto.ParkingSpaceId,
            UserId = userId,
            UserEmail = userEmail,
            StartTime = dto.StartTime,
            Hours = dto.Hours,
            TotalPrice = totalPrice
        };

        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        return Ok(new { success = true });
    }

    // Get bookings for owner dashboard
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

    [HttpGet("my")]
[Authorize]
public IActionResult GetMyBookings()
{
    var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
    var bookings = _context.Bookings
        .Where(b => b.UserId == userId)
        .Select(b => new {
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
}