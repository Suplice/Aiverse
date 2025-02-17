using Server.App.Models;

public interface IAIServiceService
{

    /// <summary>
    /// Asynchronously retrieves all AI services along with their associated categories.
    /// </summary>
    /// <returns>
    /// A list of <see cref="ResponseAIServiceDTO"/> objects representing the AI services and their categories if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method fetches all AI services from the repository and enriches each service with its associated categories.
    /// The result is returned as a list of <see cref="ResponseAIServiceDTO"/> objects.
    /// </remarks>
    Task<List<ResponseAIServiceDTO>?> GetAllServices();

    /// <summary>
    /// Asynchronously retrieves an AI service by its unique identifier.
    /// </summary>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>
    /// The <see cref="AiService"/> object if the service is found; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method fetches an AI service by its ID from the repository.
    /// </remarks>
    Task<AiService?> GetServiceById(long serviceId);

    /// <summary>
    /// Asynchronously adds a new AI service to the database.
    /// </summary>
    /// <param name="service">The <see cref="RequestAIServiceDTO"/> object containing the details of the new service.</param>
    /// <param name="filePath">The file path of the service's image.</param>
    /// <returns>
    /// The added <see cref="AiService"/> object if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method creates a new <see cref="AiService"/> object from the provided DTO and file path, then adds it to the repository.
    /// </remarks>
    Task<AiService?> AddNewService(RequestAIServiceDTO service, string filePath);

    /// <summary>
    /// Asynchronously updates the status of an AI service to "Verified".
    /// </summary>
    /// <param name="serviceId">The unique identifier of the AI service.</param>
    /// <returns>
    /// The updated <see cref="AiService"/> object if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method fetches the AI service by its ID, updates its status to "Verified", and saves the changes to the repository.
    /// </remarks>
    Task<AiService?> UpdateStatus(long serviceId);

    /// <summary>
    /// Asynchronously deletes an AI service by its unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the AI service.</param>
    /// <returns>
    /// True if the operation is successful; otherwise, false.
    /// </returns>
    /// <remarks>
    /// This method deletes the AI service with the specified ID from the repository.
    /// </remarks>
    Task<bool> DeleteServiceById(long id);
}