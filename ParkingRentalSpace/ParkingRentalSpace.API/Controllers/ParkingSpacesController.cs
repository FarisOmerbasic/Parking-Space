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
            Location = s.Address,
            SpaceName = s.SpaceName,
            Description = s.Description,
            Price = s.PricePerHour,
            AvailableTimes = s.AvailableTimes,
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
            Location = space.Address,
            SpaceName = space.SpaceName,
            Description = space.Description,
            Price = space.PricePerHour,
            AvailableTimes = space.AvailableTimes,
            IsAvailable = space.IsAvailable
        });
    }

    [HttpGet("mine")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<ParkingSpaceResponseDto>>> GetMySpaces()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
        if (userIdClaim == null)
            return Unauthorized("User not authenticated.");

        int ownerId = int.Parse(userIdClaim.Value);

        var spaces = await _repo.GetAllAsync();
        var mySpaces = spaces
            .Where(space => space.OwnerId == ownerId)
            .Select(space => new ParkingSpaceResponseDto
            {
                Id = space.Id,
                Location = space.Address,
                SpaceName = space.SpaceName,
                Description = space.Description,
                Price = space.PricePerHour,
                AvailableTimes = space.AvailableTimes,
                IsAvailable = space.IsAvailable
            })
            .ToList();

        return Ok(mySpaces);
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
            SpaceName = dto.SpaceName,           // <-- FIXED: Save SpaceName
            Description = dto.Description,
            PricePerHour = dto.Price,
            AvailableTimes = dto.AvailableTimes, // <-- FIXED: Save AvailableTimes
            IsAvailable = true
        };

        await _repo.AddAsync(space);
        await _repo.SaveChangesAsync();

        return CreatedAtAction(nameof(GetParkingSpace), new { id = space.Id },
            new ParkingSpaceResponseDto
            {
                Id = space.Id,
                Location = space.Address,
                SpaceName = space.SpaceName,           // <-- FIXED: Return SpaceName
                Description = space.Description,
                Price = space.PricePerHour,
                AvailableTimes = space.AvailableTimes, // <-- FIXED: Return AvailableTimes
                IsAvailable = space.IsAvailable
            });
    }
    [HttpDelete("{id}")]
[Authorize]
public async Task<IActionResult> DeleteParkingSpace(int id)
{
    var space = await _repo.GetByIdAsync(id);
    if (space == null)
        return NotFound();

    // Optional: Only allow the owner to delete
    var userIdClaim = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier);
    if (userIdClaim == null || space.OwnerId != int.Parse(userIdClaim.Value))
        return Forbid();

    await _repo.DeleteAsync(space.Id);
    await _repo.SaveChangesAsync();
    return NoContent();
}
}