using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Repositories;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParkingSpacesController : ControllerBase
{
    private readonly IRepository<ParkingSpace> _repo;

    public ParkingSpacesController(IRepository<ParkingSpace> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ParkingSpaceResponseDto>>> GetParkingSpaces()
    {
        var spaces = await _repo.GetAllAsync();
        return Ok(spaces.Select(s => new ParkingSpaceResponseDto
        {
            Id = s.Id,
            Address = s.Address,
            Description = s.Description,
            PricePerHour = s.PricePerHour,
            Latitude = s.Latitude,
            Longitude = s.Longitude,
            IsAvailable = s.IsAvailable
        }));
    }

    // Add this missing endpoint
    [HttpGet("{id}")]
    public async Task<ActionResult<ParkingSpaceResponseDto>> GetParkingSpace(int id)
    {
        var space = await _repo.GetByIdAsync(id);
        if (space == null) return NotFound();

        return Ok(new ParkingSpaceResponseDto
        {
            Id = space.Id,
            Address = space.Address,
            Description = space.Description,
            PricePerHour = space.PricePerHour,
            Latitude = space.Latitude,
            Longitude = space.Longitude,
            IsAvailable = space.IsAvailable
        });
    }

    [HttpPost]
    public async Task<ActionResult<ParkingSpaceResponseDto>> CreateParkingSpace(
        [FromBody] CreateParkingSpaceDto dto)
    {
        var space = new ParkingSpace
        {
            OwnerId = dto.OwnerId,
            Address = dto.Address,
            Description = dto.Description,
            PricePerHour = dto.PricePerHour,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            IsAvailable = true
        };

        await _repo.AddAsync(space);
        await _repo.SaveChangesAsync(); 

        return CreatedAtAction(nameof(GetParkingSpace), new { id = space.Id },
            new ParkingSpaceResponseDto
            {
                Id = space.Id,
                Address = space.Address,
                Description = space.Description,
                PricePerHour = space.PricePerHour,
                Latitude = space.Latitude,
                Longitude = space.Longitude,
                IsAvailable = space.IsAvailable
            });
    }
}