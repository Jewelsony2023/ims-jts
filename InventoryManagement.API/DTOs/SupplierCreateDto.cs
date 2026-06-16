using System.ComponentModel.DataAnnotations;

namespace InventoryManagement.API.DTOs;

public class SupplierCreateDto
{
    [Required]
    public string Name { get; set; } = string.Empty;

    [Required]
    public string Contact { get; set; } = string.Empty;

    [Required]
    public string Email { get; set; } = string.Empty;

    [Required]
    public string Phone { get; set; } = string.Empty;

    [Required]
    public string Address { get; set; } = string.Empty;

    public int LeadTime { get; set; }

    public bool IsActive { get; set; } = true;
}