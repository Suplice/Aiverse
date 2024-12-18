using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

public class AIServiceService: IAIServiceService {

    private readonly IAIServiceRepository _AIServiceRepository;

    public AIServiceService(IAIServiceRepository AIServiceRepository){
        _AIServiceRepository = AIServiceRepository;
    }

    public async Task<List<AiService>?> GetAllServices(){
        
        var result = await _AIServiceRepository.GetAllServices();

        return result;

    }

    public async Task<AiService?> GetServiceById(long serviceId){

        var result = await _AIServiceRepository.GetServiceById(serviceId);

        return result;
    }

}