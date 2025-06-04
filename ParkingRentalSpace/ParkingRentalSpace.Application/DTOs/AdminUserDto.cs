public class AdminUserDto
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Email { get; set; }
    public decimal Balance { get; set; }
    public int ParkingSpacesCount { get; set; }
    public int BookingsCount { get; set; }
}