using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;
using InventoryManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Services;

public class StockTransactionService : IStockTransactionService
{
    private readonly IStockTransactionRepository _stockTransactionRepository;
    private readonly InventoryDbContext _context;
    private readonly IAuditLogService _auditLogService;

    public StockTransactionService(
        IStockTransactionRepository stockTransactionRepository,
        InventoryDbContext context,
        IAuditLogService auditLogService)
    {
        _stockTransactionRepository = stockTransactionRepository;
        _context = context;
        _auditLogService = auditLogService;
    }

    public Task<List<StockTransactionDto>> GetInventoryAsync()
    {
        return _stockTransactionRepository.GetInventoryAsync();
    }

    public Task<StockTransactionDto?> GetProductBatchByIdAsync(int productBatchId)
    {
        return _stockTransactionRepository.GetProductBatchByIdAsync(productBatchId);
    }

    public async Task<int> ProcessStockInAsync(StockInRequestDto request, int userId)
    {
        var transactionId = await _stockTransactionRepository.ProcessStockInAsync(request, userId);

        await _auditLogService.LogAsync(new AuditLog
        {
            UserId = 1,
            EntityName = "StockTransaction",
            EntityId = transactionId,
            Action = "STOCK_IN",
            CreatedAt = DateTime.UtcNow
        });

        return transactionId;
    }

    public async Task<bool> ProcessStockOutAsync(StockOutRequestDto request, int userId)
    {
        var productBatchIds = request.Items.Select(i => i.ProductBatchId).ToList();
        if (productBatchIds.Count != productBatchIds.Distinct().Count())
            {
                return false;
            }
        var currentStock = await _stockTransactionRepository.GetCurrentStockByProductBatchIdsAsync(productBatchIds);

        foreach (var item in request.Items)
        {
            var available = currentStock.GetValueOrDefault(item.ProductBatchId, 0);
            if (item.Quantity > available)
            {
                return false;
            }
        }

        var header = new StockTransactionHeader
        {
            UserId = userId,
            TransactionType = "StockOut",
            InvoiceNumber = request.ReferenceNumber ?? string.Empty,
            Notes = request.IssuedTo,
            CreatedAt = DateTime.UtcNow
        };

        _context.StockTransactionHeaders.Add(header);
        await _context.SaveChangesAsync();

        foreach (var item in request.Items)
        {
            var batch = await _context.ProductBatches
                .FirstOrDefaultAsync(pb => pb.ProductBatchId == item.ProductBatchId);
            var costPrice = batch?.CostPrice ?? 0;

            if (batch != null)
            {
                batch.QuantityAvailable -= item.Quantity;
            }

            var transactionItem = new StockTransactionItem
            {
                StockTransactionHeaderId = header.StockTransactionHeaderId,
                ProductId = item.ProductId,
                ProductBatchId = item.ProductBatchId,
                TransactionType = "StockOut",
                Quantity = item.Quantity,
                CostPriceAtTransaction = costPrice,
                SellingPriceAtTransaction = item.SellingPrice
            };
            _context.StockTransactionItems.Add(transactionItem);
        }


        await _context.SaveChangesAsync();
        await _auditLogService.LogAsync(new AuditLog
        {
            UserId = 1,
            EntityName = "StockTransaction",
            EntityId = header.StockTransactionHeaderId,
            Action = "STOCK_OUT",
            CreatedAt = DateTime.UtcNow
        });
        return true;
    }

    public Task<BatchDetailsDto?> GetBatchDetailsAsync(
        int productId,
        string batchNumber)
    {
        return _stockTransactionRepository
            .GetBatchDetailsAsync(
                productId,
                batchNumber);
    }
}
