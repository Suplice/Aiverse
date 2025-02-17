
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

/// <summary>
/// The <see cref="ReviewsController"/> class is responsible for handling operations related to reviews for AI services.
/// It provides endpoints for adding reviews, retrieving reviews for a specific service, and fetching services reviewed by a user.
/// </summary>
/// <remarks>
/// This controller manages user-generated reviews for AI services, allowing users to share their feedback and experiences.
/// It relies on the <see cref="IReviewsService"/> to perform the underlying logic for managing reviews.
/// The controller enforces role-based authorization, ensuring that only authenticated users with the "USER" role can add reviews.
/// </remarks>
[ApiController]
[Route("reviews")]
public class ReviewsController : ControllerBase
{

    private readonly IReviewsService _ReviewsService;

    /// <summary>
    /// Initializes a new instance of the <see cref="ReviewsController"/> class.
    /// </summary>
    /// <param name="ReviewsService">The service interface responsible for handling review-related operations.</param>
    /// <remarks>
    /// This constructor injects the <see cref="IReviewsService"/> dependency, which is used to manage the logic for adding and retrieving reviews.
    /// The service is essential for maintaining the integrity and accuracy of user reviews.
    /// </remarks>
    public ReviewsController(IReviewsService ReviewsService)
    {
        _ReviewsService = ReviewsService;
    }

    /// <summary>
    /// Adds a new review for an AI service.
    /// </summary>
    /// <param name="review">The data transfer object containing the review details, such as the user ID, service ID, and review text.</param>
    /// <returns>A response indicating success or failure of the review addition.</returns>
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

    /// <summary>
    /// Retrieves a list of AI services that have been reviewed by a specific user.
    /// </summary>
    /// <param name="id">The ID of the user whose reviewed services are to be retrieved.</param>
    /// <returns>A list of reviewed services or an error response if the operation fails.</returns>
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

    /// <summary>
    /// Retrieves all reviews for a specific AI service.
    /// </summary>
    /// <param name="serviceId">The ID of the AI service for which reviews are to be retrieved.</param>
    /// <returns>A list of reviews or an error response if the operation fails.</returns>
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