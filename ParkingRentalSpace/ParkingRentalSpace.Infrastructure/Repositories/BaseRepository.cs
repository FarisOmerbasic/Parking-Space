using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Data;
using System.Linq.Expressions;

namespace ParkingRentalSpace.Infrastructure.Repositories;

public class BaseRepository<T> : IRepository<T> where T : class
{
    protected readonly AppDbContext _context;

    public BaseRepository(AppDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
    }

    public async Task<IEnumerable<T>> GetAllAsync() => await _context.Set<T>().ToListAsync();

    public async Task<IEnumerable<T>> GetAllAsync(
        Expression<Func<T, bool>> filter = null,
        Func<IQueryable<T>, IQueryable<T>> include = null)
    {
        IQueryable<T> query = _context.Set<T>();

        if (filter != null)
            query = query.Where(filter);

        if (include != null)
            query = include(query);

        return await query.ToListAsync();
    }

    public async Task<T> GetByIdAsync(int id) => await _context.Set<T>().FindAsync(id);

    public async Task<T> GetByIdAsync(int id, Func<IQueryable<T>, IQueryable<T>> include = null)
    {
        if (include == null)
            return await GetByIdAsync(id);

        var query = _context.Set<T>().AsQueryable();
        query = include(query);
        return await query.FirstOrDefaultAsync(e => EF.Property<int>(e, "Id") == id);
    }

    public async Task AddAsync(T entity)
    {
        await _context.Set<T>().AddAsync(entity);
    }

    public async Task UpdateAsync(T entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _context.Set<T>().Remove(entity);
        }
    }

    public async Task SaveChangesAsync() => await _context.SaveChangesAsync();
}