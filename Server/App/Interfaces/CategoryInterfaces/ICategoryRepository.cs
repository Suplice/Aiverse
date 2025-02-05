

using Server.App.Models;

public interface ICategoryRepository
{
    Task<List<Category>?> getAllCategories();
    Task<AiServicesCategories?> AddAICategory(AiServicesCategories _aiServiceCategory);

    Task<List<string>> getCategoryByAi(long serviceId);
}