namespace ParkingRentalSpace.Domain.Entities;
public class User
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public string Email { get; set; }
    public List<ParkingSpace> OwnedParkingSpaces { get; set; } = new();
    public List<Booking> Bookings { get; set; } = new();
}