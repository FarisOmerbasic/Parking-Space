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
        var user = await _context.Users.FindAsync(userId);
        var space = await _context.ParkingSpaces.FindAsync(dto.ParkingSpaceId);

        if (space == null || !space.IsAvailable)
            throw new InvalidOperationException("Space not available.");

        var owner = await _context.Users.FindAsync(space.OwnerId);
        if (owner == null)
            throw new InvalidOperationException("Owner not found.");

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
        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<List<BookingDto>> GetOwnerBookingsAsync(int ownerId)
    {
        return await _context.Bookings
            .Include(b => b.ParkingSpace)
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
            .ToListAsync();
    }

    public async Task<List<BookingDto>> GetMyBookingsAsync(int userId)
    {
        return await _context.Bookings
            .Include(b => b.ParkingSpace)
            .Where(b => b.UserId == userId)
            .Select(b => new BookingDto
            {
                Id = b.Id,
                ParkingSpaceId = b.ParkingSpaceId,
                ParkingSpaceName = b.ParkingSpace.SpaceName,
                StartTime = b.StartTime,
                Hours = b.Hours,
                TotalPrice = b.TotalPrice,
                Status = b.Status
            })
            .OrderByDescending(b => b.StartTime)
            .ToListAsync();
    }

    public async Task<List<BookingDto>> GetMyUpcomingBookingsAsync(int userId)
    {
        return await _context.Bookings
            .Where(b => b.UserId == userId && b.StartTime > DateTime.Now)
            .OrderBy(b => b.StartTime)
            .Take(5)
            .Include(b => b.ParkingSpace)
            .Select(b => new BookingDto
            {
                Id = b.Id,
                ParkingSpaceName = b.ParkingSpace.SpaceName,
                StartTime = b.StartTime,
                TotalPrice = b.TotalPrice
            })
            .ToListAsync();
    }

    public async Task<List<BookingDto>> GetRecentBookingsAsync(int userId)
    {
        return await _context.Bookings
            .Where(b => b.UserId == userId && b.StartTime <= DateTime.UtcNow)
            .OrderByDescending(b => b.StartTime)
            .Take(5)
            .Include(b => b.ParkingSpace)
            .Select(b => new BookingDto
            {
                Id = b.Id,
                ParkingSpaceName = b.ParkingSpace.SpaceName,
                StartTime = b.StartTime,
                TotalPrice = b.TotalPrice,
                Status = b.Status
            })
            .ToListAsync();
    }

    public async Task<decimal> GetBalanceAsync(int userId)
    {
        var user = await _context.Users.FindAsync(userId);
        return user?.Balance ?? 0;
    }

    public async Task<bool> TopUpBalanceAsync(int userId, decimal amount)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return false;

        user.Balance += amount;
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> CheckInAsync(int bookingId, int userId)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
        if (booking == null || booking.UserId != userId || booking.Status != "Pending")
            return false;

        booking.Status = "Active";
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> CompleteBookingAsync(int bookingId, int userId)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
        if (booking == null || booking.UserId != userId || booking.Status != "Active")
            return false;

        booking.Status = "Completed";
        await _context.SaveChangesAsync();
        return true;
    }
}