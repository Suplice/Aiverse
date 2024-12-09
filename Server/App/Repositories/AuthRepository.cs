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

    public async Task<User> Register(User user){
    try
    {
        // Log the serialized JSON payload
        var jsonPayload = JsonConvert.SerializeObject(user);
        Console.WriteLine($"Payload being sent: {jsonPayload}");

        var response = await _supabaseClient.From<User>().Insert(user);
        Console.WriteLine(response);

        return user;
    }
    catch (Exception e)
    {
        Console.WriteLine($"Insert failed: {e.Message}");
        return null;
    }

    }

}