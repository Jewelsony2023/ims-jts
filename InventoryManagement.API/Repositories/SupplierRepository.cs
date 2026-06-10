using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Repositories;

public class SupplierRepository : ISupplierRepository
{
    private readonly InventoryDbContext _context;

    public SupplierRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public Task<List<SupplierDto>> GetSuppliersAsync()
    {
        return BuildSupplierQuery()
            .OrderBy(supplier => supplier.Name)
            .ToListAsync();
    }

    public Task<SupplierDto?> GetSupplierByIdAsync(int id)
    {
        return BuildSupplierQuery()
            .FirstOrDefaultAsync(supplier => supplier.Id == id);
    }

    private IQueryable<SupplierDto> BuildSupplierQuery()
    {
        return _context.Suppliers
            .AsNoTracking()
            .Where(supplier => supplier.DeletedAt == null)
            .GroupJoin(
                _context.ProductBatches.AsNoTracking(),
                supplier => supplier.SupplierId,
                batch => batch.SupplierId,
                (supplier, batches) => new
                {
                    Supplier = supplier,
                    ProductsSupplied = batches.Count()
                })
            .Select(item => new SupplierDto
            {
                Id = item.Supplier.SupplierId,
                Name = item.Supplier.SupplierName,
                Contact = item.Supplier.ContactPerson,
                Email = item.Supplier.Email,
                Phone = item.Supplier.Phone,
                Address = item.Supplier.Address,
                ProductsSupplied = item.ProductsSupplied,
                LeadTime = item.Supplier.LeadTimeDays,
                Status = item.Supplier.IsActive ? "Active" : "Inactive"
            });
    }
}