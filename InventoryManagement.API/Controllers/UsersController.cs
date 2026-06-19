using InventoryManagement.API.Interfaces.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using InventoryManagement.API.Models;
using InventoryManagement.API.Authentication;
using InventoryManagement.API.DTOs;
namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "Administrator")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetUsers()
    {
        var users = await _userRepository.GetAllUsersAsync();

        return Ok(users.Select(user => new
        {
            user.UserId,
            user.FullName,
            user.Email,
            Role = user.Role?.RoleName,
            user.IsActive,
            user.CreatedAt
        }));
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUser(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user == null)
            return NotFound();

        return Ok(user);
    }
    [HttpPatch("{id}/toggle-status")]
    public async Task<IActionResult> ToggleStatus(int id)
    {
        var success =
            await _userRepository.ToggleStatusAsync(id);

        if (!success)
            return NotFound();

        return Ok();
    }
    [HttpPost]
    public async Task<IActionResult> CreateUser(
        [FromBody] CreateUserDto request)
    {
        var emailExists =
            await _userRepository.EmailExistsAsync(
                request.Email);

        if (emailExists)
        {
            return BadRequest(new
            {
                Message = "Email already exists"
            });
        }

        var user = new User
        {
            FullName = request.FullName,
            Email = request.Email,
            Username = request.Email,
            RoleId = request.RoleId,
            IsActive = request.IsActive,
            PasswordHash =
                PasswordHasher.HashPassword(
                    request.Password)
        };

        await _userRepository.CreateAsync(user);

        return Ok(new
        {
            Message = "User created successfully"
        });
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateUser(
        int id,
        [FromBody] UpdateUserDto request)
    {
        var user = await _userRepository.GetByIdAsync(id);

        if (user == null)
            return NotFound();

        user.FullName = request.FullName;
        user.Email = request.Email;
        user.Username = request.Email;
        user.RoleId = request.RoleId;
        user.IsActive = request.IsActive;
        user.UpdatedAt = DateTime.UtcNow;

        await _userRepository.UpdateAsync(user);

        return Ok();
    }
}