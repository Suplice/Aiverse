
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Supabase.Gotrue;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{

    private readonly IAuthService _authService;
    private readonly string? _secretKey;

    public AuthController(IAuthService authService, IConfiguration config)
    {
        _authService = authService;
        _secretKey = config["JwtSettings:SecretKey"];
    }

    private Dictionary<string, List<string>?> GetModelStateErrors(ModelStateDictionary modelState)
    {
        var errors = modelState.ToDictionary(
            k => k.Key,
            v => v.Value?.Errors.Select(e => e.ErrorMessage).ToList());

        return errors;
    }

    [AuthorizeByCookie("USER")]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("authToken");
        return Ok(new ApiResponse<bool>(true, "Logout successful", true));
    }


    [HttpPost("google")]
    public async Task<IActionResult> GoogleLogin(RequestGoogleDTO GoogleData)
    {
        if (!ModelState.IsValid)
        {
            var errors = GetModelStateErrors(ModelState);
            var response = new ApiResponse<RequestGoogleDTO>(false, "ModelState is invalid", GoogleData, errors);
            return BadRequest(response);
        }

        var GoogleResult = await _authService.GoogleLogin(GoogleData);

        if (GoogleResult == null)
        {
            return BadRequest(new ApiResponse<bool>(false, "Error occured", false));
        }


        var token = GenerateJwtToken(GoogleResult.Id.ToString(), GoogleResult.Role);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(1)
        };

        Response.Cookies.Append("authToken", token, cookieOptions);

        var correctResponse = new ApiResponse<ResponseAuthDTO>(true, "Login successful", GoogleResult);
        return Ok(correctResponse);


    }

    [HttpGet("credentials")]
    public async Task<IActionResult> CheckCredentials()
    {
        try
        {
            var token = Request.Cookies["authToken"];
            if (token == null)
            {
                return BadRequest(new ApiResponse<bool>(false, "No token found", false));
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_secretKey);
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out SecurityToken validatedToken);

            var jwtToken = (JwtSecurityToken)validatedToken;
            var userId = jwtToken.Claims.First(x => x.Type == "userId").Value;

            var user = await _authService.GetUserById(userId);

            if (user == null)
            {
                Response.Cookies.Delete("authToken");
                return BadRequest(new ApiResponse<bool>(false, "User not found", false));
            }

            var newToken = GenerateJwtToken(userId, user.Role);

            Response.Cookies.Append("authToken", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddDays(1)
            });

            var response = new ApiResponse<ResponseAuthDTO>(true, "User found", user);
            return Ok(response);
        }
        catch (Exception e)
        {
            return BadRequest(new ApiResponse<bool>(false, e.Message, false));
        }
    }


    [HttpPost("login")]
    public async Task<IActionResult> Login(RequestLoginDTO LoginData)
    {
        if (!ModelState.IsValid)
        {
            var errors = GetModelStateErrors(ModelState);
            var response = new ApiResponse<RequestLoginDTO>(false, "ModelState is invalid", LoginData, errors);
            return BadRequest(response);
        }

        var LoginResult = await _authService.Login(LoginData);

        if (LoginResult == null)
        {
            return BadRequest(new ApiResponse<bool>(false, "Error occured", false));
        }

        var token = GenerateJwtToken(LoginResult.Id.ToString(), LoginResult.Role);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(1)
        };

        Response.Cookies.Append("authToken", token, cookieOptions);

        var correctResponse = new ApiResponse<ResponseAuthDTO>(true, "Login successful", LoginResult);
        return Ok(correctResponse);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RequestRegisterDTO RegisterData)
    {
        if (!ModelState.IsValid)
        {
            var errors = GetModelStateErrors(ModelState);
            var response = new ApiResponse<RequestRegisterDTO>(false, "ModelState is invalid", RegisterData, errors);
            return BadRequest(response);
        }

        var RegisterResult = await _authService.Register(RegisterData);

        if (RegisterResult == null)
            return BadRequest(new ApiResponse<bool>(false, "Error occured", false));

        var token = GenerateJwtToken(RegisterResult.Id.ToString(), RegisterResult.Role);

        var cookieOptions = new CookieOptions
        {
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.Strict,
            Expires = DateTime.UtcNow.AddDays(1)
        };

        Response.Cookies.Append("authToken", token, cookieOptions);

        var correctResponse = new ApiResponse<ResponseAuthDTO>(true, "ModelState is right", RegisterResult);

        return Ok(correctResponse);
    }


    private string GenerateJwtToken(string userId, string role)
    {
        var claims = new[]
        {
            new Claim("userId", userId),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, role)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}