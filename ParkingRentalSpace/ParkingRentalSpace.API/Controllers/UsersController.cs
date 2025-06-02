using Microsoft.AspNetCore.Authorization;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Repositories;
using Microsoft.AspNetCore.Mvc;
using BCrypt.Net;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/users")]
[Authorize(Roles = "Admin")]
public class UsersController : ControllerBase
{
    private readonly IRepository<User> _repo;

    public UsersController(IRepository<User> repo)
    {
        _repo = repo;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetUsers()
    {
        var users = await _repo.GetAllAsync();
        return Ok(users.Select(u => new UserDto
        {
            Id = u.Id,
            Name = u.Name,
            Email = u.Email,
            CreatedAt = u.CreatedAt // If you add this property
        }));
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserDto>> GetUser(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return NotFound();
        
        return Ok(new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email
        });
    }

    [HttpPost]
    [AllowAnonymous] // Only if you want to allow user creation without auth
    public async Task<ActionResult<UserDto>> CreateUser([FromBody] CreateUserDto dto)
    {
        var existingUser = await _repo.FindAsync(u => u.Email == dto.Email);
        if (existingUser != null)
            return Conflict("Email already in use");

        var user = new User
        {
            Name = dto.Name,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password), // Hash the password
            CreatedAt = DateTime.UtcNow // Optional
        };

        await _repo.AddAsync(user);
        await _repo.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, new UserDto
        {
            Id = user.Id,
            Name = user.Name,
            Email = user.Email
        });
    }

    // Add these new endpoints:
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(int id, [FromBody] UpdateUserDto dto)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return NotFound();

        user.Name = dto.Name;
        // Don't update email as it's used for auth
        await _repo.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var user = await _repo.GetByIdAsync(id);
        if (user == null) return NotFound();

      
        await _repo.SaveChangesAsync();

        return NoContent();
    }
}