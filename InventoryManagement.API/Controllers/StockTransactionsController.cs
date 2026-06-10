using System.Security.Claims;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class StockTransactionsController : ControllerBase
{
    private readonly IStockTransactionService _stockTransactionService;

    public StockTransactionsController(IStockTransactionService stockTransactionService)
    {
        _stockTransactionService = stockTransactionService;
    }

    private int? GetUserId()
    {
        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        return userIdClaim != null && int.TryParse(userIdClaim, out var userId) ? userId : null;
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
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }
        var transactionId = await _stockTransactionService.ProcessStockInAsync(request, userId.Value);
        return Ok(new { TransactionId = transactionId });
    }

    [HttpPost("stock-out")]
    public async Task<IActionResult> StockOut([FromBody] StockOutRequestDto request)
    {
        var userId = GetUserId();
        if (userId == null)
        {
            return Unauthorized();
        }
        var success = await _stockTransactionService.ProcessStockOutAsync(request, userId.Value);
        if (!success)
        {
            return BadRequest(new { Message = "Insufficient stock for one or more items" });
        }
        return Ok();
    }
}