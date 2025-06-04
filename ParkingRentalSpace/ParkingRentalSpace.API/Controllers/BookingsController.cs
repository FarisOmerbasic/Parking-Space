using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using System.Security.Claims;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/bookings")]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _bookingService;

    public BookingsController(IBookingService bookingService)
    {
        _bookingService = bookingService;
    }

    /// <summary>
    /// Create a new booking.
    /// </summary>
    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Book([FromBody] CreateBookingDto dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var success = await _bookingService.CreateBookingAsync(dto, userId);
        if (!success) return BadRequest("Failed to create booking.");
        return Ok(new { success = true });
    }

    /// <summary>
    /// Get bookings for the owner.
    /// </summary>
    [HttpGet("owner")]
    [Authorize]
    public async Task<IActionResult> GetOwnerBookings()
    {
        var ownerId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var bookings = await _bookingService.GetOwnerBookingsAsync(ownerId);
        return Ok(bookings);
    }

    /// <summary>
    /// Get bookings for the current user.
    /// </summary>
    [HttpGet("my")]
    [Authorize]
    public async Task<IActionResult> GetMyBookings()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var bookings = await _bookingService.GetMyBookingsAsync(userId);
        return Ok(bookings);
    }

    /// <summary>
    /// Get upcoming bookings for the current user.
    /// </summary>
    [HttpGet("my/upcoming")]
    [Authorize]
    public async Task<IActionResult> GetMyUpcomingBookings()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var bookings = await _bookingService.GetMyUpcomingBookingsAsync(userId);
        return Ok(bookings);
    }

    /// <summary>
    /// Get recent bookings for the current user.
    /// </summary>
    [HttpGet("my/recent")]
    [Authorize]
    public async Task<IActionResult> GetRecentBookings()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var bookings = await _bookingService.GetRecentBookingsAsync(userId);
        return Ok(bookings);
    }

    /// <summary>
    /// Get the balance for the current user.
    /// </summary>
    [HttpGet("balance")]
    [Authorize]
    public async Task<IActionResult> GetBalance()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var balance = await _bookingService.GetBalanceAsync(userId);
        return Ok(new { balance });
    }

    /// <summary>
    /// Top up the balance for the current user.
    /// </summary>
    [HttpPost("topup")]
    [Authorize]
    public async Task<IActionResult> TopUp([FromBody] decimal amount)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var success = await _bookingService.TopUpBalanceAsync(userId, amount);
        if (!success) return BadRequest("Failed to top up balance.");
        return Ok(new { success = true });
    }

    /// <summary>
    /// Check in for a booking.
    /// </summary>
    [HttpPost("{id}/checkin")]
    [Authorize]
    public async Task<IActionResult> CheckIn(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var success = await _bookingService.CheckInAsync(id, userId);
        if (!success) return BadRequest("Failed to check in.");
        return Ok(new { success = true });
    }

    /// <summary>
    /// Complete a booking.
    /// </summary>
    [HttpPost("{id}/complete")]
    [Authorize]
    public async Task<IActionResult> Complete(int id)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
        var success = await _bookingService.CompleteBookingAsync(id, userId);
        if (!success) return BadRequest("Failed to complete booking.");
        return Ok(new { success = true });
    }
}