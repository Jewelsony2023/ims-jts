using InventoryManagement.API.Data;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Models;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.API.Repositories;

public class UserRepository : IUserRepository
{
    private readonly InventoryDbContext _context;

    public UserRepository(InventoryDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Email == email);
    }

    public async Task<bool> EmailExistsAsync(string email)
    {
        return await _context.Users
            .AnyAsync(u => u.Email == email);
            
    }

    public async Task<User> CreateAsync(User user)
    {
        _context.Users.Add(user);

        await _context.SaveChangesAsync();

        return user;
    }
    public async Task<int> GetUserCountAsync()
    {
        return await _context.Users.CountAsync();
    }
    public async Task<List<User>> GetAllUsersAsync()
    {
        return await _context.Users
            .Include(u => u.Role)
            .Where(u => u.DeletedAt == null)
            .OrderBy(u => u.FullName)
            .ToListAsync();
    }

    public async Task<User?> GetByIdAsync(int id)
    {
        return await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u =>
                u.UserId == id &&
                u.DeletedAt == null);
    }

    public async Task<bool> UpdateAsync(User user)
    {
        _context.Users.Update(user);

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> ToggleStatusAsync(int id)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u =>
                u.UserId == id &&
                u.DeletedAt == null);

        if (user == null)
            return false;

        user.IsActive = !user.IsActive;
        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return true;
    }
}