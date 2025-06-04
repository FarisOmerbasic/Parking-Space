using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Repositories;

namespace ParkingRentalSpace.Application.Services;

public class ParkingSpaceService : IParkingSpaceService
{
    private readonly IRepository<ParkingSpace> _repo;

    public ParkingSpaceService(IRepository<ParkingSpace> repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<ParkingSpaceResponseDto>> GetAllParkingSpacesAsync()
    {
        var spaces = await _repo.GetAllAsync();
        return spaces.Select(s => new ParkingSpaceResponseDto
        {
            Id = s.Id,
            Location = s.Address,
            SpaceName = s.SpaceName,
            Description = s.Description,
            Price = s.PricePerHour,
            AvailableTimes = s.AvailableTimes,
            IsAvailable = s.IsAvailable,
            OwnerId = s.OwnerId
        });
    }

    public async Task<ParkingSpaceResponseDto?> GetParkingSpaceByIdAsync(int id)
    {
        var space = await _repo.GetByIdAsync(id);
        if (space == null) return null;

        return new ParkingSpaceResponseDto
        {
            Id = space.Id,
            Location = space.Address,
            SpaceName = space.SpaceName,
            Description = space.Description,
            Price = space.PricePerHour,
            AvailableTimes = space.AvailableTimes,
            IsAvailable = space.IsAvailable,
            OwnerId = space.OwnerId
        };
    }

    public async Task<IEnumerable<ParkingSpaceResponseDto>> GetMyParkingSpacesAsync(int ownerId)
    {
        var spaces = await _repo.GetAllAsync();
        return spaces
            .Where(space => space.OwnerId == ownerId)
            .Select(space => new ParkingSpaceResponseDto
            {
                Id = space.Id,
                Location = space.Address,
                SpaceName = space.SpaceName,
                Description = space.Description,
                Price = space.PricePerHour,
                AvailableTimes = space.AvailableTimes,
                IsAvailable = space.IsAvailable,
                OwnerId = space.OwnerId
            });
    }

    public async Task<ParkingSpaceResponseDto> CreateParkingSpaceAsync(CreateParkingSpaceDto dto, int ownerId)
    {
        var space = new ParkingSpace
        {
            OwnerId = ownerId,
            Address = dto.Location,
            SpaceName = dto.SpaceName,
            Description = dto.Description,
            PricePerHour = dto.Price,
            AvailableTimes = dto.AvailableTimes,
            IsAvailable = true
        };

        await _repo.AddAsync(space);
        await _repo.SaveChangesAsync();

        return new ParkingSpaceResponseDto
        {
            Id = space.Id,
            Location = space.Address,
            SpaceName = space.SpaceName,
            Description = space.Description,
            Price = space.PricePerHour,
            AvailableTimes = space.AvailableTimes,
            IsAvailable = space.IsAvailable,
            OwnerId = space.OwnerId
        };
    }

    public async Task<bool> DeleteParkingSpaceAsync(int id, int ownerId)
    {
        var space = await _repo.GetByIdAsync(id);
        if (space == null || space.OwnerId != ownerId) return false;

        await _repo.DeleteAsync(space.Id);
        await _repo.SaveChangesAsync();
        return true;
    }
}