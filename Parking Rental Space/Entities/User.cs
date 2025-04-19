public class User{
    public int UserId {get; set ;}
    public string FullName {get; set;}
    public string Email {get; set;}


    public virtual ICollection<ParkingSpace>? OwnedParkingSpaces { get; set; } = new List<ParkingSpace>();
    public virtual ICollection<Booking>? Bookings { get; set; } = new List<Booking>();
}


