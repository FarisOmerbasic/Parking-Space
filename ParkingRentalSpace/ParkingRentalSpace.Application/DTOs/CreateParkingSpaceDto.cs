namespace ParkingRentalSpace.Application.DTOs;
public class CreateParkingSpaceDto
{
    public int OwnerId { get; set; }
    public string Address { get; set; }
    public string Description { get; set; }
    public decimal PricePerHour { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}