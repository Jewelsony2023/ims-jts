using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Repositories;

public class ProductRepository : IProductRepository
{
    private readonly InventoryDbContext _context;

    public ProductRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public Task<List<ProductDto>> GetProductsAsync()
    {
        return BuildProductQuery()
            .OrderBy(product => product.Name)
            .ToListAsync();
    }

    public Task<ProductDto?> GetProductByIdAsync(int id)
    {
        return BuildProductQuery()
            .FirstOrDefaultAsync(product => product.Id == id);
    }

    private IQueryable<ProductDto> BuildProductQuery()
    {
        var today = DateTime.UtcNow.Date;
        var expiringSoonDate = today.AddDays(30);

        return _context.Products
            .AsNoTracking()
            .Where(product => product.IsActive && product.DeletedAt == null)
            .GroupJoin(
                _context.ProductBatches.AsNoTracking(),
                product => product.ProductId,
                batch => batch.ProductId,
                (product, batches) => new
                {
                    Product = product,
                    Stock = batches.Sum(batch => (int?)batch.QuantityAvailable) ?? 0,
                    HasExpiredBatch = batches.Any(batch => batch.ExpiryDate.Date < today),
                    HasExpiringBatch = batches.Any(batch =>
                        batch.ExpiryDate.Date >= today &&
                        batch.ExpiryDate.Date <= expiringSoonDate)
                })
            .Select(item => new ProductDto
            {
                Id = item.Product.ProductId,
                Image = item.Product.ProductImageUrl ?? string.Empty,
                Name = item.Product.ProductName,
                Sku = item.Product.SKU,
                Barcode = item.Product.Barcode,
                Category = item.Product.Category == null
                    ? string.Empty
                    : item.Product.Category.CategoryName,
                Description = item.Product.Description ?? string.Empty,
                Stock = item.Stock,
                Status = item.Stock == 0 && item.HasExpiredBatch
                    ? "Expired"
                    : item.HasExpiringBatch
                        ? "Expiring Soon"
                        : item.Stock <= item.Product.MinimumStockLevel
                            ? "Low Stock"
                            : "In Stock"
            });
    }
}
