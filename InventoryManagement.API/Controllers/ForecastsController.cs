using InventoryManagement.API.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ForecastsController : ControllerBase
{
    private readonly IForecastService _forecastService;

    public ForecastsController(IForecastService forecastService)
    {
        _forecastService = forecastService;
    }

    [HttpGet]
    public async Task<IActionResult> GetForecastResults()
    {
        var forecastResults = await _forecastService.GetForecastResultsAsync();

        return Ok(forecastResults);
    }
}
