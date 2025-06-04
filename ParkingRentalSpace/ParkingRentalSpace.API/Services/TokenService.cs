using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using ParkingRentalSpace.Domain.Entities;
using ParkingRentalSpace.Application.Services.Interfaces;

namespace ParkingRentalSpace.Application.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;

    public TokenService(IConfiguration config)
    {
        _config = config;
    }

    public Task<string> GenerateJwtToken(User user)
    {
        if (user == null)
            throw new ArgumentNullException(nameof(user));
        if (string.IsNullOrWhiteSpace(user.Email))
            throw new Exception("User must have a valid email.");

        var tokenKey = _config["Jwt:Key"]
            ?? throw new InvalidOperationException("Jwt:Key is missing from appsettings.json");
        if (tokenKey.Length < 32)
            throw new InvalidOperationException("Jwt:Key must be at least 32 characters long");

        var expiryMinutesStr = _config["Jwt:ExpiryInMinutes"]
            ?? throw new Exception("Jwt:ExpiryInMinutes is missing from appsettings.json");
        if (!int.TryParse(expiryMinutesStr, out var expiryMinutes))
            throw new Exception("Jwt:ExpiryInMinutes must be a valid integer");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim("name", user.Name ?? string.Empty),
            new Claim(ClaimTypes.Role, user.Role ?? "User")
        };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddMinutes(expiryMinutes),
            Issuer = _config["Jwt:Issuer"],
            Audience = _config["Jwt:Audience"],
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return Task.FromResult(tokenHandler.WriteToken(token));
    }

    public string GenerateRefreshToken()
    {
        return Guid.NewGuid().ToString();
    }
}