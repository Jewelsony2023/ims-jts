using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;
    private readonly IAuditLogService _auditLogService;

    public ProductService(
        IProductRepository productRepository,
        IAuditLogService auditLogService)
    {
        _productRepository = productRepository;
        _auditLogService = auditLogService;
    }

    public Task<List<ProductDto>> GetProductsAsync()
    {
        return _productRepository.GetProductsAsync();
    }

    public Task<ProductDto?> GetProductByIdAsync(int id)
    {
        return _productRepository.GetProductByIdAsync(id);
    }

    public Task<List<ProductOptionDto>> GetProductOptionsAsync()
    {
        return _productRepository.GetProductOptionsAsync();
    }

    public Task<List<ProductBatchDto>> GetProductBatchesAsync()
    {
        return _productRepository.GetProductBatchesAsync();
    }

    public async Task<int> CreateProductAsync(
        ProductCreateDto product)
    {
        var id = await _productRepository.CreateProductAsync(product);

        await _auditLogService.LogAsync(new AuditLog
        {
            UserId = 1,
            EntityName = "Product",
            EntityId = id,
            Action = "CREATE_PRODUCT",
            CreatedAt = DateTime.UtcNow
        });

        return id;
    }

    public async Task<bool> UpdateProductAsync(
        int id,
        ProductUpdateDto product)
    {
        var updated = await _productRepository.UpdateProductAsync(id, product);

        if (updated)
        {
            await _auditLogService.LogAsync(new AuditLog
            {
                UserId = 1,
                EntityName = "Product",
                EntityId = id,
                Action = "UPDATE_PRODUCT",
                CreatedAt = DateTime.UtcNow
            });
        }

        return updated;
    }

    public async Task<bool> DeleteProductAsync(
        int id)
    {
        var deleted = await _productRepository.DeleteProductAsync(id);

        if (deleted)
        {
            await _auditLogService.LogAsync(new AuditLog
            {
                UserId = 1,
                EntityName = "Product",
                EntityId = id,
                Action = "DELETE_PRODUCT",
                CreatedAt = DateTime.UtcNow
            });
        }

        return deleted;
    }
}
