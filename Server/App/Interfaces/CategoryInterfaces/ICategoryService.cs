

using Server.App.Models;

public interface ICategoryService
{   
    /// <summary>
    /// Retrieves all categories asynchronously.
    /// </summary>
    /// <returns>A list of <see cref="Category"/> objects if found; otherwise, null.</returns>
    /// <remarks>
    /// This method fetches all available categories from the database.
    /// </remarks>
    Task<List<Category>?> getAllCategories();

    /// <summary>
    /// Adds a new AI service category asynchronously.
    /// </summary>
    /// <param name="_aiServicesCategories">The AI service category to add.</param>
    /// <returns>The added <see cref="AiServicesCategories"/> object if successful; otherwise, null.</returns>
    /// <remarks>
    /// This method adds a new AI service category to the database.
    /// </remarks>
    Task<AiServicesCategories?> addAiServiceCategory(AiServicesCategories _aiServicesCategories);
}