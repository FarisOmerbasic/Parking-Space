using System.ComponentModel.DataAnnotations.Schema; // Ensure this is present
using System.Collections.Generic; // Ensure this is present

namespace ParkingRentalSpace.Domain.Entities;

public class User
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public decimal Balance { get; set; }
    public DateTime CreatedAt { get; set; }
    public string? RefreshToken { get; set; } 
    public DateTime? RefreshTokenExpiryTime { get; set; }   
    public string Role { get; set; } = "User"; 

    public List<ParkingSpace> OwnedParkingSpaces { get; set; } = new();
    public List<Booking> Bookings { get; set; } = new();
}