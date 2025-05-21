using ParkingRentalSpace.Domain.Entities;

public class Booking
{
    public int Id { get; set; }
    public int ParkingSpaceId { get; set; }
    public ParkingSpace ParkingSpace { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
    public string UserEmail { get; set; }
    public DateTime StartTime { get; set; }
    public int Hours { get; set; }
    public decimal TotalPrice { get; set; }

    // Add these properties:
    public string Status { get; set; } = "Pending"; // or "Active", "Completed", etc.
    public DateTime EndTime => StartTime.AddHours(Hours);

   

}