using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

public class RequestRegisterDTO{

    [EmailAddress]
    [Required]
    public string Email { get; set;}

    [PasswordPropertyText]
    [Required]
    public string Password { get; set;}

    [PasswordPropertyText]
    [Required]
    public string ConfirmPassword { get; set;}

    [Required]
    public string Provider { get; set;}

    

}