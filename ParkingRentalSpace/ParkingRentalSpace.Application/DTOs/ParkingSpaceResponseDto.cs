public class ParkingSpaceResponseDto
{
    public int Id { get; set; }
    public string Location { get; set; }
    public string SpaceName { get; set; }
    public string Description { get; set; }
    public decimal Price { get; set; }
    public string AvailableTimes { get; set; }
    public bool IsAvailable { get; set; }
}