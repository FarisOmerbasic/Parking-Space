using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Parking_Rental_Space.Data;
using Parking_Rental_Space.DTOs;


namespace Parking_Rental_Space.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ListingController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ParkingSpaceDto>>> GetAllListings()
        {
            var listings = await _context.ParkingSpaces
                .Select(p => new ParkingSpaceDto
                {
                    Id = p.Id,
                    OwnerId = p.OwnerId,
                    Address = p.Address,
                    Description = p.Description,
                    PricePerHour = p.PricePerHour,
                    Lattittude = p.Lattittude,
                    Longitude = p.Longitude,
                    IsAvailable = p.IsAvailable
                }).ToListAsync();

            return Ok(listings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ParkingSpaceDto>> GetListingById(int id)
        {
            var p = await _context.ParkingSpaces.FindAsync(id);
            if (p == null) return NotFound();

            return Ok(new ParkingSpaceDto
            {
                Id = p.Id,
                OwnerId = p.OwnerId,
                Address = p.Address,
                Description = p.Description,
                PricePerHour = p.PricePerHour,
                Lattittude = p.Lattittude,
                Longitude = p.Longitude,
                IsAvailable = p.IsAvailable
            });
        }

        [HttpPost]
        public async Task<IActionResult> CreateListing(CreateBookingDto dto)
        {
            var space = new ParkingSpace
            {
                OwnerId = dto.OwnerId,
                Address = dto.Address,
                Description = dto.Description,
                PricePerHour = dto.PricePerHour,
                Lattittude = dto.Lattittude,
                Longitude = dto.Longitude,
                IsAvailable = true
            };

            _context.ParkingSpaces.Add(space);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Parking space created", space.Id });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateListing(int id, ParkingSpaceDto dto)
        {
            var space = await _context.ParkingSpaces.FindAsync(id);
            if (space == null) return NotFound();

            space.Address = dto.Address;
            space.Description = dto.Description;
            space.PricePerHour = dto.PricePerHour;
            space.Lattittude = dto.Lattittude;
            space.Longitude = dto.Longitude;
            space.IsAvailable = dto.IsAvailable;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteListing(int id)
        {
            var space = await _context.ParkingSpaces.FindAsync(id);
            if (space == null) return NotFound();

            _context.ParkingSpaces.Remove(space);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
