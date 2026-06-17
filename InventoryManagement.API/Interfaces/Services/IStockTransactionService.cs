using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Services;

public interface IStockTransactionService
{
    Task<List<StockTransactionDto>> GetInventoryAsync();

    Task<StockTransactionDto?> GetProductBatchByIdAsync(int productBatchId);

    Task<int> ProcessStockInAsync(StockInRequestDto request, int userId);

    Task<bool> ProcessStockOutAsync(StockOutRequestDto request, int userId);

    Task<List<StockActivityDto>> GetRecentStockInAsync();

    Task<List<StockActivityDto>> GetRecentStockOutAsync();

    Task<BatchDetailsDto?> GetBatchDetailsAsync(
        int productId,
        string batchNumber);
}
