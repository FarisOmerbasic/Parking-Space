using ParkingRentalSpace.Domain.Entities;

public class ParkingSpace
{
    public int Id { get; set; }
    public int OwnerId { get; set; }
    public User Owner { get; set; }
    public string Address { get; set; }
    public string SpaceName { get; set; } // <-- Add this
    public string Description { get; set; }
    public decimal PricePerHour { get; set; }
    public string AvailableTimes { get; set; } // <-- Add this
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public bool IsAvailable { get; set; }
    public List<Booking> Bookings { get; set; } = new();
}