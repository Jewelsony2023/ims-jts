using InventoryManagement.API.Models;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface IForecastRepository
{
    Task<List<ForecastResult>> GetForecastResultsAsync();
}
