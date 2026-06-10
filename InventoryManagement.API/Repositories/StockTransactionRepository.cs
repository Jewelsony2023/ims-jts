using InventoryManagement.API.Data;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Repositories;

public class StockTransactionRepository : IStockTransactionRepository
{
    private readonly InventoryDbContext _context;

    public StockTransactionRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public async Task<List<StockTransactionDto>> GetInventoryAsync()
    {
        var today = DateTime.UtcNow.Date;
        var expiringSoonDate = today.AddDays(30);

        return await _context.ProductBatches
            .AsNoTracking()
            .Where(pb => pb.Product != null)
            .Select(pb => new StockTransactionDto
            {
                ProductBatchId = pb.ProductBatchId,
                Product = pb.Product!.ProductName,
                ProductImageUrl = pb.Product.ProductImageUrl ?? string.Empty,
                SKU = pb.Product.SKU,
                Batch = pb.BatchNumber,
                Quantity = pb.QuantityAvailable,
                CostPrice = pb.CostPrice,
                Expiry = pb.ExpiryDate.ToString("yyyy-MM-dd"),
                DaysRemaining = (int)(pb.ExpiryDate.Date - today).TotalDays,
                Status = pb.QuantityAvailable == 0 || pb.ExpiryDate.Date < today
                    ? "Expired"
                    : pb.ExpiryDate.Date >= today && pb.ExpiryDate.Date <= expiringSoonDate
                        ? "Expiring Soon"
                        : pb.QuantityAvailable <= 0
                            ? "Expired"
                            : "Good"
            })
            .ToListAsync();
    }

    public async Task<StockTransactionDto?> GetProductBatchByIdAsync(int productBatchId)
    {
        var today = DateTime.UtcNow.Date;
        var expiringSoonDate = today.AddDays(30);

        return await _context.ProductBatches
            .AsNoTracking()
            .Where(pb => pb.ProductBatchId == productBatchId && pb.Product != null)
            .Select(pb => new StockTransactionDto
            {
                ProductBatchId = pb.ProductBatchId,
                Product = pb.Product!.ProductName,
                ProductImageUrl = pb.Product.ProductImageUrl ?? string.Empty,
                SKU = pb.Product.SKU,
                Batch = pb.BatchNumber,
                Quantity = pb.QuantityAvailable,
                CostPrice = pb.CostPrice,
                Expiry = pb.ExpiryDate.ToString("yyyy-MM-dd"),
                DaysRemaining = (int)(pb.ExpiryDate.Date - today).TotalDays,
                Status = pb.QuantityAvailable == 0 || pb.ExpiryDate.Date < today
                    ? "Expired"
                    : pb.ExpiryDate.Date >= today && pb.ExpiryDate.Date <= expiringSoonDate
                        ? "Expiring Soon"
                        : pb.QuantityAvailable <= 0
                            ? "Expired"
                            : "Good"
            })
            .FirstOrDefaultAsync();
    }

    public async Task<int> ProcessStockInAsync(StockInRequestDto request, int userId)
    {
        var header = new StockTransactionHeader
        {
            UserId = userId,
            TransactionType = "StockIn",
            InvoiceNumber = request.InvoiceNumber,
            Notes = request.Notes,
            CreatedAt = DateTime.UtcNow
        };

        _context.StockTransactionHeaders.Add(header);
        await _context.SaveChangesAsync();

        foreach (var item in request.Items)
        {
            var batch = await _context.ProductBatches
                .FirstOrDefaultAsync(pb => pb.ProductBatchId == item.ProductBatchId && pb.ProductId == item.ProductId);

            if (batch == null)
            {
                batch = new ProductBatch
                {
                    ProductId = item.ProductId,
                    SupplierId = item.SupplierId,
                    BatchNumber = item.BatchNumber,
                    ManufactureDate = item.ManufactureDate,
                    ExpiryDate = item.ExpiryDate,
                    QuantityAvailable = item.Quantity,
                    CostPrice = item.CostPrice,
                    SellingPrice = item.SellingPrice
                };
                _context.ProductBatches.Add(batch);
            }
            else
            {
                batch.QuantityAvailable += item.Quantity;
            }

            var transactionItem = new StockTransactionItem
            {
                StockTransactionHeaderId = header.StockTransactionHeaderId,
                ProductId = item.ProductId,
                ProductBatchId = batch.ProductBatchId,
                TransactionType = "StockIn",
                Quantity = item.Quantity,
                CostPriceAtTransaction = item.CostPrice,
                SellingPriceAtTransaction = item.SellingPrice
            };
            _context.StockTransactionItems.Add(transactionItem);
        }

        await _context.SaveChangesAsync();
        return header.StockTransactionHeaderId;
    }

    public async Task<Dictionary<int, int>> GetCurrentStockByProductBatchIdsAsync(IEnumerable<int> productBatchIds)
    {
        return await _context.ProductBatches
            .AsNoTracking()
            .Where(pb => productBatchIds.Contains(pb.ProductBatchId))
            .ToDictionaryAsync(pb => pb.ProductBatchId, pb => pb.QuantityAvailable);
    }
}