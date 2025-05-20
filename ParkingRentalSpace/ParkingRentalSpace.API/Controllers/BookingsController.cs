using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Repositories;
using QRCoder;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly IRepository<Booking> _repo;
    private readonly IRepository<ParkingSpace> _spaceRepo;
    private readonly IRepository<User> _userRepo;

    public BookingsController(
        IRepository<Booking> repo,
        IRepository<ParkingSpace> spaceRepo,
        IRepository<User> userRepo)
    {
        _repo = repo;
        _spaceRepo = spaceRepo;
        _userRepo = userRepo;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookingResponseDto>>> GetBookings()
    {
        var bookings = await _repo.GetAllAsync();
        return Ok(bookings.Select(b => MapToDto(b)));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BookingResponseDto>> GetBooking(int id)
    {
        var booking = await _repo.GetByIdAsync(id);
        if (booking == null) return NotFound();

        return Ok(MapToDto(booking));
    }

    [HttpPost]
    public async Task<ActionResult<BookingResponseDto>> CreateBooking([FromBody] CreateBookingDto dto)
    {
        var space = await _spaceRepo.GetByIdAsync(dto.ParkingSpaceId);
        var user = await _userRepo.GetByIdAsync(dto.UserId);

        if (space == null || user == null) return BadRequest("Invalid parking space or user");

        var booking = new Booking
        {
            ParkingSpaceId = dto.ParkingSpaceId,
            UserId = dto.UserId,
            StartTime = dto.StartTime,
            EndTime = dto.EndTime,
            IsRecurring = dto.IsRecurring,
            RecurrencePattern = dto.RecurrencePattern,
            Status = "Confirmed",
            QrCheckin = new QrCheckin
            {
                QrData = GenerateQrCode($"{dto.UserId}|{dto.ParkingSpaceId}|{DateTime.UtcNow.Ticks}")
            }
        };

        await _repo.AddAsync(booking);
        await _repo.SaveChangesAsync();

        return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, MapToDto(booking));
    }

    private string GenerateQrCode(string data)
    {
        var qrGenerator = new QRCodeGenerator();
        var qrCodeData = qrGenerator.CreateQrCode(data, QRCodeGenerator.ECCLevel.Q);
        return new Base64QRCode(qrCodeData).GetGraphic(20);
    }

    private BookingResponseDto MapToDto(Booking booking) => new()
    {
        Id = booking.Id,
        StartTime = booking.StartTime,
        EndTime = booking.EndTime,
        Status = booking.Status,
   
    };
}