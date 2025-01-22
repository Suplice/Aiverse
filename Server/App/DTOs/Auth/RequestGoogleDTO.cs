using System.ComponentModel.DataAnnotations;

public class RequestGoogleDTO()
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }
    [Required]
    public string GivenName { get; set; }
}