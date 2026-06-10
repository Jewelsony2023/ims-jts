using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Services;

public interface IProductService
{
    Task<List<ProductDto>> GetProductsAsync();

    Task<ProductDto?> GetProductByIdAsync(int id);

    Task<List<ProductOptionDto>> GetProductOptionsAsync();

    Task<List<ProductBatchDto>> GetProductBatchesAsync();
}
