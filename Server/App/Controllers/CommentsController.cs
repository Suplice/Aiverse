
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("comments")]
public class CommentsController : ControllerBase
{

    private readonly ICommentsService _ICommentsService;

    public CommentsController(ICommentsService ICommentsService)
    {
        _ICommentsService = ICommentsService;
    }

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