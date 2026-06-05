namespace InventoryManagement.API.Models;

public class ProductBatch
{
    public int ProductBatchId { get; set; }

    public int ProductId { get; set; }

    public int SupplierId { get; set; }

    public int? PurchaseOrderId { get; set; }

    public string BatchNumber { get; set; } = string.Empty;

    public DateTime ManufactureDate { get; set; }

    public DateTime ExpiryDate { get; set; }

    public int QuantityAvailable { get; set; }

    public decimal CostPrice { get; set; }

    public decimal SellingPrice { get; set; }

    public Product? Product { get; set; }

    public Supplier? Supplier { get; set; }

    public PurchaseOrder? PurchaseOrder { get; set; }
}