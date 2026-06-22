using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Repositories;

public class ForecastRepository : IForecastRepository
{
    private readonly InventoryDbContext _context;

    public ForecastRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public Task<List<ForecastResultDto>> GetForecastResultsAsync()
    {
        return _context.ForecastResults
            .AsNoTracking()
            .Join(
                _context.Products.AsNoTracking(),
                forecast => forecast.ProductCode,
                product => product.SKU,
                (forecast, product) => new { forecast, product })
            .GroupJoin(
                _context.Categories.AsNoTracking(),
                item => item.product.CategoryId,
                category => category.CategoryId,
                (item, categories) => new { item.forecast, item.product, category = categories.FirstOrDefault() })
            .OrderByDescending(result => result.forecast.ForecastDemand)
            .Select(result => new ForecastResultDto
            {
                ForecastId = result.forecast.ForecastId,
                ProductCode = result.forecast.ProductCode,
                ProductName = result.product.ProductName,
                CategoryName = result.category == null ? string.Empty : result.category.CategoryName,
                ForecastDemand = result.forecast.ForecastDemand,
                RecommendedOrder = result.forecast.RecommendedOrder,
                RiskLevel = result.forecast.RiskLevel,
                CreatedAt = result.forecast.CreatedAt
            })
            .ToListAsync();
    }
}
