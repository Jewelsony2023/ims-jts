namespace InventoryManagement.API.DTOs;

public class StockActivityDto
{
    public DateTime CreatedAt { get; set; }

    public string TransactionType { get; set; } = string.Empty;

    public string ProductName { get; set; } = string.Empty;

    public string BatchNumber { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public string UserName { get; set; } = string.Empty;

    public string Reference { get; set; } = string.Empty;

    public string SupplierOrIssuedTo { get; set; } = string.Empty;
}
