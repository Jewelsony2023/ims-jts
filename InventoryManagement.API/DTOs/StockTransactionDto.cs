namespace InventoryManagement.API.DTOs;

public class StockTransactionDto
{
    public int ProductBatchId { get; set; }

    public string Product { get; set; } = string.Empty;

    public string ProductImageUrl { get; set; } = string.Empty;

    public string SKU { get; set; } = string.Empty;

    public string Batch { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public decimal CostPrice { get; set; }

    public string Expiry { get; set; } = string.Empty;

    public int DaysRemaining { get; set; }

    public string Status { get; set; } = string.Empty;
}