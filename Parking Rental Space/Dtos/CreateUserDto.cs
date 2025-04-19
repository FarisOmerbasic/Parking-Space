using System.ComponentModel.DataAnnotations;

public class CreateUserDto
{
    [Required]
    public string FullName { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

 

   
}