using Server.App.Models;
using Supabase;

/// <summary>
/// The <see cref="CategoryRepository"/> class is responsible for handling category-related database operations.
/// It interacts with the Supabase database to perform operations such as retrieving all categories, fetching categories by AI service ID,
/// and adding AI service categories.
/// </summary>
/// <remarks>
/// This class uses the Supabase client and an application database context (<see cref="AppDbContext"/>) for database interactions.
/// It is designed to manage categories and their associations with AI services. Exceptions are handled internally, and methods return null
/// or empty collections in case of errors.
/// </remarks>
public class CategoryRepository : ICategoryRepository
{

    private readonly AppDbContext _context;
    private readonly Client _supabaseClient;

    /// <summary>
    /// Initializes a new instance of the <see cref="CategoryRepository"/> class.
    /// </summary>
    /// <param name="supabaseClient">The Supabase client instance used for database operations.</param>
    /// <param name="context">The application database context (<see cref="AppDbContext"/>).</param>
    /// <remarks>
    /// The constructor initializes the Supabase client and the application database context, which are used for database interactions.
    /// </remarks>
    public CategoryRepository(Client supabaseClient, AppDbContext context)
    {
        _supabaseClient = supabaseClient;
        _context = context;
    }

    /// <summary>
    /// Asynchronously retrieves all categories from the database.
    /// </summary>
    /// <returns>
    /// A list of <see cref="Category"/> objects if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method queries the Supabase database to retrieve all categories. Each category's name is logged to the console.
    /// If an exception occurs during the operation, it is logged, and the method returns null.
    /// </remarks>
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

    /// <summary>
    /// Asynchronously retrieves category names associated with a specific AI service by its ID.
    /// </summary>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>
    /// A list of category names as strings if the operation is successful; otherwise, an empty list.
    /// </returns>
    /// <remarks>
    /// This method queries the Supabase database to find categories associated with the specified AI service ID.
    /// It retrieves the category names and returns them as a list of strings.
    /// If no categories are found or an exception occurs, an empty list is returned.
    /// </remarks>
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

    /// <summary>
    /// Asynchronously adds a new AI service category to the database.
    /// </summary>
    /// <param name="_aiServiceCategory">The <see cref="AiServicesCategories"/> object containing the AI service category details to be added.</param>
    /// <returns>
    /// The added <see cref="AiServicesCategories"/> object if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method inserts a new AI service category into the Supabase database.
    /// If the operation is successful, the added object is returned. If an exception occurs, it is logged, and the method returns null.
    /// </remarks>
    public async Task<AiServicesCategories?> AddAICategory(AiServicesCategories _aiServiceCategory)
    {
        try
        {
            var response = await _supabaseClient.From<AiServicesCategories>().Insert(_aiServiceCategory);
            return response.Model;
        }
        catch (Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }
}