using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;
using Supabase;

public class AIServiceRepository : IAIServiceRepository
{

    private readonly Client _supabaseClient;

    public AIServiceRepository(Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
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

}