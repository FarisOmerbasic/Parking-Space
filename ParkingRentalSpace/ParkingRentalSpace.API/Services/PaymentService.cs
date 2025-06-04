using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Data;
using ParkingRentalSpace.Infrastructure.Repositories;

namespace ParkingRentalSpace.Application.Services;

public class PaymentService : IPaymentService
{
    private readonly IRepository<Payment> _paymentRepo;
    private readonly IRepository<Booking> _bookingRepo;
    private readonly AppDbContext _context;

    public PaymentService(
        IRepository<Payment> paymentRepo,
        IRepository<Booking> bookingRepo,
        AppDbContext context)
    {
        _paymentRepo = paymentRepo;
        _bookingRepo = bookingRepo;
        _context = context;
    }

    public async Task<PaymentResponseDto> ProcessPaymentAsync(CreatePaymentDto dto)
    {
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));
        if (dto.BookingId <= 0)
            throw new ArgumentException("Invalid booking ID.", nameof(dto.BookingId));

        var booking = await _context.Bookings
            .Include(b => b.ParkingSpace)
            .FirstOrDefaultAsync(b => b.Id == dto.BookingId)
            ?? throw new KeyNotFoundException($"Booking with ID {dto.BookingId} not found.");

        if (booking.ParkingSpace == null)
            throw new InvalidOperationException("Parking space information missing for booking.");

        if (booking.Status != "Confirmed")
            throw new InvalidOperationException($"Cannot process payment for booking with status: {booking.Status}");

        var amount = CalculateAmount(booking);

        var payment = new Payment
        {
            BookingId = dto.BookingId,
            Amount = amount,
            PaidAt = DateTime.UtcNow,
            Status = "Completed"
        };

        booking.Status = "Paid";
        await _bookingRepo.UpdateAsync(booking);

        await _paymentRepo.AddAsync(payment);
        await _paymentRepo.SaveChangesAsync();

        return new PaymentResponseDto
        {
            Id = payment.Id,
            Amount = payment.Amount,
            Status = payment.Status,
            PaidAt = payment.PaidAt
        };
    }

    private decimal CalculateAmount(Booking booking)
    {
        if (booking?.ParkingSpace?.PricePerHour == null)
            throw new InvalidOperationException("Missing required data for payment calculation.");

        var duration = (booking.EndTime - booking.StartTime).TotalHours;
        if (duration <= 0)
            throw new InvalidOperationException("Booking duration must be greater than zero.");

        return (decimal)duration * booking.ParkingSpace.PricePerHour;
    }
}