using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StockTransactionsController : ControllerBase
{
    private readonly IStockTransactionService _stockTransactionService;

    public StockTransactionsController(IStockTransactionService stockTransactionService)
    {
        _stockTransactionService = stockTransactionService;
    }

    [HttpGet("inventory")]
    public async Task<IActionResult> GetInventory()
    {
        var inventory = await _stockTransactionService.GetInventoryAsync();
        return Ok(inventory);
    }

    [HttpPost("stock-in")]
    public async Task<IActionResult> StockIn([FromBody] StockInRequestDto request)
    {
        var transactionId = await _stockTransactionService.ProcessStockInAsync(request, 1);
        return Ok(new { TransactionId = transactionId });
    }

    [HttpPost("stock-out")]
    public async Task<IActionResult> StockOut([FromBody] StockOutRequestDto request)
    {
        var success = await _stockTransactionService.ProcessStockOutAsync(request, 1);
        if (!success)
        {
            return BadRequest(new { Message = "Insufficient stock for one or more items" });
        }
        return Ok();
    }
}