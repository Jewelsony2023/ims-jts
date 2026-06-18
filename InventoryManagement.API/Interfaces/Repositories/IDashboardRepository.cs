using InventoryManagement.API.DTOs;
namespace InventoryManagement.API.Interfaces.Repositories;

public interface IDashboardRepository
{
    Task<int> GetTotalUsersAsync();

    Task<int> GetTotalProductsAsync();

    Task<int> GetTotalSuppliersAsync();

    Task<int> GetInactiveSuppliersAsync();

    Task<int> GetLowStockItemsAsync();
    Task<decimal> GetInventoryValueAsync();

    Task<decimal> GetRevenueAsync();

    Task<decimal> GetProfitAsync();
    Task<List<string>> GetLowStockProductsAsync();

    Task<List<string>> GetExpiringProductsAsync();

    Task<List<string>> GetExpiredProductsAsync();
    Task<List<DashboardActivityDto>> GetRecentActivityAsync();
    Task<List<StockMovementDto>> GetStockMovementAsync();
    Task<List<RevenueTrendDto>> GetRevenueTrendAsync(string view);

    Task<List<InventoryValueTrendDto>> GetInventoryValueTrendAsync();
}
