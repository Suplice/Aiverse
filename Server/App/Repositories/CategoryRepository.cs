

using Server.App.Models;
using Supabase;

public class CategoryRepository : ICategoryRepository
{

    private readonly AppDbContext _context;
    private readonly Client _supabaseClient;

    public CategoryRepository(Client supabaseClient, AppDbContext context)
    {
        _supabaseClient = supabaseClient;
        _context = context;
    }

    public async Task<List<Category>?> getAllCategories()
    {

        try
        {
            var responseCategories = await _supabaseClient.From<Category>().Get();

            var categoriesList = responseCategories.Models;

            foreach (var Category in categoriesList)
            {
                Console.WriteLine(Category.Name);
            }

            return categoriesList;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }

    }

    public async Task<List<string>> getCategoryByAi(long serviceId)
    {

        var result = new List<string>();

        var response = await _supabaseClient.From<AiServicesCategories>().Where(c => c.AiServiceId == serviceId).Get();

        foreach (var catId in response.Models)
        {
            var category = await _supabaseClient.From<Category>().Where(c => c.Id == catId.CategoryId).Get();
            result.Add(category.Model.Name);
        }

        return result;
    }

    public async Task<AiServicesCategories?> AddAICategory(AiServicesCategories _aiServiceCategory)
    {
        try
        {
            var response = await _supabaseClient.From<AiServicesCategories>().Insert(_aiServiceCategory);
            Console.WriteLine(response.Model?.AiServiceId);
            return response.Model;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }
}