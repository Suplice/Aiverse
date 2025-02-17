using Server.App.Models;
public interface IReviewsRepository
{   
    /// <summary>
    /// Asynchronously adds a new review for an AI service.
    /// </summary>
    /// <param name="review">The <see cref="Review"/> object containing the review details to be added.</param>
    /// <returns>
    /// The added <see cref="Review"/> object if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method inserts a new review into the Supabase database and updates the associated AI service's rating and review count.
    /// It uses a transaction to ensure data consistency. If an exception occurs, the transaction is rolled back, and the method returns null.
    /// </remarks>
    Task<Review?> AddReview(Review review);

    /// <summary>
    /// Retrieves all reviews for a specific AI service.
    /// </summary>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>
    /// A list of <see cref="Review"/> objects if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method queries the application database context to retrieve all reviews associated with the specified AI service ID.
    /// If an exception occurs, it is logged, and the method returns null.
    /// </remarks>
    List<Review>? GetReviews(long serviceId);

    /// <summary>
    /// Asynchronously retrieves all AI services reviewed by a specific user.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <returns>
    /// A list of <see cref="AiService"/> objects if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method queries the Supabase database to retrieve all reviews by the specified user and then fetches the associated AI services.
    /// If no reviews are found or an exception occurs, the method returns null.
    /// </remarks>
    Task<List<AiService>?> GetUserReviewedServicesById(long id);
}