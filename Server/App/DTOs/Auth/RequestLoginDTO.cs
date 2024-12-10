
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

public class RequestLoginDTO {

    [EmailAddress]
    [Required]
    public string Email { get; set;}

    [PasswordPropertyText]
    [Required]
    public string Password { get; set; }

    [Required]
    public bool RememberMe { get; set; }

}