using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Services;

public class AuditLogService : IAuditLogService
{
    private readonly IAuditLogRepository _auditLogRepository;

    public AuditLogService(IAuditLogRepository auditLogRepository)
    {
        _auditLogRepository = auditLogRepository;
    }

    public Task LogAsync(AuditLog log)
    {
        return _auditLogRepository.LogAsync(log);
    }

    public Task<List<AuditLogDto>> GetAuditLogsAsync()
    {
        return _auditLogRepository.GetAuditLogsAsync();
    }
}
