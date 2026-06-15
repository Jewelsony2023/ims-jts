using InventoryManagement.API.DTOs;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface IStockTransactionRepository
{
    Task<List<StockTransactionDto>> GetInventoryAsync();

    Task<StockTransactionDto?> GetProductBatchByIdAsync(int productBatchId);

    Task<int> ProcessStockInAsync(StockInRequestDto request, int userId);

    Task<Dictionary<int, int>> GetCurrentStockByProductBatchIdsAsync(
        IEnumerable<int> productBatchIds);

    Task<BatchDetailsDto?> GetBatchDetailsAsync(
        int productId,
        string batchNumber);
}