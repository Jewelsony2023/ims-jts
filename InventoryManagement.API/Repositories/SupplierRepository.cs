using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using Microsoft.EntityFrameworkCore;
using InventoryManagement.API.Models;

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
    public async Task<int> CreateSupplierAsync(
        SupplierCreateDto supplier)
    {
        var entity = new Supplier
        {
            SupplierName = supplier.Name,
            ContactPerson = supplier.Contact,
            Email = supplier.Email,
            Phone = supplier.Phone,
            Address = supplier.Address,
            LeadTimeDays = supplier.LeadTime,
            IsActive = supplier.IsActive
        };

        _context.Suppliers.Add(entity);

        await _context.SaveChangesAsync();

        return entity.SupplierId;
    }

    public async Task<bool> UpdateSupplierAsync(
        int id,
        SupplierUpdateDto supplier)
    {
        var entity =
            await _context.Suppliers
                .FirstOrDefaultAsync(x =>
                    x.SupplierId == id &&
                    x.DeletedAt == null);

        if (entity == null)
        {
            return false;
        }

        entity.SupplierName = supplier.Name;
        entity.ContactPerson = supplier.Contact;
        entity.Email = supplier.Email;
        entity.Phone = supplier.Phone;
        entity.Address = supplier.Address;
        entity.LeadTimeDays = supplier.LeadTime;
        entity.IsActive = supplier.IsActive;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteSupplierAsync(
        int id)
    {
        var entity =
            await _context.Suppliers
                .FirstOrDefaultAsync(x =>
                    x.SupplierId == id &&
                    x.DeletedAt == null);

        if (entity == null)
        {
            return false;
        }

        entity.DeletedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
}