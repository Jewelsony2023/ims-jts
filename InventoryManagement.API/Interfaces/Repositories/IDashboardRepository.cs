namespace InventoryManagement.API.Interfaces.Repositories;

public interface IDashboardRepository
{
    Task<int> GetTotalUsersAsync();

    Task<int> GetTotalProductsAsync();

    Task<int> GetTotalSuppliersAsync();

    Task<int> GetLowStockItemsAsync();
    Task<decimal> GetInventoryValueAsync();

    Task<decimal> GetRevenueAsync();

    Task<decimal> GetProfitAsync();
    Task<List<string>> GetLowStockProductsAsync();

    Task<List<string>> GetExpiringProductsAsync();

    Task<List<string>> GetExpiredProductsAsync();
}
