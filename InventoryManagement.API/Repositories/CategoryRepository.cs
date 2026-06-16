using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Repositories;

public class CategoryRepository : ICategoryRepository
{
    private static readonly string[] Colors =
    [
        "bg-blue-500",
        "bg-purple-500",
        "bg-pink-500",
        "bg-orange-500",
        "bg-teal-500",
        "bg-yellow-500",
        "bg-green-500",
        "bg-indigo-500",
        "bg-red-500",
        "bg-cyan-500",
        "bg-fuchsia-500",
        "bg-amber-500"
    ];

    private readonly InventoryDbContext _context;

    public CategoryRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public async Task<List<CategoryDto>> GetCategoriesAsync()
    {
        var categories = await BuildCategoryQuery()
            .OrderBy(category => category.Id)
            .ToListAsync();

        return categories.Select((category, index) =>
        {
            category.Color = Colors[index % Colors.Length];
            return category;
        }).ToList();
    }

    public Task<CategoryDto?> GetCategoryByIdAsync(int id)
    {
        return BuildCategoryQuery()
            .FirstOrDefaultAsync(category => category.Id == id);
    }

    public async Task<int> CreateCategoryAsync(
        CategoryCreateDto category)
    {
        var entity = new Category
        {
            CategoryName = category.Name,
            Description = category.Description,
            IsActive = true
        };

        _context.Categories.Add(entity);

        await _context.SaveChangesAsync();

        return entity.CategoryId;
    }

    public async Task<bool> UpdateCategoryAsync(
        int id,
        CategoryUpdateDto category)
    {
        var entity = await _context.Categories
            .FirstOrDefaultAsync(x => x.CategoryId == id && x.IsActive);

        if (entity == null)
        {
            return false;
        }

        entity.CategoryName = category.Name;
        entity.Description = category.Description;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteCategoryAsync(
        int id)
    {
        var entity = await _context.Categories
            .FirstOrDefaultAsync(x => x.CategoryId == id && x.IsActive);

        if (entity == null)
        {
            return false;
        }

        entity.IsActive = false;

        await _context.SaveChangesAsync();

        return true;
    }

    private IQueryable<CategoryDto> BuildCategoryQuery()
    {
        return _context.Categories
            .AsNoTracking()
            .Where(category => category.IsActive)
            .Select(category => new CategoryDto
            {
                Id = category.CategoryId,
                Name = category.CategoryName,
                Description = category.Description ?? string.Empty,
                ProductCount = _context.Products.Count(product =>
                    product.CategoryId == category.CategoryId &&
                    product.IsActive &&
                    product.DeletedAt == null),
                Color = string.Empty
            });
    }
}
