
using Server.App.Models;

namespace Server.App.Services
{

    /// <summary>
    /// Provides services for managing reviews, including adding reviews, retrieving reviews for a service, and fetching reviewed services by a user.
    /// This service interacts with the <see cref="IReviewsRepository"/> and <see cref="ICategoryRepository"/> to perform database operations.
    /// </summary>
    /// <remarks>
    /// The <see cref="ReviewsService"/> class is responsible for handling business logic related to reviews,
    /// such as adding new reviews, retrieving reviews for a specific service, and fetching services reviewed by a specific user.
    /// </remarks>
    public class ReviewsService : IReviewsService
    {

        private readonly IReviewsRepository _ReviewsRepository;

        private readonly ICategoryRepository _CategoryRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="ReviewsService"/> class.
        /// </summary>
        /// <param name="ReviewsRepository">The repository used for review data access.</param>
        /// <param name="CategortRepository">The repository used for category data access.</param>
        /// <remarks>
        /// This constructor injects the <see cref="IReviewsRepository"/> and <see cref="ICategoryRepository"/> dependencies,
        /// which are used to perform database operations related to reviews and categories.
        /// </remarks>
        public ReviewsService(IReviewsRepository ReviewsRepository, ICategoryRepository CategortRepository)
        {
            _CategoryRepository = CategortRepository;
            _ReviewsRepository = ReviewsRepository;
        }

        /// <inheritdoc/>
        public async Task<Review?> AddReview(RequestReviewDTO review)
        {
            var newReview = new Review
            {
                CommentValue = review.CommentValue,
                UserId = review.UserId,
                Stars = review.Stars,
                AiServiceId = review.AiServiceId,
                CreatedAt = DateTime.Now,
                Likes = 0,
                Dislikes = 0,
                HasReplies = false
            };

            var result = await _ReviewsRepository.AddReview(newReview);

            return result;
        }

        /// <inheritdoc/>
        public List<Review>? GetReviews(long serviceId)
        {
            var result = _ReviewsRepository.GetReviews(serviceId);

            return result;
        }

        /// <inheritdoc/>
        public async Task<List<ResponseAIServiceDTO>?> GetUserReviewedServicesById(long id)
        {

            var data = await _ReviewsRepository.GetUserReviewedServicesById(id);

            var result = new List<ResponseAIServiceDTO>();

            foreach (var service in data!)
            {
                var categoriesList = await _CategoryRepository.getCategoryByAi(service.Id);
                var responseAi = new ResponseAIServiceDTO
                {
                    Id = service.Id,
                    Title = service.Title,
                    Description = service.Description,
                    FullDescription = service.FullDescription,
                    Price = service.Price,
                    Image = service.Image,
                    Stars = service.Stars,
                    Reviews = service.Reviews,
                    Status = service.Status,
                    ServiceURL = service.ServiceURL,
                    CreatedAt = service.CreatedAt,
                    Categories = categoriesList,
                    CreatorId = service.CreatorId
                };
                result.Add(responseAi);
            }


            return result;
        }


    }
}