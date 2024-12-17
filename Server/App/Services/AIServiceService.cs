using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

public class SearchSerivce: IAIServiceService {

    private readonly IAIServiceRepository _searchRepository;

    public async Task<List<AiService>?> FindAllServices(){
        
        var result = await _searchRepository.FindAllServices();

        return result;

    }

}