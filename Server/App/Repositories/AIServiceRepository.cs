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

            if(comment.ParentId == null) {
                var review = _context.Reviews.SingleOrDefault(r => r.Id == comment.ReviewId);    

                if (review != null)
                {
                    review.HasReplies = true;
                    _context.Reviews.Update(review);
                    await _context.SaveChangesAsync();
                }  else {
                    throw new Exception("Review not found");
                }

            } else {
                var parentComment = _context.Comments.SingleOrDefault(c => c.Id == comment.ParentId);

                if (parentComment != null)
                {
                    parentComment.HasReplies = true;
                    _context.Comments.Update(parentComment);
                    await _context.SaveChangesAsync();
                } else {
                    throw new Exception("Parent comment not found");
                }
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

    public List<Comment>? GetCommentReplies(long commentId)
    {
        try
        {
            var replies = _context.Comments.Where(c => c.ParentId == commentId).ToList();
            return replies;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    public List<long>? GetLikedServices(long userId)
    {
        try
        {
            var likedServices = _context.LikedServices.Where(ls => ls.UserId == userId).Select(ls => ls.AiServiceId).ToList();
            return likedServices;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    public async Task<bool> LikeService(long userId, long serviceId)
    {
        try
        {

            var likedService = new LikedServices
            {
                UserId = userId,
                AiServiceId = serviceId
            };



            var response = await _supabaseClient
                        .From<LikedServices>()
                        .Insert(likedService);


            
            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return false;
        }
    }

    public async Task<bool> DislikeService(long userId, long serviceId)
    {
        try
        {
            var likedService = _context.LikedServices.SingleOrDefault(ls => ls.UserId == userId && ls.AiServiceId == serviceId);

            if (likedService != null)
            {
                _context.LikedServices.Remove(likedService);
                await _context.SaveChangesAsync();
            }
            else
            {
                throw new Exception("Service not found");
            }

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return false;
        }
    }

}