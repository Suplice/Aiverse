using Server.App.Models;
using Supabase;

/// <summary>
/// The <see cref="CommentsRepository"/> class is responsible for handling comment-related database operations.
/// It interacts with the Supabase database and the application database context (<see cref="AppDbContext"/>) to perform operations
/// such as adding comments, retrieving comments for a review, and fetching replies to a comment.
/// </summary>
/// <remarks>
/// This class manages comments and their associations with reviews and parent comments. It updates the database to reflect
/// whether a review or comment has replies. Exceptions are handled internally, and methods return null or empty collections in case of errors.
/// </remarks>
public class CommentsRepository : ICommentsRepository
{
    private readonly AppDbContext _context;
    private readonly Client _supabaseClient;

    /// <summary>
    /// Initializes a new instance of the <see cref="CommentsRepository"/> class.
    /// </summary>
    /// <param name="supabaseClient">The Supabase client instance used for database operations.</param>
    /// <param name="context">The application database context (<see cref="AppDbContext"/>).</param>
    /// <remarks>
    /// The constructor initializes the Supabase client and the application database context, which are used for database interactions.
    /// </remarks>
    public CommentsRepository(Client supabaseClient, AppDbContext context)
    {
        _supabaseClient = supabaseClient;
        _context = context;
    }

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
    public async Task<Comment?> AddComment(Comment comment)
    {
        try
        {
            var response = await _supabaseClient
                                    .From<Comment>()
                                    .Insert(comment);

            if (comment.ParentId == null)
            {
                var review = _context.Reviews.SingleOrDefault(r => r.Id == comment.ReviewId);

                if (review != null)
                {
                    review.HasReplies = true;
                    _context.Reviews.Update(review);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("Review not found");
                }

            }
            else
            {
                var parentComment = _context.Comments.SingleOrDefault(c => c.Id == comment.ParentId);

                if (parentComment != null)
                {
                    parentComment.HasReplies = true;
                    _context.Comments.Update(parentComment);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    throw new Exception("Parent comment not found");
                }
            }

            return response.Model;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

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
    public List<Comment>? GetReviewComments(long reviewId)
    {
        try
        {
            var comments = _context.Comments.Where(c => c.ReviewId == reviewId && c.ParentId.Equals(null)).ToList();
            return comments;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

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
    public List<Comment>? GetCommentReplies(long commentId)
    {
        try
        {
            var replies = _context.Comments.Where(c => c.ParentId == commentId).ToList();
            return replies;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }
}