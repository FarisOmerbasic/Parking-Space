using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Repositories;

namespace ParkingRentalSpace.Application.Services;

public class QrCheckinService : IQrCheckinService
{
    private readonly IRepository<QrCheckin> _repo;
    private readonly IRepository<Booking> _bookingRepo;

    public QrCheckinService(IRepository<QrCheckin> repo, IRepository<Booking> bookingRepo)
    {
        _repo = repo;
        _bookingRepo = bookingRepo;
    }

    public async Task<bool> ValidateCheckinAsync(ValidateQrDto dto)
    {
        var checkin = await _repo.GetByIdAsync(dto.CheckinId);
        if (checkin == null)
            throw new InvalidOperationException("Invalid QR code");

        var booking = await _bookingRepo.GetByIdAsync(checkin.BookingId);
        if (booking == null)
            throw new InvalidOperationException("Invalid booking");

        if (booking.Status != "Confirmed")
            throw new InvalidOperationException("Booking is not active");

        checkin.ScannedAt = DateTime.UtcNow;
        await _repo.SaveChangesAsync();

        return true;
    }
}