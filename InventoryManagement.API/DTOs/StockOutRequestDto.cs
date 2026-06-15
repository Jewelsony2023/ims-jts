using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.API.DTOs;

public class StockOutRequestDto
{
    [Required(ErrorMessage = "Reference Number is required.")]
    public string ReferenceNumber { get; set; } = string.Empty;

    [Required(ErrorMessage = "Issued To is required.")]
    public string IssuedTo { get; set; } = string.Empty;

    [MinLength(1, ErrorMessage = "At least one item is required.")]
    public List<StockOutItemDto> Items { get; set; } = new();
}