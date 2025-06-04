using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using ParkingRentalSpace.Infrastructure.Data;
using System.ComponentModel.DataAnnotations;

namespace ParkingRentalSpace.Application.Services;

public class AdminService : IAdminService
{
    private readonly AppDbContext _context;
    private readonly ILogger<AdminService> _logger;

    public AdminService(AppDbContext context, ILogger<AdminService> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<List<AdminUserDto>> GetAllUsersAsync()
    {
        _logger.LogDebug("AdminService - GetAllUsersAsync invoked");

        var users = await _context.Users.ToListAsync();
        if (users == null || !users.Any())
        {
            _logger.LogInformation("No users found.");
            return new List<AdminUserDto>();
        }

        var userDtos = new List<AdminUserDto>();
        foreach (var user in users)
        {
            var spacesCount = await _context.ParkingSpaces.CountAsync(p => p.OwnerId == user.Id);
            var bookingsCount = await _context.Bookings.CountAsync(b => b.UserId == user.Id);

            userDtos.Add(new AdminUserDto
            {
                Id = user.Id,
                UserName = user.Name,
                Email = user.Email,
                Balance = user.Balance,
                ParkingSpacesCount = spacesCount,
                BookingsCount = bookingsCount
            });
        }

        _logger.LogInformation("{Count} users retrieved.", userDtos.Count);
        return userDtos;
    }

    public async Task<List<PaymentRecordDto>> GetAllPaymentsAsync()
    {
        _logger.LogDebug("AdminService - GetAllPaymentsAsync invoked");

        var payments = await _context.Payments
            .Include(p => p.Booking)
            .ThenInclude(b => b.User)
            .OrderByDescending(p => p.PaidAt)
            .ToListAsync();

        if (payments == null || !payments.Any())
        {
            _logger.LogInformation("No payments found.");
            return new List<PaymentRecordDto>();
        }

        var paymentDtos = payments.Select(p => new PaymentRecordDto
        {
            Id = p.Id,
            UserId = p.Booking.UserId,
            UserName = p.Booking.User.Name,
            UserEmail = p.Booking.User.Email,
            Amount = p.Amount,
            PaymentDate = p.PaidAt,
            Description = $"Payment for booking #{p.BookingId}",
            Status = p.Status
        }).ToList();

        _logger.LogInformation("{Count} payments retrieved.", paymentDtos.Count);
        return paymentDtos;
    }

    public async Task<List<BookingDto>> GetPendingBookingsAsync()
    {
        _logger.LogDebug("AdminService - GetPendingBookingsAsync invoked");

        var bookings = await _context.Bookings
            .Include(b => b.User)
            .Include(b => b.ParkingSpace)
            .Where(b => b.Status == "Pending")
            .ToListAsync();

        if (bookings == null || !bookings.Any())
        {
            _logger.LogInformation("No pending bookings found.");
            return new List<BookingDto>();
        }

        var bookingDtos = bookings.Select(b => new BookingDto
        {
            Id = b.Id,
            ParkingSpaceId = b.ParkingSpace.Id,
            ParkingSpaceName = b.ParkingSpace.SpaceName,
            UserEmail = b.User.Email,
            UserName = b.User.Name,
            Status = b.Status,
            StartTime = b.StartTime,
            EndTime = b.EndTime,
            Hours = (int)(b.EndTime - b.StartTime).TotalHours,
            TotalPrice = b.TotalPrice
        }).ToList();

        _logger.LogInformation("{Count} pending bookings retrieved.", bookingDtos.Count);
        return bookingDtos;
    }

    public async Task<bool> ApproveBookingAsync(int bookingId)
    {
        if (bookingId <= 0)
            throw new ArgumentException("Invalid booking ID.", nameof(bookingId));

        _logger.LogDebug("AdminService - ApproveBookingAsync invoked (bookingId: {BookingId})", bookingId);

        var booking = await _context.Bookings.FindAsync(bookingId)
            ?? throw new KeyNotFoundException($"Booking with ID {bookingId} not found.");

        booking.Status = "Approved";
        var success = await _context.SaveChangesAsync() > 0;

        if (success)
            _logger.LogInformation("Booking with ID {BookingId} approved.", bookingId);
        else
            throw new InvalidOperationException($"Failed to approve booking with ID {bookingId}.");

        return success;
    }

    public async Task<bool> RejectBookingAsync(int bookingId)
    {
        if (bookingId <= 0)
            throw new ArgumentException("Invalid booking ID.", nameof(bookingId));

        _logger.LogDebug("AdminService - RejectBookingAsync invoked (bookingId: {BookingId})", bookingId);

        var booking = await _context.Bookings.FindAsync(bookingId)
            ?? throw new KeyNotFoundException($"Booking with ID {bookingId} not found.");

        booking.Status = "Rejected";
        var success = await _context.SaveChangesAsync() > 0;

        if (success)
            _logger.LogInformation("Booking with ID {BookingId} rejected.", bookingId);
        else
            throw new InvalidOperationException($"Failed to reject booking with ID {bookingId}.");

        return success;
    }
}