
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("reviews")]
public class ReviewsController : ControllerBase
{

    private readonly IReviewsService _ReviewsService;

    public ReviewsController(IReviewsService ReviewsService)
    {
        _ReviewsService = ReviewsService;
    }

    [AuthorizeByCookie("USER")]
    [HttpPost("AddReview")]
    public async Task<IActionResult> AddReview(RequestReviewDTO review)
    {

        try
        {
            var ReviewResult = await _ReviewsService.AddReview(review);

            if (ReviewResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<Review>(true, "Review added", ReviewResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    [HttpGet("reviewedServices/{id}")]
    public async Task<IActionResult> GetUserReviewedServicesById(long id)
    {

        if (id <= 0)
        {
            var response = new ApiResponse<bool>(false, "Service not exist", false);
            return BadRequest(response);
        }

        var ServiceResult = await _ReviewsService.GetUserReviewedServicesById(id);

        if (ServiceResult == null)
        {
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<List<ResponseAIServiceDTO>>(true, "Services found", ServiceResult);

        return Ok(correctResponse);


    }

    [HttpGet("getreviews/{serviceId}")]
    public IActionResult GetReviews(long serviceId)
    {
        try
        {
            var ReviewsResult = _ReviewsService.GetReviews(serviceId);

            if (ReviewsResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<List<Review>>(true, "Reviews found", ReviewsResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

}