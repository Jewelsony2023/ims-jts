using InventoryManagement.API.Models;

namespace InventoryManagement.API.Interfaces.Services;

public interface IForecastService
{
    Task<List<ForecastResult>> GetForecastResultsAsync();
}
