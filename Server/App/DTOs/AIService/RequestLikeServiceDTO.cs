using System.ComponentModel.DataAnnotations;

public class RequestLikeServiceDTO
{
    [Required]
    public long AiServiceId { get; set; }

    [Required]
    public long UserId { get; set; }
}
