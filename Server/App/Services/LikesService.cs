
namespace Server.App.Services
{   
    /// <summary>
    /// Provides services for managing likes and dislikes on services and reviews.
    /// This service interacts with the <see cref="ILikesRepository"/> to perform database operations.
    /// </summary>
    /// <remarks>
    /// The <see cref="LikesService"/> class is responsible for handling business logic related to likes and dislikes,
    /// such as retrieving liked services, liking a service, or disliking a review.
    /// </remarks>
    public class LikesService : ILikesService
    {
        private readonly ILikesRepository _LikesRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="LikesService"/> class.
        /// </summary>
        /// <param name="LikesRepository">The repository used for likes and dislikes data access.</param>
        /// <remarks>
        /// This constructor injects the <see cref="ILikesRepository"/> dependency, which is used to perform database operations.
        /// </remarks>
        public LikesService(ILikesRepository LikesRepository)
        {
            _LikesRepository = LikesRepository;
        }

        /// <inheritdoc/>
        public List<long>? GetLikedServices(long userId)
        {
            var result = _LikesRepository.GetLikedServices(userId);

            return result;
        }

        /// <inheritdoc/>
        public async Task<bool> LikeService(long userId, long serviceId)
        {
            var result = await _LikesRepository.LikeService(userId, serviceId);

            return result;
        }

        /// <inheritdoc/>
        public async Task<bool> DislikeService(long userId, long reviewId)
        {
            var result = await _LikesRepository.DislikeService(userId, reviewId);

            return result;
        }
    }
}