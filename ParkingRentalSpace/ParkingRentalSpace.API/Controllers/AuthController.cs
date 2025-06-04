using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ParkingRentalSpace.API.DTOs;
using ParkingRentalSpace.Application.DTOs;
using ParkingRentalSpace.Application.Services.Interfaces;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Infrastructure.Data;

namespace ParkingRentalSpace.API.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ITokenService _tokenService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(AppDbContext context, ITokenService tokenService, ILogger<AuthController> logger)
    {
        _context = context;
        _tokenService = tokenService;
        _logger = logger;
    }

    /// <summary>
    /// Register a new user.
    /// </summary>
    /// <param name="userDto">The user registration details.</param>
    /// <returns>Details of the registered user.</returns>
    [HttpPost("register")]
    [ProducesResponseType(typeof(ActionResult<UserDto?>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesErrorResponseType(typeof(void))]
    public async Task<IActionResult> Register(UserRegisterDto userDto)
    {
        try
        {
            _logger.LogDebug($"AuthController - {nameof(Register)} invoked. (userDto: {userDto})");

            if (await _context.Users.AnyAsync(u => u.Email == userDto.Email))
            {
                _logger.LogWarning($"User with email {userDto.Email} already exists.");
                return BadRequest("User already exists");
            }

            var user = new User
            {
                Email = userDto.Email,
                Name = userDto.Name,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(userDto.Password),
                Role = "User"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var token = _tokenService.GenerateJwtToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _context.SaveChangesAsync();

            SetTokenCookie(token, refreshToken);

            return Ok(new { user.Id, user.Email, user.Name, user.Role });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception in AuthController.Register");
            return StatusCode(500, "An error occurred while registering the user.");
        }
    }

    /// <summary>
    /// Login a user.
    /// </summary>
    /// <param name="userDto">The user login details.</param>
    /// <returns>Details of the logged-in user.</returns>
    [HttpPost("login")]
    [ProducesResponseType(typeof(ActionResult<UserDto?>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesErrorResponseType(typeof(void))]
    public async Task<IActionResult> Login(UserLoginDto userDto)
    {
        try
        {
            _logger.LogDebug($"AuthController - {nameof(Login)} invoked. (userDto: {userDto})");

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == userDto.Email);
            if (user == null || !BCrypt.Net.BCrypt.Verify(userDto.Password, user.PasswordHash))
            {
                _logger.LogWarning($"Invalid login attempt for email {userDto.Email}.");
                return Unauthorized("Invalid credentials");
            }

            var token = _tokenService.GenerateJwtToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _context.SaveChangesAsync();

            SetTokenCookie(token, refreshToken);

            return Ok(new { user.Id, user.Email, user.Name, user.Role });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception in AuthController.Login");
            return StatusCode(500, "An error occurred while logging in the user.");
        }
    }

    /// <summary>
    /// Refresh the JWT token.
    /// </summary>
    /// <returns>A new JWT token and refresh token.</returns>
    [HttpPost("refresh-token")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    [ProducesErrorResponseType(typeof(void))]
    public async Task<IActionResult> RefreshToken()
    {
        try
        {
            _logger.LogDebug($"AuthController - {nameof(RefreshToken)} invoked.");

            var refreshToken = Request.Cookies["refreshToken"];
            if (string.IsNullOrEmpty(refreshToken))
            {
                _logger.LogWarning("Refresh token is missing or invalid.");
                return Unauthorized("Invalid refresh token");
            }

            var user = await _context.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);
            if (user == null || user.RefreshTokenExpiryTime <= DateTime.UtcNow)
            {
                _logger.LogWarning("Refresh token is expired or invalid.");
                return Unauthorized("Invalid refresh token");
            }

            var newJwtToken = _tokenService.GenerateJwtToken(user);
            var newRefreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);

            await _context.SaveChangesAsync();

            SetTokenCookie(newJwtToken, newRefreshToken);

            return Ok(new { token = newJwtToken, refreshToken = newRefreshToken });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Exception in AuthController.RefreshToken");
            return StatusCode(500, "An error occurred while refreshing the token.");
        }
    }

    private void SetTokenCookie(string token, string refreshToken)
    {
        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(7)
        };

        Response.Cookies.Append("token", token, cookieOptions);
        Response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }
}