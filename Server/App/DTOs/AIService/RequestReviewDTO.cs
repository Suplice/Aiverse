

using System.ComponentModel.DataAnnotations;

public class RequestReviewDTO
{
    [Required]
    public string CommentValue { get; set; }
    
    [Required]
    public long UserId { get; set; }

    [Required]
    public long Stars { get; set; }

    [Required]
    public long AiServiceId { get; set; }



}