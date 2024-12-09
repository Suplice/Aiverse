// using System;
// using System.IdentityModel.Tokens.Jwt;
// using System.Security.Claims;
// using System.Text;
// using Microsoft.IdentityModel.Tokens;

// public class TokenService
// {
//     public static string GenerateJwtToken(string username)
//     {
//         // Klucz symetryczny do podpisywania tokenu
//         var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes());
//         var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

//         // Tworzenie listy roszczeń (claims)
//         var claims = new[]
//         {
//             new Claim(JwtRegisteredClaimNames.Sub, username),
//             new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
//         };

//         // Tworzenie tokenu
//         var token = new JwtSecurityToken(
//             issuer: "YourIssuer",
//             audience: "YourAudience",
//             claims: claims,
//             expires: DateTime.Now.AddHours(1), // Token ważny przez 1 godzinę
//             signingCredentials: credentials);

//         // Serializacja tokenu do postaci tekstowej
//         return new JwtSecurityTokenHandler().WriteToken(token);
//     }
// }