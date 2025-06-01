using System.ComponentModel.DataAnnotations.Schema;


namespace ParkingRentalSpace.Domain.Entities
{
    public class Payment
    {
        public int Id { get; set; }
        public int BookingId { get; set; }

       
        public int UserId { get; set; } 

        public decimal Amount { get; set; }
        public DateTime PaidAt { get; set; }
        public string Status { get; set; } = string.Empty; 

        [ForeignKey("BookingId")]
        public virtual Booking Booking { get; set; } = null!;

        [ForeignKey("UserId")]
        public virtual User User { get; set; } = null!; 
    }
}