using Server.App.Models;

public interface IAIServiceService
{

    Task<List<ResponseAIServiceDTO>?> GetAllServices();
    Task<AiService?> GetServiceById(long serviceId);
    Task<AiService?> AddNewService(RequestAIServiceDTO service, string filePath);
    Task<List<ResponseAIServiceDTO>?> GetPendingServices();
    Task<AiService?> UpdateStatus(long serviceId);
    Task<bool> DeleteServiceById(long id);
}