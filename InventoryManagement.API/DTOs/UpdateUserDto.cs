// DTOs/UpdateUserDto.cs
namespace InventoryManagement.API.DTOs;

public class UpdateUserDto
{
    public string FullName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public int RoleId { get; set; }

    public bool IsActive { get; set; }
}