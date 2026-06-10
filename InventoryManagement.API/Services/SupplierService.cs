using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;

namespace InventoryManagement.API.Services;

public class SupplierService : ISupplierService
{
    private readonly ISupplierRepository _supplierRepository;

    public SupplierService(ISupplierRepository supplierRepository)
    {
        _supplierRepository = supplierRepository;
    }

    public Task<List<SupplierDto>> GetSuppliersAsync()
    {
        return _supplierRepository.GetSuppliersAsync();
    }

    public Task<SupplierDto?> GetSupplierByIdAsync(int id)
    {
        return _supplierRepository.GetSupplierByIdAsync(id);
    }
}