
using Microsoft.AspNetCore.Mvc;
using TaskManagementApp.Core.ApiResponse;

/// <summary>
/// The <see cref="LikesController"/> class is responsible for handling operations related to user likes and dislikes for AI services.
/// It provides endpoints for retrieving liked services by a user, liking a service, and disliking a service.
/// </summary>
/// <remarks>
/// This controller manages user interactions with AI services by allowing users to like or dislike specific services.
/// It relies on the <see cref="ILikesService"/> to perform the underlying logic for managing likes and dislikes.
/// The controller enforces role-based authorization, ensuring that only authenticated users with the "USER" role can access its endpoints.
/// </remarks>
[ApiController]
[Route("likes")]
public class LikesController : ControllerBase
{

    private readonly ILikesService _ILikesService;

    /// <summary>
    /// Initializes a new instance of the <see cref="LikesController"/> class.
    /// </summary>
    /// <param name="ILikesService">The service interface responsible for handling like and dislike operations.</param>
    /// <remarks>
    /// This constructor injects the <see cref="ILikesService"/> dependency, which is used to manage the logic for liking and disliking AI services.
    /// The service is essential for tracking user preferences and updating the state of liked services.
    /// </remarks>
    public LikesController(ILikesService ILikesService)
    {
        _ILikesService = ILikesService;
    }

    /// <summary>
    /// Retrieves a list of AI service IDs that have been liked by a specific user.
    /// </summary>
    /// <param name="userId">The ID of the user whose liked services are to be retrieved.</param>
    /// <returns>A list of liked service IDs or an error response if the operation fails.</returns>
    [AuthorizeByCookie("USER")]
    [HttpGet("likedbyuser/{userId}")]
    public IActionResult GetLikedServices(long userId)
    {
        try
        {
            var LikedServicesResult = _ILikesService.GetLikedServices(userId);

            if (LikedServicesResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<List<long>>(true, "Liked services found", LikedServicesResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }  

    /// <summary>
    /// Allows a user to like a specific AI service.
    /// </summary>
    /// <param name="likeService">The data transfer object containing the user ID and AI service ID.</param>
    /// <returns>A response indicating success or failure of the like operation.</returns>
    [AuthorizeByCookie("USER")]
    [HttpPost("likeService")]
    public async Task<IActionResult> LikeService(RequestLikeServiceDTO likeService)
    {

        try
        {
            var LikeResult = await _ILikesService.LikeService(likeService.UserId, likeService.AiServiceId);

            if (LikeResult == false)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<bool>(true, "Service liked", true);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    /// <summary>
    /// Allows a user to dislike a specific AI service.
    /// </summary>
    /// <param name="likeService">The data transfer object containing the user ID and AI service ID.</param>
    /// <returns>A response indicating success or failure of the dislike operation.</returns>
    [AuthorizeByCookie("USER")]
    [HttpPost("dislikeService")]
    public async Task<IActionResult> DislikeService(RequestLikeServiceDTO likeService)
    {

        try
        {
            var DislikeResult = await _ILikesService.DislikeService(likeService.UserId, likeService.AiServiceId);

            if (DislikeResult == false)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<bool>(true, "Service disliked", true);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

}