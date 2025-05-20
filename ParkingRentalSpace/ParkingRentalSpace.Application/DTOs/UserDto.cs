public class UserDto
{
    public int Id { get; set; }
    public string Name { get; set; } // Changed from FullName to match your auth
    public string Email { get; set; }
    public DateTime? CreatedAt { get; set; } // Optional: Add useful metadata
}