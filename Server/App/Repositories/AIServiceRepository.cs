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



    public async Task<List<AiService>?> GetPendingServices()
    {
        var response = await _supabaseClient
                                .From<AiService>()
                                .Where(s => s.Status == "Pending")
                                .Get();

        var result = response.Models;
        return result;

    }

    public async Task<AiService?> UpdateStatus(AiService service)
    {
        var response = await _supabaseClient
                                .From<AiService>()
                                .Where(s => s.Id == service.Id)
                                .Update(service);

        var resultservice = response.Model;

        return resultservice;
    }

    public async Task<bool> DeleteServiceById(long id)
    {
        try
        {
            await _supabaseClient
                .From<AiService>()
                .Where(s => s.Id == id)
                .Delete();

            return true;
        }
        catch (Exception e)
        {
            Console.WriteLine($"Error deleting service: {e.Message}");
            return false;
        }
    }

}