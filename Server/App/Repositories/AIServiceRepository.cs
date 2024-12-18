using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;
using Supabase;

public class AIServiceRepository: IAIServiceRepository {

    private readonly Client _supabaseClient;

    public async Task<List<AiService>?> GetAllServices(){

        try{
            var responseServices = await _supabaseClient
                                            .From<AiService>()
                                            .Get();
            var servicesList = responseServices.Models;
            return servicesList;
        }catch(Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

}