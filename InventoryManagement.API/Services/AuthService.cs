using InventoryManagement.API.Authentication;
using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Repositories;
using InventoryManagement.API.Interfaces.Services;
using InventoryManagement.API.Models;

namespace InventoryManagement.API.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<AuthResponseDto> RegisterAsync(
        RegisterRequestDto request)
    {
        var emailExists =
            await _userRepository.EmailExistsAsync(
                request.Email);

        if (emailExists)
        {
            throw new Exception(
                "Email already exists.");
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            Username = request.Email,
            RoleId = request.RoleId,
            PasswordHash =
                PasswordHasher.HashPassword(
                    request.Password)
        };

        await _userRepository.CreateAsync(user);

        return new AuthResponseDto
        {
            Email = user.Email,
            Role = "User",
            Token = string.Empty
        };
    }

    public async Task<AuthResponseDto> LoginAsync(
        LoginRequestDto request)
    {
        var user =
            await _userRepository.GetByEmailAsync(
                request.Email);

        if (user == null)
        {
            throw new Exception(
                "Invalid email or password.");
        }

        var passwordValid =
            PasswordHasher.VerifyPassword(
                request.Password,
                user.PasswordHash);

        if (!passwordValid)
        {
            throw new Exception(
                "Invalid email or password.");
        }

        return new AuthResponseDto
        {
            Email = user.Email,
            Role = user.Role?.RoleName ?? "User",
            Token = string.Empty
        };
    }
    public async Task<int> GetUserCountAsync()
    {
        return await _userRepository.GetUserCountAsync();
    }
}