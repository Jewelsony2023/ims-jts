namespace InventoryManagement.API.DTOs;

public class DashboardStatsDto
{
    public int TotalUsers { get; set; }

    public int TotalProducts { get; set; }

    public int TotalSuppliers { get; set; }

    public int InactiveSuppliers { get; set; }

    public int LowStockItems { get; set; }

    public decimal InventoryValue { get; set; }

    public decimal Revenue { get; set; }

    public decimal Profit { get; set; }
}
