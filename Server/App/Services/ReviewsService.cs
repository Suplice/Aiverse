
using Server.App.Models;

namespace Server.App.Services
{
    public class ReviewsService : IReviewsService
    {

        private readonly IReviewsRepository _ReviewsRepository;

        private readonly ICategoryRepository _CategoryRepository;

        public ReviewsService(IReviewsRepository ReviewsRepository, ICategoryRepository CategortRepository)
        {
            _CategoryRepository = CategortRepository;
            _ReviewsRepository = ReviewsRepository;
        }

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

        public List<Review>? GetReviews(long serviceId)
        {
            var result = _ReviewsRepository.GetReviews(serviceId);

            return result;
        }

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