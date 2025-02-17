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

    /// <summary>
    /// Retrieves all AI services from the Supabase database.
    /// </summary>
    /// <returns>A list of <see cref="AiService"/> objects if successful; otherwise, null.</returns>
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
    
    /// <summary>
    /// Retrieves a specific AI service by its unique identifier.
    /// </summary>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>The <see cref="AiService"/> object if found; otherwise, null.</returns>
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

    /// <summary>
    /// Adds a new AI service to the Supabase database.
    /// </summary>
    /// <param name="service">The <see cref="AiService"/> object to be added.</param>
    /// <returns>The added <see cref="AiService"/> object if successful; otherwise, null.</returns>
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

    /// <summary>
    /// Updates the status of an existing AI service in the Supabase database.
    /// </summary>
    /// <param name="service">The <see cref="AiService"/> object with updated status.</param>
    /// <returns>The updated <see cref="AiService"/> object if successful; otherwise, null.</returns>
    public async Task<AiService?> UpdateStatus(AiService service)
    {
        var response = await _supabaseClient
                                .From<AiService>()
                                .Where(s => s.Id == service.Id)
                                .Update(service);

        var resultservice = response.Model;

        return resultservice;
    }

    /// <summary>
    /// Deletes an AI service by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the AI service to delete.</param>
    /// <returns>True if the deletion was successful; otherwise, false.</returns>
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