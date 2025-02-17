using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

public class AIServiceService : IAIServiceService
{

    private readonly IAIServiceRepository _AIServiceRepository;

    private readonly ICategoryRepository _CategoryRepository;

    public AIServiceService(IAIServiceRepository AIServiceRepository, ICategoryRepository CategortRepository)
    {
        _CategoryRepository = CategortRepository;
        _AIServiceRepository = AIServiceRepository;
    }


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

    public async Task<AiService?> GetServiceById(long serviceId)
    {

        var result = await _AIServiceRepository.GetServiceById(serviceId);

        return result;
    }

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

    public async Task<bool> DeleteServiceById(long id)
    {

        var result = await _AIServiceRepository.DeleteServiceById(id);

        return result;
    }

}