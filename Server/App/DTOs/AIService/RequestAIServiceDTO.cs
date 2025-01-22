

using System.ComponentModel.DataAnnotations;

public class RequestAIServiceDTO
{
    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public string FullDescription { get; set; }

    [Required]
    public string Price { get; set; }

    [Required]
    public IFormFile Image { get; set; }
}