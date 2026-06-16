using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Services;

public class SupplierService : ISupplierService
{
    private readonly ISupplierRepository _supplierRepository;
    private readonly IAuditLogService _auditLogService;

    public SupplierService(
        ISupplierRepository supplierRepository,
        IAuditLogService auditLogService)
    {
        _supplierRepository = supplierRepository;
        _auditLogService = auditLogService;
    }

    public Task<List<SupplierDto>>
        GetSuppliersAsync()
    {
        return _supplierRepository
            .GetSuppliersAsync();
    }

    public Task<SupplierDto?>
        GetSupplierByIdAsync(int id)
    {
        return _supplierRepository
            .GetSupplierByIdAsync(id);
    }

    public async Task<int>
        CreateSupplierAsync(
            SupplierCreateDto supplier)
    {
        var id = await _supplierRepository.CreateSupplierAsync(supplier);

        await _auditLogService.LogAsync(new AuditLog
        {
            UserId = 1,
            EntityName = "Supplier",
            EntityId = id,
            Action = "CREATE_SUPPLIER",
            CreatedAt = DateTime.UtcNow
        });

        return id;
    }

    public async Task<bool>
        UpdateSupplierAsync(
            int id,
            SupplierUpdateDto supplier)
    {
        var updated = await _supplierRepository.UpdateSupplierAsync(id, supplier);

        if (updated)
        {
            await _auditLogService.LogAsync(new AuditLog
            {
                UserId = 1,
                EntityName = "Supplier",
                EntityId = id,
                Action = "UPDATE_SUPPLIER",
                CreatedAt = DateTime.UtcNow
            });
        }

        return updated;
    }

    public async Task<bool>
        DeleteSupplierAsync(int id)
    {
        var deleted = await _supplierRepository.DeleteSupplierAsync(id);

        if (deleted)
        {
            await _auditLogService.LogAsync(new AuditLog
            {
                UserId = 1,
                EntityName = "Supplier",
                EntityId = id,
                Action = "DELETE_SUPPLIER",
                CreatedAt = DateTime.UtcNow
            });
        }

        return deleted;
    }
}
