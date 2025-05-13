public class CreateBookingDto
{
    public int ParkingSpaceId { get; set; }
    public int UserId { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsRecurring { get; set; }
    // Make this optional with default value
    public string RecurrencePattern { get; set; } = string.Empty;
}