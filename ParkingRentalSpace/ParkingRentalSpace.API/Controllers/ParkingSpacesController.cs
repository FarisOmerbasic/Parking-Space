using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using System.Security.Claims;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParkingSpacesController : ControllerBase
{
    private readonly IParkingSpaceService _service;

    public ParkingSpacesController(IParkingSpaceService service)
    {
        _service = service;
    }

    /// <summary>
    /// Get all parking spaces.
    /// </summary>
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<ParkingSpaceResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<ParkingSpaceResponseDto>>> GetParkingSpaces()
    {
        try
        {
            var spaces = await _service.GetAllParkingSpacesAsync();
            return Ok(spaces);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while fetching parking spaces: {ex.Message}");
        }
    }

    /// <summary>
    /// Get a specific parking space by ID.
    /// </summary>
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(ParkingSpaceResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ParkingSpaceResponseDto>> GetParkingSpace(int id)
    {
        try
        {
            var space = await _service.GetParkingSpaceByIdAsync(id);
            if (space == null) return NotFound($"Parking space with ID {id} not found.");
            return Ok(space);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while fetching the parking space: {ex.Message}");
        }
    }

    /// <summary>
    /// Get parking spaces owned by the current user.
    /// </summary>
    [HttpGet("mine")]
    [Authorize]
    [ProducesResponseType(typeof(IEnumerable<ParkingSpaceResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<IEnumerable<ParkingSpaceResponseDto>>> GetMySpaces()
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User not authenticated.");

            int ownerId = int.Parse(userIdClaim.Value);
            var spaces = await _service.GetMyParkingSpacesAsync(ownerId);
            return Ok(spaces);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while fetching your parking spaces: {ex.Message}");
        }
    }

    /// <summary>
    /// Create a new parking space.
    /// </summary>
    [HttpPost]
    [Authorize]
    [ProducesResponseType(typeof(ParkingSpaceResponseDto), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<ParkingSpaceResponseDto>> CreateParkingSpace([FromBody] CreateParkingSpaceDto dto)
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User not authenticated.");

            int ownerId = int.Parse(userIdClaim.Value);
            var space = await _service.CreateParkingSpaceAsync(dto, ownerId);
            return CreatedAtAction(nameof(GetParkingSpace), new { id = space.Id }, space);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while creating the parking space: {ex.Message}");
        }
    }

    /// <summary>
    /// Delete a parking space by ID.
    /// </summary>
    [HttpDelete("{id}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> DeleteParkingSpace(int id)
    {
        try
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
                return Unauthorized("User not authenticated.");

            int ownerId = int.Parse(userIdClaim.Value);
            var success = await _service.DeleteParkingSpaceAsync(id, ownerId);
            if (!success) return NotFound($"Parking space with ID {id} not found or unauthorized.");
            return NoContent();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred while deleting the parking space: {ex.Message}");
        }
    }
}