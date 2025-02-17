using Server.App.Models;
using Supabase;

/// <summary>
/// The <see cref="LikesRepository"/> class is responsible for handling like-related database operations.
/// It interacts with the Supabase database and the application database context (<see cref="AppDbContext"/>) to perform operations
/// such as retrieving liked services, liking a service, and disliking a service.
/// </summary>
/// <remarks>
/// This class manages user likes for AI services. It allows users to like or dislike services and retrieves a list of services liked by a user.
/// Exceptions are handled internally, and methods return appropriate values (e.g., null, false) in case of errors.
/// </remarks>
public class LikesRepository : ILikesRepository
{
    private readonly Client _supabaseClient;
    private readonly AppDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="LikesRepository"/> class.
    /// </summary>
    /// <param name="supabaseClient">The Supabase client instance used for database operations.</param>
    /// <param name="context">The application database context (<see cref="AppDbContext"/>).</param>
    /// <remarks>
    /// The constructor initializes the Supabase client and the application database context, which are used for database interactions.
    /// </remarks>
    public LikesRepository(Client supabaseClient, AppDbContext context)
    {
        _supabaseClient = supabaseClient;
        _context = context;
    }

    /// <summary>
    /// Retrieves a list of service IDs liked by a specific user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <returns>
    /// A list of service IDs (as <see cref="long"/>) if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method queries the application database context to retrieve all service IDs liked by the specified user.
    /// If an exception occurs, it is logged, and the method returns null.
    /// </remarks>
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

    /// <summary>
    /// Asynchronously adds a like for a specific service by a user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>
    /// True if the operation is successful; otherwise, false.
    /// </returns>
    /// <remarks>
    /// This method inserts a new like into the Supabase database, associating the user with the liked service.
    /// If an exception occurs, it is logged, and the method returns false.
    /// </remarks>
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

    /// <summary>
    /// Asynchronously removes a like for a specific service by a user.
    /// </summary>
    /// <param name="userId">The unique identifier of the user.</param>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>
    /// True if the operation is successful; otherwise, false.
    /// </returns>
    /// <remarks>
    /// This method removes a like from the application database context, disassociating the user from the liked service.
    /// If the like is not found or an exception occurs, it is logged, and the method returns false.
    /// </remarks>
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