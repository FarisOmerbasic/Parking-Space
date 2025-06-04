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
        if (spaces == null || !spaces.Any())
            return Enumerable.Empty<ParkingSpaceResponseDto>();

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

    public async Task<ParkingSpaceResponseDto> GetParkingSpaceByIdAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Invalid parking space ID.", nameof(id));

        var space = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Parking space with ID {id} not found.");

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
        if (ownerId <= 0)
            throw new ArgumentException("Invalid owner ID.", nameof(ownerId));

        var spaces = await _repo.GetAllAsync();
        var mySpaces = spaces.Where(space => space.OwnerId == ownerId).ToList();

        if (!mySpaces.Any())
            return Enumerable.Empty<ParkingSpaceResponseDto>();

        return mySpaces.Select(space => new ParkingSpaceResponseDto
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
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));
        if (ownerId <= 0)
            throw new ArgumentException("Invalid owner ID.", nameof(ownerId));
        if (string.IsNullOrWhiteSpace(dto.Location))
            throw new ArgumentException("Location is required.", nameof(dto.Location));
        if (string.IsNullOrWhiteSpace(dto.SpaceName))
            throw new ArgumentException("Space name is required.", nameof(dto.SpaceName));
        if (dto.Price <= 0)
            throw new ArgumentException("Price must be greater than zero.", nameof(dto.Price));
        if (string.IsNullOrWhiteSpace(dto.AvailableTimes))
            throw new ArgumentException("Available times are required.", nameof(dto.AvailableTimes));

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
        if (id <= 0)
            throw new ArgumentException("Invalid parking space ID.", nameof(id));
        if (ownerId <= 0)
            throw new ArgumentException("Invalid owner ID.", nameof(ownerId));

        var space = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"Parking space with ID {id} not found.");

        if (space.OwnerId != ownerId)
            throw new InvalidOperationException("You do not have permission to delete this parking space.");

        await _repo.DeleteAsync(space.Id);
        await _repo.SaveChangesAsync();

        return true;
    }
}