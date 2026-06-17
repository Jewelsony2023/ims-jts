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

    public Task<CategoryDto?> GetCategoryByIdAsync(int id)
    {
        return _categoryRepository.GetCategoryByIdAsync(id);
    }

    public Task<int> CreateCategoryAsync(
        CategoryCreateDto category)
    {
        return _categoryRepository.CreateCategoryAsync(category);
    }

    public Task<bool> UpdateCategoryAsync(
        int id,
        CategoryUpdateDto category)
    {
        return _categoryRepository.UpdateCategoryAsync(id, category);
    }

    public Task<bool> DeleteCategoryAsync(
        int id)
    {
        return _categoryRepository.DeleteCategoryAsync(id);
    }
}
