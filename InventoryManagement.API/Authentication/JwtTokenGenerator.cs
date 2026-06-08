using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using InventoryManagement.API.Configuration;
using InventoryManagement.API.Models;
using Microsoft.IdentityModel.Tokens;

namespace InventoryManagement.API.Authentication;

public static class JwtTokenGenerator
{
    public static string GenerateToken(
        User user,
        JwtSettings jwtSettings)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier,
                user.UserId.ToString()),

            new Claim(ClaimTypes.Email,
                user.Email),

            new Claim(ClaimTypes.Role,
                user.Role?.RoleName ?? "User")
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtSettings.Key));

        var credentials =
            new SigningCredentials(
                key,
                SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwtSettings.Issuer,
            audience: jwtSettings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(
                jwtSettings.ExpiryMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler()
            .WriteToken(token);
    }
}