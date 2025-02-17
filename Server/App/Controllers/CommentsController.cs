
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

/// <summary>
/// The <see cref="CommentsController"/> class is responsible for handling HTTP requests related to comments and their replies.
/// </summary>
/// <remarks>
/// This controller provides endpoints for adding comments to reviews, retrieving comments for a specific review,
/// fetching replies to a comment, and adding replies to existing comments. It relies on the <see cref="ICommentsService"/>
/// to perform the underlying business logic and data operations.
/// </remarks>
[ApiController]
[Route("comments")]
public class CommentsController : ControllerBase
{

    private readonly ICommentsService _ICommentsService;

    /// <summary>
    /// Initializes a new instance of the <see cref="CommentsController"/> class.
    /// </summary>
    /// <param name="ICommentsService">The service interface responsible for handling comment-related operations.</param>
    /// <remarks>
    /// This constructor injects the <see cref="ICommentsService"/> dependency, which is used to perform operations such as adding comments, retrieving comments, and managing replies.
    /// </remarks>
    public CommentsController(ICommentsService ICommentsService)
    {
        _ICommentsService = ICommentsService;
    }

    /// <summary>
    /// Adds a new comment to a review.
    /// </summary>
    /// <param name="comment">Comment data containing text and related review ID.</param>
    /// <returns>Returns the created comment if successful.</returns>
    [AuthorizeByCookie("USER")]
    [HttpPost("addComment")]
    public async Task<IActionResult> AddComment(RequestAddCommentDTO comment)
    {

        try
        {
            var CommentResult = await _ICommentsService.AddComment(comment);

            if (CommentResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<Comment>(true, "Comment added", CommentResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    /// <summary>
    /// Retrieves comments for a specific review.
    /// </summary>
    /// <param name="reviewId">The ID of the review.</param>
    /// <returns>Returns a list of comments associated with the review.</returns>
    [HttpGet("getReviewComments/{reviewId}")]
    public ActionResult GetReviewComments(long reviewId)
    {
        try
        {
            var CommentsResult = _ICommentsService.GetReviewComments(reviewId);

            if (CommentsResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<List<Comment>>(true, "Comments found", CommentsResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    /// <summary>
    /// Retrieves replies to a specific comment.
    /// </summary>
    /// <param name="commentId">The ID of the parent comment.</param>
    /// <returns>Returns a list of replies associated with the comment.</returns>
    [HttpGet("getCommentReplies/{commentId}")]
    public ActionResult GetCommentReplies(long commentId)
    {
        try
        {
            var RepliesResult = _ICommentsService.GetCommentComments(commentId);

            if (RepliesResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<List<Comment>>(true, "Replies found", RepliesResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    /// <summary>
    /// Adds a reply to an existing comment.
    /// </summary>
    /// <param name="comment">Reply data containing text and parent comment ID.</param>
    /// <returns>Returns the created reply if successful.</returns>
    [AuthorizeByCookie("USER")]
    [HttpPost("addCommentReply")]
    public async Task<IActionResult> AddCommentReply(RequestAddCommentDTO comment)
    {

        try
        {
            var CommentResult = await _ICommentsService.AddComment(comment);

            if (CommentResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<Comment>(true, "Comment added", CommentResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }
}