using ParkingRentalSpace.Application.DTOs;

namespace ParkingRentalSpace.Application.Services.Interfaces;

public interface IQrCheckinService
{
    Task<bool> ValidateCheckinAsync(ValidateQrDto dto);
}