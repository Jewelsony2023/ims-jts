namespace InventoryManagement.API.DTOs;

public class AuditLogDto
{
    public int AuditLogId { get; set; }

    public int UserId { get; set; }

    public string UserEmail { get; set; } = string.Empty;

    public string EntityName { get; set; } = string.Empty;

    public int EntityId { get; set; }

    public string Action { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}
