using InventoryManagement.API.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MlController : ControllerBase
{
    private const string MetricsFilePath =
        @"C:\Users\HP\Desktop\IMS_ML\forecasts\model_comparison.csv";

    [HttpGet("metrics")]
    public IActionResult GetMetrics()
    {
        if (!System.IO.File.Exists(MetricsFilePath))
        {
            return NotFound(new { Message = "ML metrics file not found." });
        }

        var metrics = System.IO.File.ReadLines(MetricsFilePath)
            .Skip(1)
            .Select(line => line.Split(',', StringSplitOptions.TrimEntries))
            .Where(parts => parts.Length >= 2)
            .Select(parts => new MlMetricDto
            {
                ModelName = parts[0],
                Mape = decimal.Parse(parts[1], System.Globalization.CultureInfo.InvariantCulture),
            })
            .ToList();

        return Ok(metrics);
    }
}
