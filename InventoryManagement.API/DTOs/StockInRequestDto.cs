using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.API.DTOs;

public class StockInRequestDto
{
    [Required(ErrorMessage = "InvoiceNumber is required.")]
    public string InvoiceNumber { get; set; } = string.Empty;

    public string? Notes { get; set; }

    [MinLength(1, ErrorMessage = "At least one item is required.")]
    public List<StockInItemDto> Items { get; set; } = new();
}