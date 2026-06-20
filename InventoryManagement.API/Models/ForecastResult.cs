namespace InventoryManagement.API.Models;

public class ForecastResult
{
    public int ForecastId { get; set; }

    public string ProductCode { get; set; } = string.Empty;

    public decimal ForecastDemand { get; set; }

    public decimal RecommendedOrder { get; set; }

    public string RiskLevel { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
