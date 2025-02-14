using Server.App.Models;
public interface ILikesRepository
{
    Task<bool> DislikeService(long userId, long serviceId);
    Task<bool> LikeService(long userId, long serviceId);
    List<long>? GetLikedServices(long userId);
}