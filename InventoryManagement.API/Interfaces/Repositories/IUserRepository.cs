using InventoryManagement.API.Models;

namespace InventoryManagement.API.Interfaces.Repositories;

public interface IUserRepository
{
    Task<User?> GetByEmailAsync(string email);

    Task<bool> EmailExistsAsync(string email);

    Task<User> CreateAsync(User user);

    Task<int> GetUserCountAsync();

    // NEW

    Task<List<User>> GetAllUsersAsync();

    Task<User?> GetByIdAsync(int id);

    Task<bool> UpdateAsync(User user);

    Task<bool> ToggleStatusAsync(int id);
}