namespace InventoryManagement.API.DTOs;

public class DashboardStatsDto
{
    public int TotalUsers { get; set; }

    public int TotalProducts { get; set; }

    public int TotalSuppliers { get; set; }

    public int LowStockItems { get; set; }
}
