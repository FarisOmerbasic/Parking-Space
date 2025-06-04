using ParkingRentalSpace.Application.DTOs;

namespace ParkingRentalSpace.Application.Services.Interfaces;

public interface IParkingSpaceService
{
    Task<IEnumerable<ParkingSpaceResponseDto>> GetAllParkingSpacesAsync();
    Task<ParkingSpaceResponseDto?> GetParkingSpaceByIdAsync(int id);
    Task<IEnumerable<ParkingSpaceResponseDto>> GetMyParkingSpacesAsync(int ownerId);
    Task<ParkingSpaceResponseDto> CreateParkingSpaceAsync(CreateParkingSpaceDto dto, int ownerId);
    Task<bool> DeleteParkingSpaceAsync(int id, int ownerId);
}