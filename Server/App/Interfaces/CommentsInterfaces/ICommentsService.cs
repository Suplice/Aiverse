using Server.App.Models;
public interface ICommentsService
{   
    /// <summary>
    /// Adds a new comment asynchronously.
    /// </summary>
    /// <param name="comment">The comment data to add, provided as a <see cref="RequestAddCommentDTO"/> object.</param>
    /// <returns>The added <see cref="Comment"/> object if successful; otherwise, null.</returns>
    /// <remarks>
    /// This method creates a new comment based on the provided data and sets default values for properties such as <see cref="Comment.HasReplies"/>, <see cref="Comment.CreatedAt"/>, <see cref="Comment.Likes"/>, and <see cref="Comment.Dislikes"/>.
    /// </remarks>
    Task<Comment?> AddComment(RequestAddCommentDTO comment);

    /// <summary>
    /// Retrieves all comments for a specific review.
    /// </summary>
    /// <param name="reviewId">The unique identifier of the review.</param>
    /// <returns>A list of <see cref="Comment"/> objects associated with the review if found; otherwise, null.</returns>
    /// <remarks>
    /// This method fetches all comments that are directly associated with the specified review.
    /// </remarks>
    List<Comment>? GetReviewComments(long reviewId);

    /// <summary>
    /// Retrieves all replies to a specific comment.
    /// </summary>
    /// <param name="commentId">The unique identifier of the parent comment.</param>
    /// <returns>A list of <see cref="Comment"/> objects representing replies to the comment if found; otherwise, null.</returns>
    /// <remarks>
    /// This method fetches all comments that are replies to the specified parent comment.
    /// </remarks>
    List<Comment>? GetCommentComments(long commentId);

}