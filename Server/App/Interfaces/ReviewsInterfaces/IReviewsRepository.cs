using Server.App.Models;
public interface IReviewsRepository
{
    Task<Review?> AddReview(Review review);
    List<Review>? GetReviews(long serviceId);
    Task<List<AiService>?> GetUserReviewedServicesById(long id);
}