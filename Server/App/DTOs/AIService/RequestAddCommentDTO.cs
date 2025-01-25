

using System.ComponentModel.DataAnnotations;

public class RequestAddCommentDTO
{
    [Required]
    public string CommentValue { get; set; }
    
    [Required]
    public long UserId { get; set; }

    [Required]
    public long ReviewId { get; set; }

    [Required]
    public long ParentId { get; set; }



}