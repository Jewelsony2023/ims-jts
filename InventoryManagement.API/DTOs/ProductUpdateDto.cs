namespace InventoryManagement.API.DTOs;

public class ProductUpdateDto
{
    public string Name { get; set; } = string.Empty;

    public string Sku { get; set; } = string.Empty;

    public string Barcode { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int CategoryId { get; set; }

    public string? Image { get; set; }

    public int MinimumStockLevel { get; set; }
}