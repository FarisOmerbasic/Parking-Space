using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Repositories;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QrCheckinsController : ControllerBase
{
    private readonly IRepository<QrCheckin> _repo;
    private readonly IRepository<Booking> _bookingRepo;

    public QrCheckinsController(
        IRepository<QrCheckin> repo,
        IRepository<Booking> bookingRepo)
    {
        _repo = repo;
        _bookingRepo = bookingRepo;
    }

    [HttpPost("validate")]
    public async Task<IActionResult> ValidateCheckin([FromBody] ValidateQrDto dto)
    {
        var checkin = await _repo.GetByIdAsync(dto.CheckinId);
        if (checkin == null) return BadRequest("Invalid QR code");

        var booking = await _bookingRepo.GetByIdAsync(checkin.BookingId);
        if (booking == null) return BadRequest("Invalid booking");

        if (booking.Status != "Confirmed")
            return BadRequest("Booking is not active");

        checkin.ScannedAt = DateTime.UtcNow;
        await _repo.SaveChangesAsync();

        return Ok(new { message = "Check-in successful" });
    }
}