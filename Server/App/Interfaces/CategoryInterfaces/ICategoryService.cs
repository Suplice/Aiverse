

using Server.App.Models;

public interface ICategoryService
{
    Task<List<Category>?> getAllCategories();

    Task<AiServicesCategories?> addAiServiceCategory(AiServicesCategories _aiServicesCategories);
}