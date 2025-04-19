using Microsoft.AspNetCore.Mvc;
using Parking_Rental_Space.Data.Repositories;
using Parking_Rental_Space.DTOs;
using Parking_Rental_Space;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Parking_Rental_Space.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IRepository<Booking> _bookingRepository;

        public BookingController(IRepository<Booking> bookingRepository)
        {
            _bookingRepository = bookingRepository;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            var bookings = await _bookingRepository.GetAllAsync();
            return Ok(bookings);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Booking>> GetBooking(int id)
        {
            var booking = await _bookingRepository.GetByIdAsync(id);
            if (booking == null)
                return NotFound();

            return Ok(booking);
        }

        
        [HttpPost]
        public async Task<ActionResult<Booking>> CreateBooking(Booking booking)
        {
            await _bookingRepository.AddAsync(booking);
            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBooking(int id, Booking booking)
        {
            if (id != booking.Id)
                return BadRequest();

            await _bookingRepository.UpdateAsync(booking);
            return NoContent();
        }

       
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            await _bookingRepository.DeleteAsync(id);
            return NoContent();
        }
    }
}
