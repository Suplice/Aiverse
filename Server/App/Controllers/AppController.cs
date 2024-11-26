using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;

[ApiController]
[Route("api")]
public class AppController: ControllerBase {

    private readonly IAppRepository _appService;

    public AppController(IAppRepository appService) {
        _appService = appService;
    }
    [HttpGet]
    public string Get() {
        return "Hello World!";
    }

    [HttpGet("GetWeatherForecast")]
    public async Task<IActionResult> GetWeatherForecast() {
        var forecasts = await _appService.GetWeatherForecast();

        return Ok(forecasts);
    }

    [HttpPost("SetWeatherForecast")]
    public async Task<IActionResult> SetWeatherForecast() {

        var forecasts = new WeatherForecast[]
        {
            new WeatherForecast{ Date = DateTimeOffset.UtcNow, TemperatureC = 25, Summary = "Hot"},
            new WeatherForecast{ Date = DateTimeOffset.UtcNow, TemperatureC = 25, Summary = "Hot"},
        };

        var result = await _appService.SetWeatherForecast(forecasts);

        return Ok(result);
    }
}