
using Server.App.Models;

public interface ICommentsRepository
{   
    /// <summary>
    /// Retrieves all replies to a specific comment.
    /// </summary>
    /// <param name="commentId">The unique identifier of the parent comment.</param>
    /// <returns>
    /// A list of <see cref="Comment"/> objects representing the replies if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method queries the application database context to retrieve all comments that are replies to the specified parent comment ID.
    /// If an exception occurs, it is logged, and the method returns null.
    /// </remarks>
    List<Comment>? GetCommentReplies(long commentId);

    /// <summary>
    /// Asynchronously adds a new comment to the database.
    /// </summary>
    /// <param name="comment">The <see cref="Comment"/> object containing the comment details to be added.</param>
    /// <returns>
    /// The added <see cref="Comment"/> object if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method inserts a new comment into the Supabase database. If the comment is a top-level comment (no parent),
    /// it updates the associated review to indicate that it has replies. If the comment is a reply to another comment,
    /// it updates the parent comment to indicate that it has replies. If an exception occurs, it is logged, and the method returns null.
    /// </remarks>
    Task<Comment?> AddComment(Comment comment);

    /// <summary>
    /// Retrieves all top-level comments for a specific review.
    /// </summary>
    /// <param name="reviewId">The unique identifier of the review.</param>
    /// <returns>
    /// A list of <see cref="Comment"/> objects if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method queries the application database context to retrieve all top-level comments (comments without a parent)
    /// associated with the specified review ID. If an exception occurs, it is logged, and the method returns null.
    /// </remarks>
    List<Comment>? GetReviewComments(long reviewId);

}