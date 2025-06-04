using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Data;

namespace ParkingRentalSpace.Application.Services;

public class BookingService : IBookingService
{
    private readonly AppDbContext _context;

    public BookingService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<bool> CreateBookingAsync(CreateBookingDto dto, int userId)
    {
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));
        if (userId <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(userId));
        if (dto.ParkingSpaceId <= 0)
            throw new ArgumentException("Invalid parking space ID.", nameof(dto.ParkingSpaceId));
        if (dto.Hours <= 0)
            throw new ArgumentException("Booking hours must be greater than zero.", nameof(dto.Hours));

        var user = await _context.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException($"User with ID {userId} not found.");
        var space = await _context.ParkingSpaces.FindAsync(dto.ParkingSpaceId)
            ?? throw new KeyNotFoundException($"Parking space with ID {dto.ParkingSpaceId} not found.");

        if (!space.IsAvailable)
            throw new InvalidOperationException("Space is not available.");

        var owner = await _context.Users.FindAsync(space.OwnerId)
            ?? throw new KeyNotFoundException($"Owner with ID {space.OwnerId} not found.");

        var totalPrice = space.PricePerHour * dto.Hours;

        if (user.Balance < totalPrice)
            throw new InvalidOperationException("Insufficient balance.");

        user.Balance -= totalPrice;
        owner.Balance += totalPrice;

        var booking = new Booking
        {
            ParkingSpaceId = dto.ParkingSpaceId,
            UserId = userId,
            UserEmail = user.Email,
            StartTime = dto.StartTime,
            Hours = dto.Hours,
            TotalPrice = totalPrice,
            Status = "Pending"
        };

        _context.Bookings.Add(booking);
        var success = await _context.SaveChangesAsync() > 0;
        if (!success)
            throw new InvalidOperationException("Failed to create booking.");

        return true;
    }

    public async Task<List<BookingDto>> GetOwnerBookingsAsync(int ownerId)
    {
        if (ownerId <= 0)
            throw new ArgumentException("Invalid owner ID.", nameof(ownerId));

        var bookings = await _context.Bookings
            .Include(b => b.ParkingSpace)
            .Where(b => b.ParkingSpace.OwnerId == ownerId)
            .OrderByDescending(b => b.StartTime)
            .ToListAsync();

        return bookings.Select(b => new BookingDto
        {
            Id = b.Id,
            ParkingSpaceId = b.ParkingSpaceId,
            ParkingSpaceName = b.ParkingSpace.SpaceName,
            UserEmail = b.UserEmail,
            StartTime = b.StartTime,
            Hours = b.Hours,
            TotalPrice = b.TotalPrice
        }).ToList();
    }

    public async Task<List<BookingDto>> GetMyBookingsAsync(int userId)
    {
        if (userId <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(userId));

        var bookings = await _context.Bookings
            .Include(b => b.ParkingSpace)
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.StartTime)
            .ToListAsync();

        return bookings.Select(b => new BookingDto
        {
            Id = b.Id,
            ParkingSpaceId = b.ParkingSpaceId,
            ParkingSpaceName = b.ParkingSpace.SpaceName,
            StartTime = b.StartTime,
            Hours = b.Hours,
            TotalPrice = b.TotalPrice,
            Status = b.Status
        }).ToList();
    }

    public async Task<List<BookingDto>> GetMyUpcomingBookingsAsync(int userId)
    {
        if (userId <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(userId));

        var now = DateTime.Now;
        var bookings = await _context.Bookings
            .Where(b => b.UserId == userId && b.StartTime > now)
            .OrderBy(b => b.StartTime)
            .Take(5)
            .Include(b => b.ParkingSpace)
            .ToListAsync();

        return bookings.Select(b => new BookingDto
        {
            Id = b.Id,
            ParkingSpaceName = b.ParkingSpace.SpaceName,
            StartTime = b.StartTime,
            TotalPrice = b.TotalPrice
        }).ToList();
    }

    public async Task<List<BookingDto>> GetRecentBookingsAsync(int userId)
    {
        if (userId <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(userId));

        var now = DateTime.UtcNow;
        var bookings = await _context.Bookings
            .Where(b => b.UserId == userId && b.StartTime <= now)
            .OrderByDescending(b => b.StartTime)
            .Take(5)
            .Include(b => b.ParkingSpace)
            .ToListAsync();

        return bookings.Select(b => new BookingDto
        {
            Id = b.Id,
            ParkingSpaceName = b.ParkingSpace.SpaceName,
            StartTime = b.StartTime,
            TotalPrice = b.TotalPrice,
            Status = b.Status
        }).ToList();
    }

    public async Task<decimal> GetBalanceAsync(int userId)
    {
        if (userId <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(userId));

        var user = await _context.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException($"User with ID {userId} not found.");
        return user.Balance;
    }

    public async Task<bool> TopUpBalanceAsync(int userId, decimal amount)
    {
        if (userId <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(userId));
        if (amount <= 0)
            throw new ArgumentException("Amount must be greater than zero.", nameof(amount));

        var user = await _context.Users.FindAsync(userId)
            ?? throw new KeyNotFoundException($"User with ID {userId} not found.");

        user.Balance += amount;
        var success = await _context.SaveChangesAsync() > 0;
        if (!success)
            throw new InvalidOperationException("Failed to top up balance.");

        return true;
    }

    public async Task<bool> CheckInAsync(int bookingId, int userId)
    {
        if (bookingId <= 0)
            throw new ArgumentException("Invalid booking ID.", nameof(bookingId));
        if (userId <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(userId));

        var booking = await _context.Bookings.FindAsync(bookingId)
            ?? throw new KeyNotFoundException($"Booking with ID {bookingId} not found.");

        if (booking.UserId != userId)
            throw new InvalidOperationException("User does not own this booking.");

        if (booking.Status != "Pending")
            throw new InvalidOperationException("Booking is not in a pending state.");

        booking.Status = "Active";
        var success = await _context.SaveChangesAsync() > 0;
        if (!success)
            throw new InvalidOperationException("Failed to check in.");

        return true;
    }

    public async Task<bool> CompleteBookingAsync(int bookingId, int userId)
    {
        if (bookingId <= 0)
            throw new ArgumentException("Invalid booking ID.", nameof(bookingId));
        if (userId <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(userId));

        var booking = await _context.Bookings.FindAsync(bookingId)
            ?? throw new KeyNotFoundException($"Booking with ID {bookingId} not found.");

        if (booking.UserId != userId)
            throw new InvalidOperationException("User does not own this booking.");

        if (booking.Status != "Active")
            throw new InvalidOperationException("Booking is not active.");

        booking.Status = "Completed";
        var success = await _context.SaveChangesAsync() > 0;
        if (!success)
            throw new InvalidOperationException("Failed to complete booking.");

        return true;
    }
}