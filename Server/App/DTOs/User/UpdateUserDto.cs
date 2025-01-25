using System.ComponentModel.DataAnnotations;

public class UpdateEmailDto
{
    [Required]
    public long Id { get; set; }

    [Required]
    [EmailAddress(ErrorMessage = "The provided email is not a valid email address.")]
    public string Email { get; set; }
}