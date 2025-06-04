using ParkingRentalSpace.Application.DTOs;

namespace ParkingRentalSpace.Application.Services.Interfaces;

public interface IAdminService
{
    Task<List<AdminUserDto>> GetAllUsersAsync();
    Task<List<PaymentRecordDto>> GetAllPaymentsAsync();
    Task<List<BookingDto>> GetPendingBookingsAsync();
    Task<bool> ApproveBookingAsync(int bookingId);
    Task<bool> RejectBookingAsync(int bookingId);
}