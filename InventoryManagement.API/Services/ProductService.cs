using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;

namespace InventoryManagement.API.Services;

public class ProductService : IProductService
{
    private readonly IProductRepository _productRepository;

    public ProductService(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }

    public Task<List<ProductDto>> GetProductsAsync()
    {
        return _productRepository.GetProductsAsync();
    }

    public Task<ProductDto?> GetProductByIdAsync(int id)
    {
        return _productRepository.GetProductByIdAsync(id);
    }
}
