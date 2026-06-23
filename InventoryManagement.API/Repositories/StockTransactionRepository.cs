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
            .Select(pb => new
            {
                ProductBatch = pb,
                LatestTransactionDate = _context.StockTransactionItems
                    .AsNoTracking()
                    .Where(transactionItem => transactionItem.ProductBatchId == pb.ProductBatchId)
                    .Select(transactionItem => (DateTime?)transactionItem.StockTransactionHeader!.CreatedAt)
                    .Max()
            })
            .OrderByDescending(item => item.LatestTransactionDate)
            .ThenBy(item => item.ProductBatch.Product!.ProductName)
            .Select(item => new StockTransactionDto
            {
                ProductBatchId = item.ProductBatch.ProductBatchId,
                Product = item.ProductBatch.Product!.ProductName,
                ProductImageUrl = item.ProductBatch.Product.ProductImageUrl ?? string.Empty,
                SKU = item.ProductBatch.Product.SKU,
                Batch = item.ProductBatch.BatchNumber,
                Quantity = item.ProductBatch.QuantityAvailable,
                CostPrice = item.ProductBatch.CostPrice,
                Expiry = item.ProductBatch.ExpiryDate.ToString("yyyy-MM-dd"),
                DaysRemaining = (int)(item.ProductBatch.ExpiryDate.Date - today).TotalDays,
                Status = item.ProductBatch.QuantityAvailable == 0 || item.ProductBatch.ExpiryDate.Date < today
                    ? "Expired"
                    : item.ProductBatch.QuantityAvailable <= item.ProductBatch.Product!.MinimumStockLevel
                        ? "Low Stock"
                        : item.ProductBatch.ExpiryDate.Date >= today && item.ProductBatch.ExpiryDate.Date <= expiringSoonDate
                            ? "Expiring Soon"
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
            .Select(pb => new
            {
                ProductBatch = pb,
                LatestTransactionDate = _context.StockTransactionItems
                    .AsNoTracking()
                    .Where(transactionItem => transactionItem.ProductBatchId == pb.ProductBatchId)
                    .Select(transactionItem => (DateTime?)transactionItem.StockTransactionHeader!.CreatedAt)
                    .Max()
            })
            .Select(item => new StockTransactionDto
            {
                ProductBatchId = item.ProductBatch.ProductBatchId,
                Product = item.ProductBatch.Product!.ProductName,
                ProductImageUrl = item.ProductBatch.Product.ProductImageUrl ?? string.Empty,
                SKU = item.ProductBatch.Product.SKU,
                Batch = item.ProductBatch.BatchNumber,
                Quantity = item.ProductBatch.QuantityAvailable,
                CostPrice = item.ProductBatch.CostPrice,
                Expiry = item.ProductBatch.ExpiryDate.ToString("yyyy-MM-dd"),
                DaysRemaining = (int)(item.ProductBatch.ExpiryDate.Date - today).TotalDays,
                Status = item.ProductBatch.QuantityAvailable == 0 || item.ProductBatch.ExpiryDate.Date < today
                    ? "Expired"
                    : item.ProductBatch.QuantityAvailable <= item.ProductBatch.Product!.MinimumStockLevel
                        ? "Low Stock"
                        : item.ProductBatch.ExpiryDate.Date >= today && item.ProductBatch.ExpiryDate.Date <= expiringSoonDate
                            ? "Expiring Soon"
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
            var normalizedBatchNumber =
                item.BatchNumber.Trim().ToUpper();

            var batch = await _context.ProductBatches
                .FirstOrDefaultAsync(
                    pb => pb.ProductId == item.ProductId
                    && pb.BatchNumber == normalizedBatchNumber);

            if (batch == null)
            {
                batch = new ProductBatch
                {
                    ProductId = item.ProductId,
                    SupplierId = item.SupplierId,
                    BatchNumber = normalizedBatchNumber,
                    ManufactureDate = item.ManufactureDate,
                    ExpiryDate = item.ExpiryDate,
                    QuantityAvailable = item.Quantity,
                    CostPrice = item.CostPrice,
                    SellingPrice = item.SellingPrice
                };

                _context.ProductBatches.Add(batch);

                // Save immediately so SQL generates ProductBatchId
                await _context.SaveChangesAsync();
            }
            else
            {
                if (batch.SupplierId != item.SupplierId ||
                    batch.ManufactureDate.Date != item.ManufactureDate.Date ||
                    batch.ExpiryDate.Date != item.ExpiryDate.Date ||
                    batch.CostPrice != item.CostPrice ||
                    batch.SellingPrice != item.SellingPrice)
                {
                    throw new InvalidOperationException(
                        $"Batch {item.BatchNumber} already exists with different details.");
                }

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
            Console.WriteLine
            (
                $"BatchId={batch.ProductBatchId}, ProductId={item.ProductId}"
            );
            _context.StockTransactionItems.Add(transactionItem);
            Console.WriteLine("About to save transaction item");
        }

        Console.WriteLine("Starting final SaveChanges");

        await _context.SaveChangesAsync();

        Console.WriteLine("Final SaveChanges completed");
        return header.StockTransactionHeaderId;
    }

    public async Task<List<StockActivityDto>> GetRecentStockInAsync()
    {
        return await _context.StockTransactionItems
            .AsNoTracking()
            .Where(item => item.TransactionType == "StockIn" && item.StockTransactionHeader != null)
            .OrderByDescending(item => item.StockTransactionHeader!.CreatedAt)
            .ThenByDescending(item => item.StockTransactionItemId)
            .Select(item => new StockActivityDto
            {
                CreatedAt = item.StockTransactionHeader!.CreatedAt,
                TransactionType = item.TransactionType,
                ProductName = item.Product != null ? item.Product.ProductName : string.Empty,
                BatchNumber = item.ProductBatch != null ? item.ProductBatch.BatchNumber : string.Empty,
                Quantity = item.Quantity,
                UserName = item.StockTransactionHeader!.User != null
                    ? (string.IsNullOrWhiteSpace(item.StockTransactionHeader.User.FullName)
                        ? item.StockTransactionHeader.User.Username
                        : item.StockTransactionHeader.User.FullName)
                    : string.Empty,
                Reference = item.StockTransactionHeader!.InvoiceNumber,
                SupplierOrIssuedTo = item.ProductBatch != null && item.ProductBatch.Supplier != null
                    ? item.ProductBatch.Supplier.SupplierName
                    : string.Empty
            })
            .Take(20)
            .ToListAsync();
    }

    public async Task<List<StockActivityDto>> GetRecentStockOutAsync()
    {
        return await _context.StockTransactionItems
            .AsNoTracking()
            .Where(item => item.TransactionType == "StockOut" && item.StockTransactionHeader != null)
            .OrderByDescending(item => item.StockTransactionHeader!.CreatedAt)
            .ThenByDescending(item => item.StockTransactionItemId)
            .Select(item => new StockActivityDto
            {
                CreatedAt = item.StockTransactionHeader!.CreatedAt,
                TransactionType = item.TransactionType,
                ProductName = item.Product != null ? item.Product.ProductName : string.Empty,
                BatchNumber = item.ProductBatch != null ? item.ProductBatch.BatchNumber : string.Empty,
                Quantity = item.Quantity,
                UserName = item.StockTransactionHeader!.User != null
                    ? (string.IsNullOrWhiteSpace(item.StockTransactionHeader.User.FullName)
                        ? item.StockTransactionHeader.User.Username
                        : item.StockTransactionHeader.User.FullName)
                    : string.Empty,
                Reference = item.StockTransactionHeader!.InvoiceNumber,
                SupplierOrIssuedTo = item.StockTransactionHeader!.Notes ?? string.Empty
            })
            .Take(20)
            .ToListAsync();
    }

    public async Task<Dictionary<int, int>> GetCurrentStockByProductBatchIdsAsync(IEnumerable<int> productBatchIds)
    {
        return await _context.ProductBatches
            .AsNoTracking()
            .Where(pb => productBatchIds.Contains(pb.ProductBatchId))
            .ToDictionaryAsync(pb => pb.ProductBatchId, pb => pb.QuantityAvailable);
    }
    public async Task<BatchDetailsDto?> GetBatchDetailsAsync(
        int productId,
        string batchNumber)
    {
        var normalizedBatchNumber =
            batchNumber.Trim().ToUpper();

        return await _context.ProductBatches
            .AsNoTracking()
            .Where(pb =>
                pb.ProductId == productId &&
                pb.BatchNumber == normalizedBatchNumber)
            .Select(pb => new BatchDetailsDto
            {
                ProductBatchId = pb.ProductBatchId,
                SupplierId = pb.SupplierId,
                ManufactureDate = pb.ManufactureDate,
                ExpiryDate = pb.ExpiryDate,
                CostPrice = pb.CostPrice,
                SellingPrice = pb.SellingPrice
            })
            .FirstOrDefaultAsync();
    }
}
