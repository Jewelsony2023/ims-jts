namespace InventoryManagement.API.DTOs;

public class StockOutItemDto
{
    public int ProductId { get; set; }

    public int ProductBatchId { get; set; }

    public int Quantity { get; set; }

    public decimal SellingPrice { get; set; }
}