using InventoryManagement.API.DTOs;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface IAuditLogRepository
{
    Task LogAsync(AuditLog log);

    Task<List<AuditLogDto>> GetAuditLogsAsync();
}
