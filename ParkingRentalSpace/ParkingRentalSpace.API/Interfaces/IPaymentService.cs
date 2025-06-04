using ParkingRentalSpace.Application.DTOs;

namespace ParkingRentalSpace.Application.Services.Interfaces;

public interface IPaymentService
{
    Task<PaymentResponseDto> ProcessPaymentAsync(CreatePaymentDto dto);
}