using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;
using Supabase;

public class AIServiceRepository : IAIServiceRepository
{

    private readonly Client _supabaseClient;
    private readonly AppDbContext _context;

    public AIServiceRepository(Client supabaseClient, AppDbContext context)
    {
        _supabaseClient = supabaseClient;
        _context = context;
    }

    public async Task<List<AiService>?> GetAllServices()
    {

        try
        {
            var responseServices = await _supabaseClient
                                            .From<AiService>()
                                            .Get();
            var servicesList = responseServices.Models;
            return servicesList;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    public async Task<AiService?> GetServiceById(long serviceId)
    {
        try
        {
            var responseService = await _supabaseClient
                                            .From<AiService>()
                                            .Where(s => s.Id == serviceId)
                                            .Get();
            return responseService.Model;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    public async Task<AiService?> AddNewService(AiService service)
    {
        try
        {
            var response = await _supabaseClient
                                    .From<AiService>()
                                    .Insert(service);
            return response.Model;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    public async Task<Review?> AddReview(Review review)
    {
        try
        {
            var response = await _supabaseClient
                                    .From<Review>()
                                    .Insert(review);
            return response.Model;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    public async Task<List<Review>?> GetReviews(long serviceId)
    {
        try
        {
            var response = await _supabaseClient
                                    .From<Review>()
                                    .Where(r => r.AiServiceId == serviceId)
                                    .Get();
            return response.Models;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    public async Task<Comment?> AddComment(Comment comment)
    {
        try
        {
            var response = await _supabaseClient
                                    .From<Comment>()
                                    .Insert(comment);

            var review = _context.Reviews.SingleOrDefault(r => r.Id == comment.ReviewId);     

            Console.WriteLine(review);                 

            if (review != null)
            {
                review.HasReplies = true;
                _context.Reviews.Update(review);
                await _context.SaveChangesAsync();
            }  else {
                throw new Exception("Review not found");
            }

             
            
            return response.Model;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    public List<Comment>? GetReviewComments(long reviewId)
    {
        try
        {
            var comments = _context.Comments.Where(c => c.ReviewId == reviewId && c.ParentId.Equals(null)).ToList();                                    
            return comments;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

}