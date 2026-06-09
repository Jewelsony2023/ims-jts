namespace InventoryManagement.API.DTOs;

public class ProductDto
{
    public int Id { get; set; }

    public string Image { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string Sku { get; set; } = string.Empty;

    public string Barcode { get; set; } = string.Empty;

    public string Category { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public int Stock { get; set; }

    public string Status { get; set; } = string.Empty;
}
