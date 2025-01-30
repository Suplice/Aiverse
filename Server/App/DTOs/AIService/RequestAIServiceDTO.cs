

using System.ComponentModel.DataAnnotations;

public class RequestAIServiceDTO
{
    [Required]
    public long CreatorId { get; set; }

    [Required]
    public string Title { get; set; }

    [Required]
    public string Description { get; set; }

    [Required]
    public string FullDescription { get; set; }

    [Required]
    public string Price { get; set; }

    [Required]
    public List<string> Categories { get; set; }

    [Required]
    public string ServiceURL { get; set; }

    [Required]
    public List<IFormFile> GalleryImages { get; set; }

    [Required]
    public IFormFile Image { get; set; }
}