using Microsoft.EntityFrameworkCore;
using Parking_Rental_Space.Data;
using Parking_Rental_Space.Data.Repositories;

namespace Parking_Rental_Space.Repositories
{
  public class BookingRepository : IRepository<Booking>
    {
        private readonly AppDbContext _context;
        public BookingRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<Booking>> GetAllAsync() => await _context.Bookings.Include(b => b.ParkingSpace).Include(b => b.User).ToListAsync();
        public async Task<Booking> GetByIdAsync(int id) => await _context.Bookings.Include(b => b.ParkingSpace).Include(b => b.User).FirstOrDefaultAsync(b => b.Id == id);
        public async Task AddAsync(Booking entity)
        {
            _context.Bookings.Add(entity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(Booking entity)
        {
            _context.Bookings.Update(entity);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var entity = await _context.Bookings.FindAsync(id);
            if (entity != null)
            {
                _context.Bookings.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}