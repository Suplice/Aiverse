using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

public class AIServiceSerivce: IAIServiceService {

    private readonly IAIServiceRepository _AIServiceRepository;

    public async Task<List<AiService>?> GetAllServices(){
        
        var result = await _AIServiceRepository.GetAllServices();

        return result;

    }

}