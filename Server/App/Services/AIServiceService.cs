using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

public class AIServiceSerivce: IAIServiceService {

    private readonly IAIServiceRepository _AIServiceRepository;

    public async Task<List<AiService>?> FindAllServices(){
        
        var result = await _AIServiceRepository.FindAllServices();

        return result;

    }

}