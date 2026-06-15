namespace InventoryManagement.API.DTOs;

public class DashboardAlertsDto
{
    public List<string> LowStockProducts { get; set; } = new();

    public List<string> ExpiringProducts { get; set; } = new();

    public List<string> ExpiredProducts { get; set; } = new();
}