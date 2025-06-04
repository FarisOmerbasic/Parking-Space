using ParkingRentalSpace.Domain.Entities;

namespace ParkingRentalSpace.Application.Services.Interfaces;

public interface ITokenService
{
    Task<string> GenerateJwtToken(User user);
    string GenerateRefreshToken();
}