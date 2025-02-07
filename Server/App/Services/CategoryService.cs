
using Server.App.Models;

namespace Server.App.Services
{
    public class CategoryService : ICategoryService
    {

        private readonly ICategoryRepository _CategoryRepository;

        public CategoryService(ICategoryRepository categoryRepository)
        {
            _CategoryRepository = categoryRepository;
        }

        public async Task<List<Category>?> getAllCategories()
        {
            return await _CategoryRepository.getAllCategories();
        }

        public async Task<AiServicesCategories?> addAiServiceCategory(AiServicesCategories _aiServicesCategories)
        {
            return await _CategoryRepository.AddAICategory(_aiServicesCategories);
        }


    }
}