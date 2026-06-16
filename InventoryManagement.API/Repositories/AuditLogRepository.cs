using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Repositories;

public class AuditLogRepository : IAuditLogRepository
{
    private readonly InventoryDbContext _context;

    public AuditLogRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public async Task LogAsync(AuditLog log)
    {
        _context.AuditLogs.Add(log);
        await _context.SaveChangesAsync();
    }

    public async Task<List<AuditLogDto>> GetAuditLogsAsync()
    {
        return await _context.AuditLogs
            .AsNoTracking()
            .Include(log => log.User)
            .OrderByDescending(log => log.CreatedAt)
            .Select(log => new AuditLogDto
            {
                AuditLogId = log.AuditLogId,
                UserId = log.UserId,
                UserEmail = log.User != null ? log.User.Email : string.Empty,
                EntityName = log.EntityName,
                EntityId = log.EntityId,
                Action = log.Action,
                CreatedAt = log.CreatedAt
            })
            .ToListAsync();
    }
}
