using Server.App.Models;
public interface ICommentsService
{
    Task<Comment?> AddComment(RequestAddCommentDTO comment);
    List<Comment>? GetReviewComments(long reviewId);
    List<Comment>? GetCommentComments(long commentId);

}