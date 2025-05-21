using System.ComponentModel.DataAnnotations;

namespace ParkingRentalSpace.Domain.Entities;

public class User
{
    public int Id { get; set; }

    public decimal Balance { get; set; } 
    
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    
    [Required]
    public string PasswordHash { get; set; }
    
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
    
    // Navigation properties
    public ICollection<ParkingSpace> OwnedParkingSpaces { get; set; } = new List<ParkingSpace>();
    public ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}