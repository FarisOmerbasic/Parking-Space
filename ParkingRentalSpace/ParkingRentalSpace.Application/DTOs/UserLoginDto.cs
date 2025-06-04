
using System.ComponentModel.DataAnnotations;

namespace ParkingRentalSpace.API.DTOs;

public class UserLoginDto
{
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}