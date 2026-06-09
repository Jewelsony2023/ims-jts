using InventoryManagement.API.Data;
using InventoryManagement.API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Repositories;

public class DashboardRepository : IDashboardRepository
{
    private readonly InventoryDbContext _context;

    public DashboardRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public Task<int> GetTotalUsersAsync()
    {
        return CountOrZeroAsync(() => _context.Users.CountAsync());
    }

    public Task<int> GetTotalProductsAsync()
    {
        return CountOrZeroAsync(() => _context.Products.CountAsync());
    }

    public Task<int> GetTotalSuppliersAsync()
    {
        return CountOrZeroAsync(() => _context.Suppliers.CountAsync());
    }

    public Task<int> GetLowStockItemsAsync()
    {
        return CountOrZeroAsync(() =>
            _context.Products
                .GroupJoin(
                    _context.ProductBatches,
                    product => product.ProductId,
                    batch => batch.ProductId,
                    (product, batches) => new
                    {
                        product.MinimumStockLevel,
                        QuantityAvailable = batches.Sum(batch => (int?)batch.QuantityAvailable) ?? 0
                    })
                .CountAsync(product =>
                    product.QuantityAvailable <= product.MinimumStockLevel));
    }

    private static async Task<int> CountOrZeroAsync(Func<Task<int>> countQuery)
    {
        try
        {
            return await countQuery();
        }
        catch (Exception)
        {
            return 0;
        }
    }
}
