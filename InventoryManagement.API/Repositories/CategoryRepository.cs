using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
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
        var categories = await _context.Categories
            .AsNoTracking()
            .Where(category => category.IsActive)
            .Select(category => new
            {
                category.CategoryId,
                category.CategoryName,
                Description = category.Description ?? string.Empty,
                ProductCount = _context.Products.Count(product =>
                    product.CategoryId == category.CategoryId &&
                    product.IsActive &&
                    product.DeletedAt == null)
            })
            .OrderBy(category => category.CategoryId)
            .ToListAsync();

        return categories.Select((category, index) => new CategoryDto
        {
            Id = category.CategoryId,
            Name = category.CategoryName,
            Description = category.Description,
            ProductCount = category.ProductCount,
            Color = Colors[index % Colors.Length]
        }).ToList();
    }
}
