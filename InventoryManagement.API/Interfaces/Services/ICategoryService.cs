using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Services;

public interface ICategoryService
{
    Task<List<CategoryDto>> GetCategoriesAsync();
}
