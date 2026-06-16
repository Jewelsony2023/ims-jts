using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface IProductRepository
{
    Task<List<ProductDto>> GetProductsAsync();

    Task<ProductDto?> GetProductByIdAsync(int id);

    Task<List<ProductOptionDto>> GetProductOptionsAsync();

    Task<List<ProductBatchDto>> GetProductBatchesAsync();
    Task<int> CreateProductAsync(
        ProductCreateDto product);

    Task<bool> UpdateProductAsync(
        int id,
        ProductUpdateDto product);

    Task<bool> DeleteProductAsync(
        int id);
}
