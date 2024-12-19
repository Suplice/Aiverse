using Server.App.Models;

public interface IAIServiceRepository {

    Task<List<AiService>?> GetAllServices();
    Task<AiService?> GetServiceById(long serviceId);
    
}