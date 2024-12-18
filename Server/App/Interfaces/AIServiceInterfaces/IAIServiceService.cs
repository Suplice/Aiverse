using Server.App.Models;

public interface IAIServiceService{

    Task<List<AiService>?> GetAllServices();
    Task<AiService?> GetServiceById(long serviceId);
    
}