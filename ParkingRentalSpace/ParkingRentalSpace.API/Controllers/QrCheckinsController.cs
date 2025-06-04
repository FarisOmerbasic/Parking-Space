using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class QrCheckinsController : ControllerBase
{
    private readonly IQrCheckinService _qrCheckinService;

    public QrCheckinsController(IQrCheckinService qrCheckinService)
    {
        _qrCheckinService = qrCheckinService;
    }

    /// <summary>
    /// Validate a QR code for check-in.
    /// </summary>
    /// <param name="dto">QR validation details.</param>
    /// <returns>Success or failure message.</returns>
    [HttpPost("validate")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> ValidateCheckin([FromBody] ValidateQrDto dto)
    {
        try
        {
            var success = await _qrCheckinService.ValidateCheckinAsync(dto);
            if (!success) return BadRequest("Validation failed");
            return Ok(new { message = "Check-in successful" });
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred during QR validation: {ex.Message}");
        }
    }
}