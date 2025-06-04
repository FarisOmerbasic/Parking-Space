using Microsoft.AspNetCore.Mvc;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    /// <summary>
    /// Process a payment for a booking.
    /// </summary>
    /// <param name="dto">Payment details.</param>
    /// <returns>Details of the processed payment.</returns>
    [HttpPost]
    [ProducesResponseType(typeof(PaymentResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<ActionResult<PaymentResponseDto>> ProcessPayment([FromBody] CreatePaymentDto dto)
    {
        try
        {
            var paymentResponse = await _paymentService.ProcessPaymentAsync(dto);
            return Ok(paymentResponse);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Payment processing failed: {ex.Message}");
        }
    }
}