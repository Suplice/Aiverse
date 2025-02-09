using Server.App.Models;

public interface IAIServiceRepository
{
    Task<AiService?> AddNewService(AiService service);
    Task<List<AiService>?> GetAllServices();
    Task<AiService?> GetServiceById(long serviceId);
    Task<Review?> AddReview(Review review);
    List<Review>? GetReviews(long serviceId);
    Task<Comment?> AddComment(Comment comment);
    List<Comment>? GetReviewComments(long reviewId);
    List<Comment>? GetCommentReplies(long commentId);
    Task<List<AiService>?> GetUserReviewedServicesById(long id);
    List<long>? GetLikedServices(long userId);
    Task<bool> LikeService(long userId, long serviceId);
    Task<bool> DislikeService(long userId, long serviceId);
    Task<List<AiService>?> GetPendingServices();
    Task<AiService?> UpdateStatus(AiService service);

}