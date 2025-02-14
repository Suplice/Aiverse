using Server.App.Models;
using Supabase;
public class LikesRepository : ILikesRepository
{
    private readonly Client _supabaseClient;
    private readonly AppDbContext _context;

    public LikesRepository(Client supabaseClient, AppDbContext context)
    {
        _supabaseClient = supabaseClient;
        _context = context;
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