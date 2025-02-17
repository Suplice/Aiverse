using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

/// <summary>
/// The <see cref="AIServiceService"/> class is responsible for handling business logic related to AI services.
/// It interacts with the <see cref="IAIServiceRepository"/> and <see cref="ICategoryRepository"/> to perform operations
/// such as retrieving all services, fetching a service by ID, adding a new service, updating service status, and deleting a service.
/// </summary>
/// <remarks>
/// This class acts as a service layer that encapsulates the business logic for AI services. It uses dependency injection
/// to interact with the repository layer and ensures that the data is processed and returned in the appropriate format.
/// </remarks>
public class AIServiceService : IAIServiceService
{

    private readonly IAIServiceRepository _AIServiceRepository;

    private readonly ICategoryRepository _CategoryRepository;

    /// <summary>
    /// Initializes a new instance of the <see cref="AIServiceService"/> class.
    /// </summary>
    /// <param name="AIServiceRepository">The repository for AI service-related operations.</param>
    /// <param name="CategortRepository">The repository for category-related operations.</param>
    /// <remarks>
    /// The constructor initializes the AI service repository and category repository, which are used for database interactions.
    /// </remarks>
    public AIServiceService(IAIServiceRepository AIServiceRepository, ICategoryRepository CategortRepository)
    {
        _CategoryRepository = CategortRepository;
        _AIServiceRepository = AIServiceRepository;
    }

    /// <inheritdoc/>
    public async Task<List<ResponseAIServiceDTO>?> GetAllServices()
    {

        var services = await _AIServiceRepository.GetAllServices();

        var result = new List<ResponseAIServiceDTO>();

        foreach (var service in services!)
        {
            var categoriesList = await _CategoryRepository.getCategoryByAi(service.Id);
            var responseAi = new ResponseAIServiceDTO
            {
                Id = service.Id,
                Title = service.Title,
                Description = service.Description,
                FullDescription = service.FullDescription,
                Price = service.Price,
                Image = service.Image,
                Stars = service.Stars,
                Reviews = service.Reviews,
                Status = service.Status,
                ServiceURL = service.ServiceURL,
                CreatedAt = service.CreatedAt,
                Categories = categoriesList,
                CreatorId = service.CreatorId
            };
            result.Add(responseAi);
        }

        return result;

    }

    /// <inheritdoc/>
    public async Task<AiService?> GetServiceById(long serviceId)
    {

        var result = await _AIServiceRepository.GetServiceById(serviceId);

        return result;
    }

    /// <inheritdoc/>
    public async Task<AiService?> AddNewService(RequestAIServiceDTO service, string filePath)
    {

        var newService = new AiService
        {
            CreatorId = service.CreatorId,
            Title = service.Title,
            Description = service.Description,
            FullDescription = service.FullDescription,
            Price = service.Price,
            Image = filePath,
            ServiceURL = service.ServiceURL,
            Stars = 0,
            Reviews = 0,
            Status = "Pending",
            CreatedAt = DateTime.Now
        };

        var result = await _AIServiceRepository.AddNewService(newService);

        return result;
    }

    /// <inheritdoc/>
    public async Task<AiService?> UpdateStatus(long serviceId)
    {

        var service = await _AIServiceRepository.GetServiceById(serviceId);

        if (service == null)
        {
            return null;
        }

        service.Status = "Verified";

        var result = await _AIServiceRepository.UpdateStatus(service);

        return result;

    }

    /// <inheritdoc/>
    public async Task<bool> DeleteServiceById(long id)
    {

        var result = await _AIServiceRepository.DeleteServiceById(id);

        return result;
    }

}