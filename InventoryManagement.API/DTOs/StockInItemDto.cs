namespace InventoryManagement.API.DTOs;

public class StockInItemDto
{
    public int ProductId { get; set; }

    public int? ProductBatchId { get; set; }

    public string BatchNumber { get; set; } = string.Empty;

    public DateTime ManufactureDate { get; set; }

    public DateTime ExpiryDate { get; set; }

    public int Quantity { get; set; }

    public decimal CostPrice { get; set; }

    public decimal SellingPrice { get; set; }

    public int SupplierId { get; set; }
}