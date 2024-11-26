using Server.App.Models;

public interface IAppRepository
{
    string Get();
    Task<WeatherForecast[]> GetWeatherForecast();
    Task<string> SetWeatherForecast(WeatherForecast[] forecasts);
}