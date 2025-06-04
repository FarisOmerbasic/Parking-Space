using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/admin")]
[Authorize(Roles = "Admin")]
public class AdminController : ControllerBase
{
    private readonly IAdminService _adminService;
    private readonly ILogger<AdminController> _logger;

    public AdminController(IAdminService adminService, ILogger<AdminController> logger)
    {
        _adminService = adminService;
        _logger = logger;
    }

    /// <summary>
    /// Get all users.
    /// </summary>
    /// <returns>List of users with details.</returns>
    [HttpGet("users")]
    [ProducesResponseType(typeof(List<AdminUserDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllUsers()
    {
        try
        {
            _logger.LogInformation("Fetching all users.");
            var users = await _adminService.GetAllUsersAsync();
            return Ok(users);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching users.");
            return StatusCode(500, "An error occurred while fetching users.");
        }
    }

    /// <summary>
    /// Get all payments.
    /// </summary>
    /// <returns>List of payments with details.</returns>
    [HttpGet("payments")]
    [ProducesResponseType(typeof(List<PaymentRecordDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetAllPayments()
    {
        try
        {
            _logger.LogInformation("Fetching all payments.");
            var payments = await _adminService.GetAllPaymentsAsync();
            return Ok(payments);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching payments.");
            return StatusCode(500, "An error occurred while fetching payments.");
        }
    }

    /// <summary>
    /// Get all pending bookings.
    /// </summary>
    /// <returns>List of pending bookings.</returns>
    [HttpGet("pending-bookings")]
    [ProducesResponseType(typeof(List<BookingDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> GetPendingBookings()
    {
        try
        {
            _logger.LogInformation("Fetching pending bookings.");
            var bookings = await _adminService.GetPendingBookingsAsync();
            return Ok(bookings);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching pending bookings.");
            return StatusCode(500, "An error occurred while fetching pending bookings.");
        }
    }

    /// <summary>
    /// Approve a booking.
    /// </summary>
    /// <param name="id">Booking ID.</param>
    /// <returns>Success or failure message.</returns>
    [HttpPost("approve-booking/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> ApproveBooking(int id)
    {
        try
        {
            _logger.LogInformation($"Approving booking with ID {id}.");
            var success = await _adminService.ApproveBookingAsync(id);
            if (!success) return NotFound("Booking not found.");

            return Ok(new { message = "Booking approved." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error approving booking.");
            return StatusCode(500, "An error occurred while approving the booking.");
        }
    }

    /// <summary>
    /// Reject a booking.
    /// </summary>
    /// <param name="id">Booking ID.</param>
    /// <returns>Success or failure message.</returns>
    [HttpPost("reject-booking/{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> RejectBooking(int id)
    {
        try
        {
            _logger.LogInformation($"Rejecting booking with ID {id}.");
            var success = await _adminService.RejectBookingAsync(id);
            if (!success) return NotFound("Booking not found.");

            return Ok(new { message = "Booking rejected." });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error rejecting booking.");
            return StatusCode(500, "An error occurred while rejecting the booking.");
        }
    }
}