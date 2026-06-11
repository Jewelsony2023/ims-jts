using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.API.DTOs;

public class StockOutItemDto
{
    public int ProductId { get; set; }

    public int ProductBatchId { get; set; }

    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be greater than zero.")]
    public int Quantity { get; set; }

    public decimal SellingPrice { get; set; }
}