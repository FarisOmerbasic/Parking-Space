using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using ParkingRentalSpace.Infrastructure.Data;

namespace ParkingRentalSpace.Application.Services;

public class AdminService : IAdminService
{
    private readonly AppDbContext _context;

    public AdminService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<AdminUserDto>> GetAllUsersAsync()
    {
        var users = await _context.Users.ToListAsync();
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

        return userDtos;
    }

    public async Task<List<PaymentRecordDto>> GetAllPaymentsAsync()
    {
        return await _context.Payments
            .Include(p => p.Booking)
            .ThenInclude(b => b.User)
            .OrderByDescending(p => p.PaidAt)
            .Select(p => new PaymentRecordDto
            {
                Id = p.Id,
                UserId = p.Booking.UserId,
                UserName = p.Booking.User.Name,
                UserEmail = p.Booking.User.Email,
                Amount = p.Amount,
                PaymentDate = p.PaidAt,
                Description = $"Payment for booking #{p.BookingId}",
                Status = p.Status
            })
            .ToListAsync();
    }

    public async Task<List<BookingDto>> GetPendingBookingsAsync()
    {
        var bookings = await _context.Bookings
            .Include(b => b.User)
            .Include(b => b.ParkingSpace)
            .Where(b => b.Status == "Pending")
            .ToListAsync();

        return bookings.Select(b => new BookingDto
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
    }

    public async Task<bool> ApproveBookingAsync(int bookingId)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
        if (booking == null) return false;

        booking.Status = "Approved";
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RejectBookingAsync(int bookingId)
    {
        var booking = await _context.Bookings.FindAsync(bookingId);
        if (booking == null) return false;

        booking.Status = "Rejected";
        await _context.SaveChangesAsync();
        return true;
    }
}