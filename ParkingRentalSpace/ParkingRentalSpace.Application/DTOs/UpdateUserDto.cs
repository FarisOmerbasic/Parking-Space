using System.ComponentModel.DataAnnotations;

public class UpdateUserDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
}