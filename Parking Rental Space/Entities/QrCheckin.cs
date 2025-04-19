
    public class QrCheckin
    {
        public int Id { get; set; }

        public int BookingId { get; set; }

        public DateTime ScannedAt { get; set; } = DateTime.UtcNow;

        public Booking Booking { get; set; }
    }

