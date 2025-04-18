 public class Booking
    {
        public int Id { get; set; }
        public int ParkingSpaceId { get; set; }
        public int UserId { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsRecurring { get; set; }
        public string RecurrencePattern { get; set; }
        public string Status { get; set; }

        public ParkingSpace ParkingSpace { get; set; }
        public User User { get; set; }
        public Payment Payment { get; set; }
        public QrCheckin QrCheckin { get; set; }
    }