using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface ISupplierRepository
{
    Task<List<SupplierDto>> GetSuppliersAsync();

    Task<SupplierDto?> GetSupplierByIdAsync(int id);
}