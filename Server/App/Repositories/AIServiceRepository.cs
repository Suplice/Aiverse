using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;
using Supabase;

public class SearchRepository: ISearchRepository {

    private readonly Client _supabaseClient;

    public async Task<List<AiService>?> FindServices(){

    }

}