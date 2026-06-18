using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.API.DTOs;

public class StockInRequestDto
{
    /// <summary>
    /// validation
    /// </summary>
    [Required(ErrorMessage = "Purchase Order Number is required.")]
    public string InvoiceNumber { get; set; } = string.Empty;

    public string? Notes { get; set; }
    /// <summary>
    /// valiation
    /// </summary>
    [MinLength(1, ErrorMessage = "At least one item is required.")]
    public List<StockInItemDto> Items { get; set; } = new();
}