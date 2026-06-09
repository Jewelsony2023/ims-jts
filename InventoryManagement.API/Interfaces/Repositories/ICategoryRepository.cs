using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface ICategoryRepository
{
    Task<List<CategoryDto>> GetCategoriesAsync();
}
