using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

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
    [Authorize]
    public async Task<ActionResult<ParkingSpaceResponseDto>> CreateParkingSpace(
        [FromBody] CreateParkingSpaceDto dto)
    {
        // Get user id from JWT claims
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized("User not authenticated.");

        int ownerId = int.Parse(userIdClaim.Value);

        var space = new ParkingSpace
        {
            OwnerId = ownerId,
            Address = dto.Location,
            Description = dto.Description,
            PricePerHour = dto.Price,
            // Optionally: SpaceName = dto.SpaceName, AvailableTimes = dto.AvailableTimes
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