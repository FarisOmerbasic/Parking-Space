using Microsoft.AspNetCore.SignalR;

public class ParkingSpace{
  public int Id {get; set;}
  public int OwnerId{get; set;}
  public string Address {get; set;}
  public string Description{get; set;}
  public decimal PricePerHour {get; set;}
  public double Lattittude{get; set;}
  public double Longitude{get; set;}
  public bool IsAvailable{get; set;}


  public User Owner {get; set;}
  public List<Booking> Bookings {get; set;}


}