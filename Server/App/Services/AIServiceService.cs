using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

public class AIServiceService : IAIServiceService
{

    private readonly IAIServiceRepository _AIServiceRepository;

    public AIServiceService(IAIServiceRepository AIServiceRepository)
    {
        _AIServiceRepository = AIServiceRepository;
    }

    public async Task<List<AiService>?> GetAllServices()
    {

        var result = await _AIServiceRepository.GetAllServices();

        return result;

    }

    public async Task<AiService?> GetServiceById(long serviceId)
    {

        var result = await _AIServiceRepository.GetServiceById(serviceId);

        return result;
    }

    public async Task<AiService?> AddNewService(RequestAIServiceDTO service, string filePath)
    {

        var newService = new AiService
        {
            CreatorId = service.CreatorId,
            Title = service.Title,
            Description = service.Description,
            FullDescription = service.FullDescription,
            Price = service.Price,
            Image = filePath,
            ServiceURL = service.ServiceURL,
            Stars = 0,
            Reviews = 0,
            Status = "Pending",
            CreatedAt = DateTime.Now
        };

        var result = await _AIServiceRepository.AddNewService(newService);

        return result;
    }

    public async Task<Review?> AddReview(RequestReviewDTO review)
    {
        var newReview = new Review
        {
            CommentValue = review.CommentValue,
            UserId = review.UserId,
            Stars = review.Stars,
            AiServiceId = review.AiServiceId,
            CreatedAt = DateTime.Now,
            Likes = 0,
            Dislikes = 0,
            HasReplies = false
        };

        var result = await _AIServiceRepository.AddReview(newReview);

        return result;
    }

    public async Task<List<Review>?> GetReviews(long serviceId)
    {
        var result = await _AIServiceRepository.GetReviews(serviceId);

        return result;
    }

    public async Task<Comment?> AddComment(RequestAddCommentDTO comment)
    {
        var newComment = new Comment
        {
            CommentValue = comment.CommentValue,
            UserId = comment.UserId,
            ReviewId = comment.ReviewId,
            ParentId = comment.ParentId == 0 ? null : comment.ParentId,
            HasReplies = false,
            CreatedAt = DateTime.Now,
            Likes = 0,
            Dislikes = 0
        };

        var result = await _AIServiceRepository.AddComment(newComment);

        return result;
    }

    public List<Comment>? GetReviewComments(long reviewId)
    {
        var result = _AIServiceRepository.GetReviewComments(reviewId);

        return result;
    }

    public List<Comment>? GetCommentComments(long commentId)
    {
        var result = _AIServiceRepository.GetCommentReplies(commentId);

        return result;
    }


    public List<long>? GetLikedServices(long userId)
    {
        var result = _AIServiceRepository.GetLikedServices(userId);

        return result;
    }


    public async Task<List<AiService>?> GetUserReviewedServicesById(long id)
    {

        var result = await _AIServiceRepository.GetUserReviewedServicesById(id);

        return result;
    }

    public async Task<bool> LikeService(long userId, long serviceId)
    {
        var result = await _AIServiceRepository.LikeService(userId, serviceId);

        return result;
    }

    public async Task<bool> DislikeService(long userId, long reviewId)
    {
        var result = await _AIServiceRepository.DislikeService(userId, reviewId);

        return result;
    }

}