namespace InventoryManagement.API.DTOs;

public class StockOutRequestDto
{
    public string? ReferenceNumber { get; set; }

    public string? IssuedTo { get; set; }

    public List<StockOutItemDto> Items { get; set; } = new();
}