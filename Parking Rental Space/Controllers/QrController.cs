using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parking_Rental_Space.Data;


namespace Parking_Rental_Space.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QrController : ControllerBase
    {
        private readonly AppDbContext _context;

        public QrController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("booking/{bookingId}")]
        public async Task<ActionResult<QrCheckin>> GetQrByBookingId(int bookingId)
        {
            var qr = await _context.QrCheckins
                .FirstOrDefaultAsync(q => q.BookingId == bookingId);

            if (qr == null) return NotFound();

            return Ok(qr);
        }

        [HttpPost]
        public async Task<IActionResult> CreateQr(QrCheckin qr)
        {
            _context.QrCheckins.Add(qr);
            await _context.SaveChangesAsync();
            return Ok(new { message = "QR check-in created", qr.Id });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteQr(int id)
        {
            var qr = await _context.QrCheckins.FindAsync(id);
            if (qr == null) return NotFound();

            _context.QrCheckins.Remove(qr);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
