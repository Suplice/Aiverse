
using Microsoft.AspNetCore.Mvc;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("likes")]
public class LikesController : ControllerBase
{

    private readonly ILikesService _ILikesService;

    public LikesController(ILikesService ILikesService)
    {
        _ILikesService = ILikesService;
    }


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