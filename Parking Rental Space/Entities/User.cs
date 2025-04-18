public class User{
    public int UserId {get; set ;}
    public string FullName {get; set;}
    public string Email {get; set;}


    public List<ParkingSpace> OwnedParkingSpaces {get; set;}
    public List<Booking> Bookings {get; set;}

}


