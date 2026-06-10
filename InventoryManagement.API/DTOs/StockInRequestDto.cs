namespace InventoryManagement.API.DTOs;

public class StockInRequestDto
{
    public string InvoiceNumber { get; set; } = string.Empty;

    public string? Notes { get; set; }

    public List<StockInItemDto> Items { get; set; } = new();
}