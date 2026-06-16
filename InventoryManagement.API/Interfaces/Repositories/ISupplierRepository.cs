using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface ISupplierRepository
{
    Task<List<SupplierDto>> GetSuppliersAsync();

    Task<SupplierDto?> GetSupplierByIdAsync(int id);
    Task<int> CreateSupplierAsync(
        SupplierCreateDto supplier);

    Task<bool> UpdateSupplierAsync(
        int id,
        SupplierUpdateDto supplier);

    Task<bool> DeleteSupplierAsync(
        int id);
}