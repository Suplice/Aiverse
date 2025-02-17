using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


/// <summary>
/// Custom authorization attribute that validates a user's authentication token stored in a cookie
/// and ensures the user has the required role to access the resource.
/// </summary>
/// <remarks>
/// This attribute can be applied to controllers or methods to enforce role-based authorization.
/// It checks for the presence of a valid JWT token in the "authToken" cookie and validates the token.
/// If the token is valid and the user has the required role, access is granted; otherwise, a 401 Unauthorized response is returned.
/// </remarks>
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeByCookieAttribute : Attribute, IAuthorizationFilter
{
    private string _secretKey;
    private readonly string _requiredRole;
    private const string CookieName = "authToken"; 

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthorizeByCookieAttribute"/> class.
    /// </summary>
    /// <param name="requiredRole">The minimum role required to access the resource. Defaults to "user".</param>
    public AuthorizeByCookieAttribute(string requiredRole = "user")
    {
        _requiredRole = requiredRole;
    }

    /// <summary>
    /// Called when authorization is required. Validates the token and checks the user's role.
    /// </summary>
    /// <param name="context">The context for the authorization filter.</param>
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

    /// <summary>
    /// Determines if the user's role is sufficient to access the resource.
    /// </summary>
    /// <param name="userRole">The role of the user.</param>
    /// <returns>
    /// <c>true</c> if the user's role meets the required role; otherwise, <c>false</c>.
    /// </returns>
    /// <remarks>
    /// The logic for role sufficiency is as follows:
    /// - If the required role is "USER", the user must have the "USER" or "MODERATOR" role.
    /// - If the required role is "MODERATOR", the user must have the "MODERATOR" role.
    /// </remarks>
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

    /// <summary>
    /// Validates the JWT token and returns the claims principal if the token is valid.
    /// </summary>
    /// <param name="token">The JWT token to validate.</param>
    /// <returns>
    /// The <see cref="ClaimsPrincipal"/> if the token is valid; otherwise, <c>null</c>.
    /// </returns>
    /// <remarks>
    /// The token is validated using a symmetric security key and HMAC SHA-256 algorithm.
    /// The token's signature, expiration, and other claims are checked during validation.
    /// </remarks>
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
