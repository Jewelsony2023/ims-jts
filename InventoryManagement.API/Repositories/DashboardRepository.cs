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
    public async Task<decimal> GetInventoryValueAsync()
    {
        return await _context.ProductBatches
            .SumAsync(pb =>
                pb.QuantityAvailable * pb.CostPrice);
    }
    public async Task<decimal> GetRevenueAsync()
    {
        return await _context.StockTransactionItems
            .Where(x => x.TransactionType == "StockOut")
            .SumAsync(x =>
                x.Quantity * x.SellingPriceAtTransaction);
    }
    public async Task<decimal> GetProfitAsync()
    {
        return await _context.StockTransactionItems
            .Where(x =>
                x.TransactionType == "StockOut")
            .SumAsync(x =>
                x.Quantity *
                (x.SellingPriceAtTransaction -
                x.CostPriceAtTransaction));
    }
    public async Task<List<string>> GetLowStockProductsAsync()
    {
        return await _context.Products
            .Where(product =>
                (_context.ProductBatches
                    .Where(batch => batch.ProductId == product.ProductId)
                    .Sum(batch => (int?)batch.QuantityAvailable) ?? 0)
                <= product.MinimumStockLevel)
            .Select(product => product.ProductName)
            .Take(10)
            .ToListAsync();
    }
    public async Task<List<string>> GetExpiringProductsAsync()
    {
        var limitDate = DateTime.UtcNow.AddDays(30);

        return await _context.ProductBatches
            .Where(batch =>
                batch.ExpiryDate >= DateTime.UtcNow &&
                batch.ExpiryDate <= limitDate)
            .Select(batch => batch.Product!.ProductName)
            .Distinct()
            .Take(10)
            .ToListAsync();
    }
    public async Task<List<string>> GetExpiredProductsAsync()
    {
        return await _context.ProductBatches
            .Where(batch =>
                batch.ExpiryDate < DateTime.UtcNow)
            .Select(batch => batch.Product!.ProductName)
            .Distinct()
            .Take(10)
            .ToListAsync();
    }

}
