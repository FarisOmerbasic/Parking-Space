namespace ParkingRentalSpace.Application.DTOs;
public class CreateParkingSpaceDto
{
    public string Location { get; set; } = string.Empty;
    public string SpaceName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public decimal Price { get; set; }
    public string AvailableTimes { get; set; } = string.Empty;
}