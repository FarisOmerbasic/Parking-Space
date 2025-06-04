using ParkingRentalSpace.Application.DTOs;

namespace ParkingRentalSpace.Application.Services.Interfaces;

public interface IBookingService
{
    Task<bool> CreateBookingAsync(CreateBookingDto dto, int userId);
    Task<List<BookingDto>> GetOwnerBookingsAsync(int ownerId);
    Task<List<BookingDto>> GetMyBookingsAsync(int userId);
    Task<List<BookingDto>> GetMyUpcomingBookingsAsync(int userId);
    Task<List<BookingDto>> GetRecentBookingsAsync(int userId);
    Task<decimal> GetBalanceAsync(int userId);
    Task<bool> TopUpBalanceAsync(int userId, decimal amount);
    Task<bool> CheckInAsync(int bookingId, int userId);
    Task<bool> CompleteBookingAsync(int bookingId, int userId);
}