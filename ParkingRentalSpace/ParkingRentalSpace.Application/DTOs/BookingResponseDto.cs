public class BookingResponseDto
{
    public int Id { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public string Status { get; set; }
    public int ParkingSpaceId { get; set; }
    public int UserId { get; set; }
    public string QrCodeData { get; set; }
}