using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Data;
using ParkingRentalSpace.Infrastructure.Repositories;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IRepository<Payment> _paymentRepo;
    private readonly IRepository<Booking> _bookingRepo;
    private readonly AppDbContext _context;

    public PaymentsController(
        IRepository<Payment> paymentRepo,
        IRepository<Booking> bookingRepo,
        AppDbContext context)
    {
        _paymentRepo = paymentRepo;
        _bookingRepo = bookingRepo;
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<PaymentResponseDto>> ProcessPayment([FromBody] CreatePaymentDto dto)
    {
        // Get booking with included ParkingSpace using direct DbContext access
        var booking = await _context.Bookings
            .Include(b => b.ParkingSpace)
            .FirstOrDefaultAsync(b => b.Id == dto.BookingId);

        if (booking == null)
            return NotFound("Booking not found");

        if (booking.ParkingSpace == null)
            return BadRequest("Parking space information missing for booking");

        if (booking.Status != "Confirmed")
            return BadRequest($"Cannot process payment for booking with status: {booking.Status}");

        try
        {
            // Calculate payment amount
            var amount = CalculateAmount(booking);

            var payment = new Payment
            {
                BookingId = dto.BookingId,
                Amount = amount,
                PaidAt = DateTime.UtcNow,
                Status = "Completed"
            };

            // Update booking status
            booking.Status = "Paid";
            await _bookingRepo.UpdateAsync(booking);

            await _paymentRepo.AddAsync(payment);
            await _paymentRepo.SaveChangesAsync();

            return Ok(new PaymentResponseDto
            {
                Id = payment.Id,
                Amount = payment.Amount,
                Status = payment.Status,
                PaidAt = payment.PaidAt
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Payment processing failed: {ex.Message}");
        }
    }

    private decimal CalculateAmount(Booking booking)
    {
        if (booking?.ParkingSpace?.PricePerHour == null)
            throw new InvalidOperationException("Missing required data for payment calculation");

        var duration = (booking.EndTime - booking.StartTime).TotalHours;
        return (decimal)duration * booking.ParkingSpace.PricePerHour;
    }
}