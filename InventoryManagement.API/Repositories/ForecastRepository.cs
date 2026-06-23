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
        var query =
            from forecast in _context.ForecastResults.AsNoTracking()
            join product in _context.Products.AsNoTracking()
                on forecast.ProductCode equals product.SKU
            join category in _context.Categories.AsNoTracking()
                on product.CategoryId equals category.CategoryId into categoryGroup
            from category in categoryGroup.DefaultIfEmpty()
            join batch in _context.ProductBatches.AsNoTracking()
                on product.ProductId equals batch.ProductId into batchGroup
            let currentInventory = batchGroup.Sum(item => (int?)item.QuantityAvailable) ?? 0
            let recommendedOrder = forecast.ForecastDemand > currentInventory
                ? forecast.ForecastDemand - currentInventory
                : 0m
            let coverageRatio = forecast.ForecastDemand == 0
                ? 0m
                : currentInventory / forecast.ForecastDemand
            orderby forecast.ForecastDemand descending
            select new ForecastResultDto
            {
                ForecastId = forecast.ForecastId,
                ProductCode = forecast.ProductCode,
                ProductName = product.ProductName,
                CategoryName = category != null ? category.CategoryName : string.Empty,
                ForecastDemand = forecast.ForecastDemand,
                RecommendedOrder = recommendedOrder,
                RiskLevel = coverageRatio >= 1.2m
                    ? "LOW"
                    : coverageRatio >= 0.8m
                        ? "MEDIUM"
                        : "HIGH",
                CurrentInventory = currentInventory,
                CreatedAt = forecast.CreatedAt
            };

        return query.ToListAsync();
    }
}
