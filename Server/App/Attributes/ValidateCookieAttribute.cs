using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeByCookieAttribute : Attribute, IAuthorizationFilter
{
    private string _secretKey;
    private readonly string _requiredRole;
    private const string CookieName = "authToken"; 

    public AuthorizeByCookieAttribute(string requiredRole = "user")
    {
        _requiredRole = requiredRole;
    }

    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var request = context.HttpContext.Request;

        // var config = context.HttpContext.RequestServices.GetRequiredService<IConfiguration>();
        // var secretKey = config["JwtSettings:SecretKey"];

        // secretKey = secretKey ?? _secretKey;

        // if(string.IsNullOrEmpty(secretKey))
        // {
        //     context.Result = new UnauthorizedResult();
        //     return;
        // }

        if (!request.Cookies.TryGetValue(CookieName, out var token) || string.IsNullOrEmpty(token))
        {
            Console.WriteLine("No token found");
            context.Result = new UnauthorizedResult();
            return;
        }

        var principal = ValidateToken(token);
        if (principal == null)
        {
            Console.WriteLine("Token is invalid");
            context.Result = new UnauthorizedResult();
            return;
        }

        var userRole = principal.FindFirst(ClaimTypes.Role)?.Value;

        if (!IsRoleSufficient(userRole))
        {
            Console.WriteLine("Role is insufficient");
            context.Result = new UnauthorizedResult();
            return;
        }

        context.HttpContext.User = principal;
    }

    private bool IsRoleSufficient(string? userRole)
    {
        if (string.IsNullOrEmpty(userRole)) return false;

        if (_requiredRole == "USER")
        {
            return userRole == "USER" || userRole == "MODERATOR";
        }

        if (_requiredRole == "MODERATOR")
        {
            return userRole == "MODERATOR";
        }

        return false;
    }

    private ClaimsPrincipal? ValidateToken(string token)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("uVev3FFvMXsFSVIWhn5XQCdMnYZOoAhu"));
        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            var parameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = key,
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true
            };

            var principal = tokenHandler.ValidateToken(token, parameters, out var securityToken);
            if (securityToken is not JwtSecurityToken jwtSecurityToken || 
                !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
            {
                Console.WriteLine("Invalid token");
                return null;
            }

            return principal;
        }
        catch
        {
            return null;
        }
    }
}
