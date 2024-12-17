using Server.App.Models;

public interface IAIServiceService{

    Task<List<AiService>?> FindAllServices();
    
}