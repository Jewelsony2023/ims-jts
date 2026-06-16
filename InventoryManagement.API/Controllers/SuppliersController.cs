using InventoryManagement.API.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;
using InventoryManagement.API.DTOs;
namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SuppliersController : ControllerBase
{
    private readonly ISupplierService _supplierService;

    public SuppliersController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }

    [HttpGet]
    public async Task<IActionResult> GetSuppliers()
    {
        var suppliers = await _supplierService.GetSuppliersAsync();

        return Ok(suppliers);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetSupplier(int id)
    {
        var supplier = await _supplierService.GetSupplierByIdAsync(id);

        if (supplier == null)
        {
            return NotFound();
        }

        return Ok(supplier);
    }
    [HttpPost]
    public async Task<IActionResult> CreateSupplier(
        SupplierCreateDto supplier)
    {
        var supplierId =
            await _supplierService
                .CreateSupplierAsync(supplier);

        return Ok(new
        {
            SupplierId = supplierId
        });
    }
    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateSupplier(
        int id,
        SupplierUpdateDto supplier)
    {
        var updated =
            await _supplierService
                .UpdateSupplierAsync(
                    id,
                    supplier);

        if (!updated)
        {
            return NotFound();
        }

        return Ok();
    }
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteSupplier(
        int id)
    {
        var deleted =
            await _supplierService
                .DeleteSupplierAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return Ok();
    }
}