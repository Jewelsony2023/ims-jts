namespace InventoryManagement.API.DTOs;

public class RevenueTrendDto
{
    public string Month { get; set; } = string.Empty;

    public decimal Revenue { get; set; }

    public decimal Profit { get; set; }
}