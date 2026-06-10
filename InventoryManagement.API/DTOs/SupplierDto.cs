namespace InventoryManagement.API.DTOs;

public class SupplierDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string Contact { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Address { get; set; } = string.Empty;

    public int ProductsSupplied { get; set; }

    public int LeadTime { get; set; }

    public string Status { get; set; } = string.Empty;

    public string? LinkedProducts { get; set; }

    public string? OnTimeRate { get; set; }

    public string? DefectRate { get; set; }

    public int? Rating { get; set; }
}