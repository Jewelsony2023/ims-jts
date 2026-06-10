namespace InventoryManagement.API.DTOs;

public class ProductBatchDto
{
    public int ProductBatchId { get; set; }

    public int ProductId { get; set; }

    public string ProductName { get; set; } = string.Empty;

    public string ProductImageUrl { get; set; } = string.Empty;

    public string SKU { get; set; } = string.Empty;

    public string BatchNumber { get; set; } = string.Empty;

    public int QuantityAvailable { get; set; }

    public decimal CostPrice { get; set; }

    public decimal SellingPrice { get; set; }

    public DateTime ExpiryDate { get; set; }

    public int SupplierId { get; set; }

    public string SupplierName { get; set; } = string.Empty;
}