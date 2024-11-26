using Server.App.Models;

public class AppService : IAppService
{
    private readonly IAppRepository _appRepository;

    public AppService(IAppRepository appRepository)
    {
        _appRepository = appRepository;
    }

    public string Get()
    {
        return _appRepository.Get();
    }

    public async Task<WeatherForecast[]> GetWeatherForecast()
    {
        return await _appRepository.GetWeatherForecast();
    }

    public async Task<string> SetWeatherForecast(WeatherForecast[] forecasts)
    {
        return await _appRepository.SetWeatherForecast(forecasts);
    }
}