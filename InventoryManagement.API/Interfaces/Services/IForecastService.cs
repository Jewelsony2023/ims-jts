using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Services;

public interface IForecastService
{
    Task<List<ForecastResultDto>> GetForecastResultsAsync();
}
