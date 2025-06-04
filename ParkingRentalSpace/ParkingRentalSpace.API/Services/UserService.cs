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
        return users.Select(u => new UserDto
        {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email,
            CreatedAt = u.CreatedAt
        });
    }

    public async Task<UserDto?> GetUserByIdAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return null;

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email
        };
    }

    public async Task<UserDto> CreateUserAsync(CreateUserDto dto)
    {
        var existingUser = await _repo.FindAsync(u => u.Email == dto.Email);
        if (existingUser != null)
            throw new InvalidOperationException("Email already in use");

        var user = new User
        {
            Name = dto.Name,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
            CreatedAt = DateTime.UtcNow
        };

        await _repo.AddAsync(user);
        await _repo.SaveChangesAsync();

        return new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email
        };
    }

    public async Task<bool> UpdateUserAsync(int id, UpdateUserDto dto)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return false;

        user.Name = dto.Name;
        await _repo.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteUserAsync(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return false;

        await _repo.DeleteAsync(user.Id);
        await _repo.SaveChangesAsync();

        return true;
    }
}