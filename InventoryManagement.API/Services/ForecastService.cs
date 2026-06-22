using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;

namespace InventoryManagement.API.Services;

public class ForecastService : IForecastService
{
    private readonly IForecastRepository _forecastRepository;

    public ForecastService(IForecastRepository forecastRepository)
    {
        _forecastRepository = forecastRepository;
    }

    public Task<List<ForecastResultDto>> GetForecastResultsAsync()
    {
        return _forecastRepository.GetForecastResultsAsync();
    }
}
