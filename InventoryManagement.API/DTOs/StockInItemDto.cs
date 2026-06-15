using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.API.DTOs;

public class StockInItemDto
{
    public int ProductId { get; set; }

    public int? ProductBatchId { get; set; }

    [Required(ErrorMessage = "Batch Number is required.")]
    public string BatchNumber { get; set; } = string.Empty;

    public DateTime ManufactureDate { get; set; }

    public DateTime ExpiryDate { get; set; }

    [Range(1, int.MaxValue,
        ErrorMessage = "Quantity must be greater than zero.")]
    public int Quantity { get; set; }

    [Range(0.01, double.MaxValue,
        ErrorMessage = "Cost Price must be greater than zero.")]
    public decimal CostPrice { get; set; }

    [Range(0.01, double.MaxValue,
        ErrorMessage = "Selling Price must be greater than zero.")]
    public decimal SellingPrice { get; set; }

    [Range(1, int.MaxValue,
        ErrorMessage = "Supplier is required.")]
    public int SupplierId { get; set; }
}