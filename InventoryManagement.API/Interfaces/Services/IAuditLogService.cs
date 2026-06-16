using InventoryManagement.API.DTOs;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Interfaces.Services;

public interface IAuditLogService
{
    Task LogAsync(AuditLog log);

    Task<List<AuditLogDto>> GetAuditLogsAsync();
}
