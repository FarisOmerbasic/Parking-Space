public class QrCheckin
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public DateTime ScannedAt { get; set; }
    public string QrData { get; set; }
    public Booking Booking { get; set; }
}