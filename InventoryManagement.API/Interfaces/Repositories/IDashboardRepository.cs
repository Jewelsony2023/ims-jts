namespace InventoryManagement.API.Interfaces.Repositories;

public interface IDashboardRepository
{
    Task<int> GetTotalUsersAsync();

    Task<int> GetTotalProductsAsync();

    Task<int> GetTotalSuppliersAsync();

    Task<int> GetLowStockItemsAsync();
}
