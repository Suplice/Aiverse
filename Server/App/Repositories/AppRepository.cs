using System.Text.Json;
using Newtonsoft.Json;
using Server.App.Models;
using Supabase;

public class AppRepository : IAppRepository
{

    private readonly Client _supabaseClient;

    public AppRepository(Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }
    
        

    
    
    
    public string Get()
    {
        return "Hello World!";
    }

    public async Task<WeatherForecast[]> GetWeatherForecast()
    {

        // Retrieve data from database



        var forecasts = await _supabaseClient.From<WeatherForecast>().Select("*").Get();

        Console.WriteLine(forecasts.Models.ToArray());

        foreach (var forecast in forecasts.Models)
        {
            Console.WriteLine(forecast.Date);
            Console.WriteLine(forecast.TemperatureC);
            Console.WriteLine(forecast.Summary);
        }

        return forecasts.Models.ToArray();



      
    }

    public async Task<string> SetWeatherForecast(WeatherForecast[] forecasts)
{
    try
    {
        // Log the serialized JSON payload
        var jsonPayload = JsonConvert.SerializeObject(forecasts);
        Console.WriteLine($"Payload being sent: {jsonPayload}");

        var response = await _supabaseClient.From<WeatherForecast>().Insert(forecasts);
        Console.WriteLine("Insert successful.");
    }
    catch (Exception e)
    {
        Console.WriteLine($"Insert failed: {e.Message}");
        return $"Error: {e.Message}";
    }

    return "Weather forecast inserted successfully";
}
}