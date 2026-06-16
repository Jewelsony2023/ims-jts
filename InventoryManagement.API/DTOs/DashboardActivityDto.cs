namespace InventoryManagement.API.DTOs;

public class DashboardActivityDto
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}