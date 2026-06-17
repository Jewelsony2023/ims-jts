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

    public Task<List<ProductOptionDto>> GetProductOptionsAsync()
    {
        return _productRepository.GetProductOptionsAsync();
    }

    public Task<List<ProductBatchDto>> GetProductBatchesAsync()
    {
        return _productRepository.GetProductBatchesAsync();
    }

    public Task<int> CreateProductAsync(
        ProductCreateDto product)
    {
        return _productRepository
            .CreateProductAsync(product);
    }

    public Task<bool> UpdateProductAsync(
        int id,
        ProductUpdateDto product)
    {
        return _productRepository
            .UpdateProductAsync(id, product);
    }

    public Task<bool> DeleteProductAsync(
        int id)
    {
        return _productRepository
            .DeleteProductAsync(id);
    }
}
