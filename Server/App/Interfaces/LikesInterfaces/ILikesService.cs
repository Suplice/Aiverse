
using Server.App.Models;
public interface ILikesService
{
    List<long>? GetLikedServices(long userId);
    Task<bool> LikeService(long userId, long serviceId);
    Task<bool> DislikeService(long userId, long reviewId);
}