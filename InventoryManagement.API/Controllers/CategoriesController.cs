using InventoryManagement.API.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<IActionResult> GetCategories()
    {
        var categories = await _categoryService.GetCategoriesAsync();

        return Ok(categories);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetCategory(int id)
    {
        var category = await _categoryService.GetCategoryByIdAsync(id);

        if (category == null)
        {
            return NotFound();
        }

        return Ok(category);
    }

    [HttpPost]
    public async Task<IActionResult> CreateCategory(
        CategoryCreateDto category)
    {
        if (string.IsNullOrWhiteSpace(category.Name))
        {
            return BadRequest("Category name is required.");
        }

        var categoryId = await _categoryService.CreateCategoryAsync(category);

        return CreatedAtAction(
            nameof(GetCategory),
            new { id = categoryId },
            new { CategoryId = categoryId });
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateCategory(
        int id,
        CategoryUpdateDto category)
    {
        if (string.IsNullOrWhiteSpace(category.Name))
        {
            return BadRequest("Category name is required.");
        }

        var updated = await _categoryService.UpdateCategoryAsync(id, category);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var deleted = await _categoryService.DeleteCategoryAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
