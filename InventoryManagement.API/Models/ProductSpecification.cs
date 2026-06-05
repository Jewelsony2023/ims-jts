namespace InventoryManagement.API.Models;

public class ProductSpecification
{
    public int ProductSpecificationId { get; set; }

    public int ProductId { get; set; }

    public string AttributeName { get; set; } = string.Empty;

    public string AttributeValue { get; set; } = string.Empty;

    public string? Unit { get; set; }

    public Product? Product { get; set; }
}