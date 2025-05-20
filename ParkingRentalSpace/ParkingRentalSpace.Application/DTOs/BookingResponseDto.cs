public class BookingResponseDto
{
    public int Id { get; set; }
    public string Location { get; set; }
    public string Spot { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public decimal Price { get; set; }
    public string Status { get; set; }
}