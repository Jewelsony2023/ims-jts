using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Services;

public class ForecastService : IForecastService
{
    private readonly IForecastRepository _forecastRepository;

    public ForecastService(IForecastRepository forecastRepository)
    {
        _forecastRepository = forecastRepository;
    }

    public Task<List<ForecastResult>> GetForecastResultsAsync()
    {
        return _forecastRepository.GetForecastResultsAsync();
    }
}
