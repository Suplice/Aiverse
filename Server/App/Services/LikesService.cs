
namespace Server.App.Services
{
    public class LikesService : ILikesService
    {

        private readonly ILikesRepository _LikesRepository;

        public LikesService(ILikesRepository LikesRepository)
        {
            _LikesRepository = LikesRepository;
        }
        public List<long>? GetLikedServices(long userId)
        {
            var result = _LikesRepository.GetLikedServices(userId);

            return result;
        }
        public async Task<bool> LikeService(long userId, long serviceId)
        {
            var result = await _LikesRepository.LikeService(userId, serviceId);

            return result;
        }
        public async Task<bool> DislikeService(long userId, long reviewId)
        {
            var result = await _LikesRepository.DislikeService(userId, reviewId);

            return result;
        }
    }
}