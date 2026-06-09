using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;

namespace InventoryManagement.API.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public Task<List<CategoryDto>> GetCategoriesAsync()
    {
        return _categoryRepository.GetCategoriesAsync();
    }
}
