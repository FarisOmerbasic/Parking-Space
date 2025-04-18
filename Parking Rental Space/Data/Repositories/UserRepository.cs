using Microsoft.EntityFrameworkCore;

namespace Parking_Rental_Space.Data.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly AppDbContext _context;
        public UserRepository(AppDbContext context) => _context = context;

        public async Task<IEnumerable<User>> GetAllAsync() => await _context.Users.Include(u => u.OwnedParkingSpaces).Include(u => u.Bookings).ToListAsync();
        public async Task<User> GetByIdAsync(int id) => await _context.Users.Include(u => u.OwnedParkingSpaces).Include(u => u.Bookings).FirstOrDefaultAsync(u => u.UserId == id);
        public async Task AddAsync(User entity)
        {
            _context.Users.Add(entity);
            await _context.SaveChangesAsync();
        }
        public async Task UpdateAsync(User entity)
        {
            _context.Users.Update(entity);
            await _context.SaveChangesAsync();
        }
        public async Task DeleteAsync(int id)
        {
            var entity = await _context.Users.FindAsync(id);
            if (entity != null)
            {
                _context.Users.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }
    }
}