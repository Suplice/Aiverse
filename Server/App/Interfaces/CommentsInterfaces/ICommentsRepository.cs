
using Server.App.Models;

public interface ICommentsRepository
{
    List<Comment>? GetCommentReplies(long commentId);
    Task<Comment?> AddComment(Comment comment);
    List<Comment>? GetReviewComments(long reviewId);

}