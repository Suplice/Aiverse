using Server.App.Models;

public interface IAIServiceRepository
{
    ///<summary>
    /// Adds a new AI service to the Supabase database.
    /// </summary>
    /// <param name="service">The <see cref="AiService"/> object to be added.</param>
    /// <returns>The added <see cref="AiService"/> object if successful; otherwise, null.</returns>
    Task<AiService?> AddNewService(AiService service);

    /// <summary>
    /// Retrieves all AI services from the Supabase database.
    /// </summary>
    /// <returns>A list of <see cref="AiService"/> objects if successful; otherwise, null.</returns>
    Task<List<AiService>?> GetAllServices();

    /// <summary>
    /// Retrieves a specific AI service by its unique identifier.
    /// </summary>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>The <see cref="AiService"/> object if found; otherwise, null.</returns>
    Task<AiService?> GetServiceById(long serviceId);

    /// <summary>
    /// Updates the status of an existing AI service in the Supabase database.
    /// </summary>
    /// <param name="service">The <see cref="AiService"/> object with updated status.</param>
    /// <returns>The updated <see cref="AiService"/> object if successful; otherwise, null.</returns>
    Task<AiService?> UpdateStatus(AiService service);

    /// <summary>
    /// Deletes an AI service by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the AI service to delete.</param>
    /// <returns>True if the deletion was successful; otherwise, false.</returns>
    Task<bool> DeleteServiceById(long id);

}