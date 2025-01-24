using Server.App.Models;

public interface IAIServiceRepository
{
    Task<AiService?> AddNewService(AiService service);
    Task<List<AiService>?> GetAllServices();
    Task<AiService?> GetServiceById(long serviceId);
    Task<Review?> AddReview(Review review);
    Task<List<Review>?> GetReviews(long serviceId);

}