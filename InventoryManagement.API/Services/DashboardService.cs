using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;

namespace InventoryManagement.API.Services;

public class DashboardService : IDashboardService
{
    private readonly IDashboardRepository _dashboardRepository;

    public DashboardService(IDashboardRepository dashboardRepository)
    {
        _dashboardRepository = dashboardRepository;
    }

    public async Task<DashboardStatsDto> GetStatsAsync()
    {
        return new DashboardStatsDto
        {
            TotalUsers =
                await _dashboardRepository.GetTotalUsersAsync(),

            TotalProducts =
                await _dashboardRepository.GetTotalProductsAsync(),

            TotalSuppliers =
                await _dashboardRepository.GetTotalSuppliersAsync(),

            InactiveSuppliers =
                await _dashboardRepository.GetInactiveSuppliersAsync(),

            LowStockItems =
                await _dashboardRepository.GetLowStockItemsAsync(),

            InventoryValue =
                await _dashboardRepository.GetInventoryValueAsync(),

            Revenue =
                await _dashboardRepository.GetRevenueAsync(),

            Profit =
                await _dashboardRepository.GetProfitAsync()
        };
    }
    public async Task<DashboardAlertsDto> GetAlertsAsync()
    {
        return new DashboardAlertsDto
        {
            LowStockProducts =
                await _dashboardRepository.GetLowStockProductsAsync(),

            ExpiringProducts =
                await _dashboardRepository.GetExpiringProductsAsync(),

            ExpiredProducts =
                await _dashboardRepository.GetExpiredProductsAsync()
        };
    }
    public async Task<List<DashboardActivityDto>>
        GetRecentActivityAsync()
    {
        return await _dashboardRepository
            .GetRecentActivityAsync();
    }
    public async Task<List<StockMovementDto>>
        GetStockMovementAsync()
    {
        return await _dashboardRepository
            .GetStockMovementAsync();
    }
    public async Task<List<RevenueTrendDto>>
        GetRevenueTrendAsync(string view)
    {
        return await _dashboardRepository
            .GetRevenueTrendAsync(view);
    }

    public async Task<List<InventoryValueTrendDto>>
        GetInventoryValueTrendAsync()
    {
        return await _dashboardRepository
            .GetInventoryValueTrendAsync();
    }
}
