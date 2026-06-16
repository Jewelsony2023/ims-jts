using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;

    public ProductsController(IProductService productService)
    {
        _productService = productService;
    }

    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _productService.GetProductsAsync();

        return Ok(products);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetProduct(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);

        if (product == null)
        {
            return NotFound();
        }

        return Ok(product);
    }

    [HttpGet("options")]
    public async Task<IActionResult> GetProductOptions()
    {
        var options = await _productService.GetProductOptionsAsync();
        return Ok(options);
    }

    [HttpGet("batches")]
    public async Task<IActionResult> GetProductBatches()
    {
        var batches = await _productService.GetProductBatchesAsync();
        return Ok(batches);
    }
    [HttpPost]
    public async Task<IActionResult>
        CreateProduct(
            ProductCreateDto product)
    {
        var id =
            await _productService
                .CreateProductAsync(product);

        return Ok(id);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult>
        UpdateProduct(
            int id,
            ProductUpdateDto product)
    {
        var result =
            await _productService
                .UpdateProductAsync(
                    id,
                    product);

        if (!result)
            return NotFound();

        return Ok();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult>
        DeleteProduct(int id)
    {
        var result =
            await _productService
                .DeleteProductAsync(id);

        if (!result)
            return NotFound();

        return Ok();
    }
}
