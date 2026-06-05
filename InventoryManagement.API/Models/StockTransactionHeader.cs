namespace InventoryManagement.API.Models;

public class StockTransactionHeader
{
    public int StockTransactionHeaderId { get; set; }

    public int UserId { get; set; }

    public int? SupplierId { get; set; }

    public string TransactionType { get; set; } = string.Empty;

    public string InvoiceNumber { get; set; } = string.Empty;

    public string? Notes { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public User? User { get; set; }

    public Supplier? Supplier { get; set; }
}