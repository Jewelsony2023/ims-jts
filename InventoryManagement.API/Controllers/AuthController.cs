using InventoryManagement.API.DTOs;
using InventoryManagement.API.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(
        RegisterRequestDto request)
    {
        var result =
            await _authService.RegisterAsync(request);

        return Ok(result);
    }
    [HttpPost("login")]
    public async Task<IActionResult> Login(
        LoginRequestDto request)
    {
        var result =
            await _authService.LoginAsync(request);

        return Ok(result);
    }

    [HttpGet("test-db")]
    
    public async Task<IActionResult> TestDatabase()
    {
        var userCount =
            await _authService.GetUserCountAsync();

        return Ok(new
        {
            Message = "Database Connected",
            UserCount = userCount
        });
    }
}