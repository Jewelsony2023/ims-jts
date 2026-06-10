using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Services;

public interface ISupplierService
{
    Task<List<SupplierDto>> GetSuppliersAsync();

    Task<SupplierDto?> GetSupplierByIdAsync(int id);
}