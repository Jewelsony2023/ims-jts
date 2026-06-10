using InventoryManagement.API.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

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
}