namespace InventoryManagement.API.DTOs;

public class StockMovementDto
{
    public string Month { get; set; } = string.Empty;

    public int StockIn { get; set; }

    public int StockOut { get; set; }
}