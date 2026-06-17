using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;

namespace InventoryManagement.API.Services;

public class SupplierService : ISupplierService
{
    private readonly ISupplierRepository _supplierRepository;

    public SupplierService(
        ISupplierRepository supplierRepository)
    {
        _supplierRepository = supplierRepository;
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

    public Task<int>
        CreateSupplierAsync(
            SupplierCreateDto supplier)
    {
        return _supplierRepository
            .CreateSupplierAsync(supplier);
    }

    public Task<bool>
        UpdateSupplierAsync(
            int id,
            SupplierUpdateDto supplier)
    {
        return _supplierRepository
            .UpdateSupplierAsync(
                id,
                supplier);
    }

    public Task<bool>
        DeleteSupplierAsync(int id)
    {
        return _supplierRepository
            .DeleteSupplierAsync(id);
    }
}
