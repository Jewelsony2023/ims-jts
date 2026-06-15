namespace InventoryManagement.API.DTOs;

public class BatchDetailsDto
{
    public int ProductBatchId { get; set; }

    public int SupplierId { get; set; }

    public DateTime ManufactureDate { get; set; }

    public DateTime ExpiryDate { get; set; }

    public decimal CostPrice { get; set; }

    public decimal SellingPrice { get; set; }
}