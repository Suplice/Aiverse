
using Server.App.Models;
public interface IReviewsService
{
    Task<List<ResponseAIServiceDTO>?> GetUserReviewedServicesById(long id);
    List<Review>? GetReviews(long serviceId);
    Task<Review?> AddReview(RequestReviewDTO review);
}