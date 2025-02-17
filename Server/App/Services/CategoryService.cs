
using Server.App.Models;

namespace Server.App.Services
{

    /// <summary>
    /// Provides services for managing categories and AI service categories.
    /// This service interacts with the <see cref="ICategoryRepository"/> to perform database operations.
    /// </summary>
    /// <remarks>
    /// The <see cref="CategoryService"/> class is responsible for handling business logic related to categories,
    /// such as retrieving all categories or adding new AI service categories.
    /// </remarks>
    public class CategoryService : ICategoryService
    {

        private readonly ICategoryRepository _CategoryRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="CategoryService"/> class.
        /// </summary>
        /// <param name="categoryRepository">The repository used for category data access.</param>
        /// <remarks>
        /// This constructor injects the <see cref="ICategoryRepository"/> dependency, which is used to perform database operations.
        /// </remarks>
        public CategoryService(ICategoryRepository categoryRepository)
        {
            _CategoryRepository = categoryRepository;
        }

        /// <inheritdoc/>
        public async Task<List<Category>?> getAllCategories()
        {
            return await _CategoryRepository.getAllCategories();
        }

        /// <inheritdoc/>
        public async Task<AiServicesCategories?> addAiServiceCategory(AiServicesCategories _aiServicesCategories)
        {
            return await _CategoryRepository.AddAICategory(_aiServicesCategories);
        }


    }
}