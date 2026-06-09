using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface IProductRepository
{
    Task<List<ProductDto>> GetProductsAsync();

    Task<ProductDto?> GetProductByIdAsync(int id);
}
