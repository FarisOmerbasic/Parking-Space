public class PaymentRecordDto
{
    public int Id { get; set; }
    public string UserId { get; set; }
    public string UserEmail { get; set; }
    public decimal Amount { get; set; }
    public DateTime PaymentDate { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
}