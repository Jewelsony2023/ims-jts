using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Services;

public interface IDashboardService
{
    Task<DashboardStatsDto> GetStatsAsync();
    Task<DashboardAlertsDto> GetAlertsAsync();
    Task<List<DashboardActivityDto>>
    GetRecentActivityAsync();
    Task<List<StockMovementDto>> GetStockMovementAsync();
    Task<List<RevenueTrendDto>>
    GetRevenueTrendAsync(string view);

    Task<List<InventoryValueTrendDto>> GetInventoryValueTrendAsync();
}
