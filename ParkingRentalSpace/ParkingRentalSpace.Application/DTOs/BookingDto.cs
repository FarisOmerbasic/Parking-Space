public class BookingDto
{
    public int Id { get; set; }

    public int ParkingSpaceId { get; set; }
    public string ParkingSpaceName { get; set; }
    public string UserEmail { get; set; }
    public DateTime StartTime { get; set; }

    public DateTime EndTime { get; set; }
    public int Hours { get; set; }
    public decimal TotalPrice { get; set; }


}