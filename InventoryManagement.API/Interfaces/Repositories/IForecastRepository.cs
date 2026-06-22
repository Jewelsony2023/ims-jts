using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface IForecastRepository
{
    Task<List<ForecastResultDto>> GetForecastResultsAsync();
}
