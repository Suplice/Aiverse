using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;
using Supabase;

/// <summary>
/// Provides methods to interact with AI services stored in a Supabase database and a local AppDbContext.
/// This repository handles operations such as retrieving, adding, updating, and deleting AI services.
/// </summary>
/// <remarks>
/// The repository uses the Supabase client for database operations and an AppDbContext for local data management.
/// </remarks>
public class AIServiceRepository : IAIServiceRepository
{

    private readonly Client _supabaseClient;
    private readonly AppDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="AIServiceRepository"/> class.
    /// </summary>
    /// <param name="supabaseClient">The Supabase client instance used for database operations.</param>
    /// <param name="context">The application database context (<see cref="AppDbContext"/>).</param>
    /// <remarks>
    /// The constructor initializes the Supabase client and the application database context, which are used for database interactions.
    /// </remarks>
    public AIServiceRepository(Client supabaseClient, AppDbContext context)
    {
        _supabaseClient = supabaseClient;
        _context = context;
    }

    /// <inheritdoc/>
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
    
    /// <inheritdoc/>
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

    /// <inheritdoc/>
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

    /// <inheritdoc/>
    public async Task<AiService?> UpdateStatus(AiService service)
    {
        var response = await _supabaseClient
                                .From<AiService>()
                                .Where(s => s.Id == service.Id)
                                .Update(service);

        var resultservice = response.Model;

        return resultservice;
    }

    /// <inheritdoc/>
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