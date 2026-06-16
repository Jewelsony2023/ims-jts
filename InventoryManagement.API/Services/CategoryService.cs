using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Services;

public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;
    private readonly IAuditLogService _auditLogService;

    public CategoryService(
        ICategoryRepository categoryRepository,
        IAuditLogService auditLogService)
    {
        _categoryRepository = categoryRepository;
        _auditLogService = auditLogService;
    }

    public Task<List<CategoryDto>> GetCategoriesAsync()
    {
        return _categoryRepository.GetCategoriesAsync();
    }

    public Task<CategoryDto?> GetCategoryByIdAsync(int id)
    {
        return _categoryRepository.GetCategoryByIdAsync(id);
    }

    public async Task<int> CreateCategoryAsync(
        CategoryCreateDto category)
    {
        var id = await _categoryRepository.CreateCategoryAsync(category);

        await _auditLogService.LogAsync(new AuditLog
        {
            UserId = 1,
            EntityName = "Category",
            EntityId = id,
            Action = "CREATE_CATEGORY",
            CreatedAt = DateTime.UtcNow
        });

        return id;
    }

    public async Task<bool> UpdateCategoryAsync(
        int id,
        CategoryUpdateDto category)
    {
        var updated = await _categoryRepository.UpdateCategoryAsync(id, category);

        if (updated)
        {
            await _auditLogService.LogAsync(new AuditLog
            {
                UserId = 1,
                EntityName = "Category",
                EntityId = id,
                Action = "UPDATE_CATEGORY",
                CreatedAt = DateTime.UtcNow
            });
        }

        return updated;
    }

    public async Task<bool> DeleteCategoryAsync(
        int id)
    {
        var deleted = await _categoryRepository.DeleteCategoryAsync(id);

        if (deleted)
        {
            await _auditLogService.LogAsync(new AuditLog
            {
                UserId = 1,
                EntityName = "Category",
                EntityId = id,
                Action = "DELETE_CATEGORY",
                CreatedAt = DateTime.UtcNow
            });
        }

        return deleted;
    }
}
