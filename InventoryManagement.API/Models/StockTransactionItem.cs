namespace InventoryManagement.API.Models;

public class StockTransactionItem
{
    public int StockTransactionItemId { get; set; }

    public int StockTransactionHeaderId { get; set; }

    public int ProductId { get; set; }

    public int ProductBatchId { get; set; }

    public string TransactionType { get; set; } = string.Empty;

    public int Quantity { get; set; }

    public decimal CostPriceAtTransaction { get; set; }

    public decimal SellingPriceAtTransaction { get; set; }

    public StockTransactionHeader? StockTransactionHeader { get; set; }

    public Product? Product { get; set; }

    public ProductBatch? ProductBatch { get; set; }
}