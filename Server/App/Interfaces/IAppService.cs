using Server.App.Models;

public interface IAppService
{
    string Get();
    Task<WeatherForecast[]> GetWeatherForecast();
    Task<string> SetWeatherForecast(WeatherForecast[] forecasts);
}