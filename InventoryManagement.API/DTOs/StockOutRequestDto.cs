using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.API.DTOs;

public class StockOutRequestDto
{
    public string? ReferenceNumber { get; set; }

    public string? IssuedTo { get; set; }

    [MinLength(1, ErrorMessage = "At least one item is required.")]
    public List<StockOutItemDto> Items { get; set; } = new();
}