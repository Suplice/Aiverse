using System.Text.Json;
using Newtonsoft.Json;
using Server.App.Models;
using Supabase;

public class AuthRepository: IAuthRepository{

    private readonly Client _supabaseClient;

    public AuthRepository(Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    public async Task<User?> FindUserAsync(String Email){

        try
        {
        var responseUser = await _supabaseClient.From<User>()
                                    .Where(u => u.Email == Email)
                                    .Get();
        Console.WriteLine(responseUser.Model);
        return responseUser.Model;
        }
        catch(Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    public async Task<User> Register(User user){
        try
        {
            // Log the serialized JSON payload
            var jsonPayload = JsonConvert.SerializeObject(user);

            var response = await _supabaseClient.From<User>().Insert(user);

            return response.Model;
        }
        catch (Exception e)
        {
            return null;
        }

    }

    public async Task<User?> GetUserById(String UserId){
        try {
            var id = long.Parse(UserId);
            var responseUser = await _supabaseClient.From<User>()
                                    .Where(u => u.Id == id)
                                    .Get();
            return responseUser.Model;
        }
        catch(Exception e)
        {
            return null;
        }
    }

}