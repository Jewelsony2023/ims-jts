using InventoryManagement.API.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DashboardController : ControllerBase
{
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService)
    {
        _dashboardService = dashboardService;
    }

    [HttpGet("stats")]
    public async Task<IActionResult> GetStats()
    {
        var result = await _dashboardService.GetStatsAsync();

        return Ok(result);
    }
    [HttpGet("alerts")]
    public async Task<IActionResult> GetAlerts()
    {
        var result =
            await _dashboardService.GetAlertsAsync();

        return Ok(result);
    }
    [HttpGet("activity-feed")]
    public async Task<IActionResult>
        GetActivityFeed()
    {
        var result =
            await _dashboardService
                .GetRecentActivityAsync();

        return Ok(result);
    }
    [HttpGet("stock-movement")]
    public async Task<IActionResult>
        GetStockMovement()
    {
        var result =
            await _dashboardService
                .GetStockMovementAsync();

        return Ok(result);
    }
    [HttpGet("revenue-trend")]
    public async Task<IActionResult>
        GetRevenueTrend([FromQuery] string view = "monthly")
    {
        return Ok(
            await _dashboardService
                .GetRevenueTrendAsync(view));
    }

    [HttpGet("inventory-value-trend")]
    public async Task<IActionResult>
        GetInventoryValueTrend()
    {
        return Ok(
            await _dashboardService
                .GetInventoryValueTrendAsync());
    }
}
