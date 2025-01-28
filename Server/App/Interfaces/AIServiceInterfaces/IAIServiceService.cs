using Server.App.Models;

public interface IAIServiceService
{

    Task<List<AiService>?> GetAllServices();
    Task<AiService?> GetServiceById(long serviceId);

    Task<AiService?> AddNewService(RequestAIServiceDTO service, string filePath);
    Task<Review?> AddReview(RequestReviewDTO review);
    Task<List<Review>?> GetReviews(long serviceId);
    Task<Comment?> AddComment(RequestAddCommentDTO comment);
    List<Comment>? GetReviewComments(long reviewId);

    List<Comment>? GetCommentComments(long commentId);


    Task<List<AiService>?> GetUserReviewedServicesById(long id);
    List<long>? GetLikedServices(long userId);

    Task<bool> LikeService(long userId, long serviceId);
    Task<bool> DislikeService(long userId, long reviewId);
}