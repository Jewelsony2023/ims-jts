using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Services;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetCategoriesAsync();

    Task<CategoryDto?> GetCategoryByIdAsync(int id);

    Task<int> CreateCategoryAsync(
        CategoryCreateDto category);

    Task<bool> UpdateCategoryAsync(
        int id,
        CategoryUpdateDto category);

    Task<bool> DeleteCategoryAsync(
        int id);
}
