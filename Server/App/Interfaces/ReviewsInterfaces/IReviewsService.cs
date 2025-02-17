
using Server.App.Models;
public interface IReviewsService
{   
    /// <summary>
    /// Retrieves all services reviewed by a specific user, including their categories.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <returns>A list of <see cref="ResponseAIServiceDTO"/> objects representing the reviewed services if found; otherwise, null.</returns>
    /// <remarks>
    /// This method fetches all services reviewed by the specified user and enriches the response with category information.
    /// </remarks>
    Task<List<ResponseAIServiceDTO>?> GetUserReviewedServicesById(long id);

    /// <summary>
    /// Retrieves all reviews for a specific service.
    /// </summary>
    /// <param name="serviceId">The unique identifier of the service.</param>
    /// <returns>A list of <see cref="Review"/> objects associated with the service if found; otherwise, null.</returns>
    /// <remarks>
    /// This method fetches all reviews that are directly associated with the specified service.
    /// </remarks>
    List<Review>? GetReviews(long serviceId);

    /// <summary>
    /// Adds a new review asynchronously.
    /// </summary>
    /// <param name="review">The review data to add, provided as a <see cref="RequestReviewDTO"/> object.</param>
    /// <returns>The added <see cref="Review"/> object if successful; otherwise, null.</returns>
    /// <remarks>
    /// This method creates a new review based on the provided data and sets default values for properties such as <see cref="Review.CreatedAt"/>, <see cref="Review.Likes"/>, <see cref="Review.Dislikes"/>, and <see cref="Review.HasReplies"/>.
    /// </remarks>
    Task<Review?> AddReview(RequestReviewDTO review);
}