namespace Parking_Rental_Space.DTOs
{
    public class ParkingSpaceDto
    {
        public int Id { get; set; }
        public int OwnerId { get; set; }
        public string Address { get; set; }
        public string Description { get; set; }
        public decimal PricePerHour { get; set; }
        public double Lattittude { get; set; }
        public double Longitude { get; set; }
        public bool IsAvailable { get; set; }
    }
}
