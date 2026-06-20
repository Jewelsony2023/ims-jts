using InventoryManagement.API.Data;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Repositories;

public class ForecastRepository : IForecastRepository
{
    private readonly InventoryDbContext _context;

    public ForecastRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public Task<List<ForecastResult>> GetForecastResultsAsync()
    {
        return _context.Set<ForecastResult>()
            .AsNoTracking()
            .OrderByDescending(result => result.ForecastDemand)
            .ToListAsync();
    }
}
