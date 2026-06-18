using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using InventoryManagement.API.Models;

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
            .OrderByDescending(product => product.TransactionCount)
            .ThenBy(product => product.Name)
            .ToListAsync();
    }

    public Task<ProductDto?> GetProductByIdAsync(int id)
    {
        return BuildProductQuery()
            .FirstOrDefaultAsync(product => product.Id == id);
    }

    public Task<List<ProductOptionDto>> GetProductOptionsAsync()
    {
        return _context.Products
            .AsNoTracking()
            .Where(product => product.IsActive && product.DeletedAt == null)
            .Select(product => new ProductOptionDto
            {
                Id = product.ProductId,
                Name = product.ProductName
            })
            .OrderBy(product => product.Name)
            .ToListAsync();
    }

    public Task<List<ProductBatchDto>> GetProductBatchesAsync()
    {
        return _context.ProductBatches
            .AsNoTracking()
            .Where(pb => pb.Product != null && pb.Supplier != null)
            .Select(pb => new ProductBatchDto
            {
                ProductBatchId = pb.ProductBatchId,
                ProductId = pb.ProductId,
                ProductName = pb.Product!.ProductName,
                ProductImageUrl = pb.Product.ProductImageUrl ?? string.Empty,
                SKU = pb.Product.SKU,
                BatchNumber = pb.BatchNumber,
                QuantityAvailable = pb.QuantityAvailable,
                CostPrice = pb.CostPrice,
                SellingPrice = pb.SellingPrice,
                ExpiryDate = pb.ExpiryDate,
                SupplierId = pb.SupplierId,
                SupplierName = pb.Supplier!.SupplierName
            })
            .ToListAsync();
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
                TransactionCount = _context.StockTransactionItems.AsNoTracking()
                    .Count(transactionItem =>
                        transactionItem.ProductId == item.Product.ProductId),
                Status = item.Stock == 0 && item.HasExpiredBatch
                    ? "Expired"
                    : item.HasExpiringBatch
                        ? "Expiring Soon"
                        : item.Stock <= item.Product.MinimumStockLevel
                            ? "Low Stock"
                            : "In Stock"
            });
    }
    public async Task<int> CreateProductAsync(
        ProductCreateDto product)
    {
        var newProduct = new Product
        {
            ProductName = product.Name,
            SKU = product.Sku,
            Barcode = product.Barcode,
            Description = product.Description,
            CategoryId = product.CategoryId,
            ProductImageUrl = product.Image,
            MinimumStockLevel = product.MinimumStockLevel,
            IsActive = true
        };

        _context.Products.Add(newProduct);

        await _context.SaveChangesAsync();

        return newProduct.ProductId;
    }

    public async Task<bool> UpdateProductAsync(
        int id,
        ProductUpdateDto product)
    {
        var existing =
            await _context.Products
                .FirstOrDefaultAsync(x =>
                    x.ProductId == id &&
                    x.DeletedAt == null);

        if (existing == null)
            return false;

        existing.ProductName = product.Name;
        existing.SKU = product.Sku;
        existing.Barcode = product.Barcode;
        existing.Description = product.Description;
        existing.CategoryId = product.CategoryId;
        existing.ProductImageUrl = product.Image;
        existing.MinimumStockLevel =
            product.MinimumStockLevel;

        existing.UpdatedAt =
            DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteProductAsync(
        int id)
    {
        var existing =
            await _context.Products
                .FirstOrDefaultAsync(x =>
                    x.ProductId == id);

        if (existing == null)
            return false;

        existing.DeletedAt =
            DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
}
