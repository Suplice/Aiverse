using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;
using Supabase;

public class SearchRepository: IAIServiceRepository {

    private readonly Client _supabaseClient;

    public async Task<List<AiService>?> FindAllServices(){

        try{
            var responsServices = await _supabaseClient
                                            .From<AiService>()
                                            .Get();
            var servicesList = responsServices.Models;
            return servicesList;
        }catch(Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

}