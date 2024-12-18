using Server.App.Models;

public interface IAIServiceRepository {

    Task<List<AiService>?> GetAllServices();
    
}