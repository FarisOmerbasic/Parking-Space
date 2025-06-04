using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Repositories;

namespace ParkingRentalSpace.Application.Services;

public class UserService : IUserService
{
    private readonly IRepository<User> _repo;

    public UserService(IRepository<User> repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<UserDto>> GetUsersAsync()
    {
        var users = await _repo.GetAllAsync();
        if (users == null || !users.Any())
            return Enumerable.Empty<UserDto>();

        return users.Select(u => new UserDto
        {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email,
            CreatedAt = u.CreatedAt
        });
    }

    public async Task<UserDto> GetUserByIdAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(id));

        var user = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"User with ID {id} not found.");

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            CreatedAt = user.CreatedAt
        };
    }

    public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
    {
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));
        if (string.IsNullOrWhiteSpace(dto.Name))
            throw new ArgumentException("Name is required.", nameof(dto.Name));
        if (string.IsNullOrWhiteSpace(dto.Email))
            throw new ArgumentException("Email is required.", nameof(dto.Email));
        if (string.IsNullOrWhiteSpace(dto.Password))
            throw new ArgumentException("Password is required.", nameof(dto.Password));

        var existingUser = await _repo.FindAsync(u => u.Email == dto.Email);
        if (existingUser != null)
            throw new InvalidOperationException("Email already in use.");

        var user = new User
        {
            Name = dto.Name,
            Email = dto.Email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            CreatedAt = DateTime.UtcNow
        };

        await _repo.AddAsync(user);
        await _repo.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email,
            CreatedAt = user.CreatedAt
        };
    }

    public async Task<bool> UpdateUserAsync(int id, UpdateUserDto dto)
    {
        if (id <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(id));
        if (dto == null)
            throw new ArgumentNullException(nameof(dto));
        if (string.IsNullOrWhiteSpace(dto.Name))
            throw new ArgumentException("Name is required.", nameof(dto.Name));

        var user = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"User with ID {id} not found.");

        user.Name = dto.Name;
        await _repo.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        if (id <= 0)
            throw new ArgumentException("Invalid user ID.", nameof(id));

        var user = await _repo.GetByIdAsync(id)
            ?? throw new KeyNotFoundException($"User with ID {id} not found.");

        await _repo.DeleteAsync(user.Id);
        await _repo.SaveChangesAsync();

        return true;
    }
}