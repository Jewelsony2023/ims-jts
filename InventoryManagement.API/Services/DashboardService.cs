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
            TotalUsers = await _dashboardRepository.GetTotalUsersAsync(),
            TotalProducts = await _dashboardRepository.GetTotalProductsAsync(),
            TotalSuppliers = await _dashboardRepository.GetTotalSuppliersAsync(),
            LowStockItems = await _dashboardRepository.GetLowStockItemsAsync()
        };
    }
}
