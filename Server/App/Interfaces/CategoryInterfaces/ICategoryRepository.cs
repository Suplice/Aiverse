

using Server.App.Models;

public interface ICategoryRepository
{   
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
    Task<List<Category>?> getAllCategories();

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
    Task<AiServicesCategories?> AddAICategory(AiServicesCategories _aiServiceCategory);

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
    Task<List<string>> getCategoryByAi(long serviceId);
}