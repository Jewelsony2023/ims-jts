using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Services;

public interface IDashboardService
{
    Task<DashboardStatsDto> GetStatsAsync();
}
