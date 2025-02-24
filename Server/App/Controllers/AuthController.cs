
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Supabase.Gotrue;
using TaskManagementApp.Core.ApiResponse;

/// <summary>
/// The <see cref="AuthController"/> class is responsible for handling user authentication and authorization processes.
/// It provides endpoints for user login, registration, logout, and Google authentication, as well as token validation.
/// </summary>
/// <remarks>
/// This controller manages user sessions using JWT (JSON Web Tokens) stored in secure HTTP-only cookies.
/// It relies on the <see cref="IAuthService"/> to handle core authentication logic, such as user validation,
/// registration, and role management. The controller also integrates with external authentication providers,
/// such as Google, to support third-party login functionality.
/// </remarks>
[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{

    private readonly IAuthService _authService;
    private readonly string? _secretKey;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthController"/> class.
    /// </summary>
    /// <param name="authService">The service interface responsible for handling authentication and user management operations.</param>
    /// <param name="config">The application configuration, which provides access to settings such as JWT secret keys.</param>
    /// <remarks>
    /// This constructor injects the necessary dependencies for the controller to function. The <see cref="IAuthService"/>
    /// is used for core authentication logic, while the <see cref="IConfiguration"/> provides access to application
    /// settings, such as the JWT secret key required for token generation and validation.
    /// </remarks>
    public AuthController(IAuthService authService, IConfiguration config)
    {
        _authService = authService;
        _secretKey = config["JwtSettings:SecretKey"];
    }

    /// <summary>
    /// Extracts errors from the ModelState.
    /// </summary>
    /// <param name="modelState">The ModelState dictionary.</param>
    /// <returns>A dictionary containing validation errors.</returns>
    private Dictionary<string, List<string>?> GetModelStateErrors(ModelStateDictionary modelState)
    {
        var errors = modelState.ToDictionary(
            k => k.Key,
            v => v.Value?.Errors.Select(e => e.ErrorMessage).ToList());

        return errors;
    }

    /// <summary>
    /// Logs out the user by deleting the authentication token cookie.
    /// </summary>
    /// <returns>Success response from deleting token cookie</returns>
    [AuthorizeByCookie("USER")]
    [HttpPost("logout")]
    public IActionResult Logout()
    {
        Response.Cookies.Delete("authToken");
        return Ok(new ApiResponse<bool>(true, "Logout successful", true));
    }

    /// <summary>
    /// Logs in a user using Google authentication.
    /// </summary>
    /// <param name="GoogleData">The Google authentication data.</param>
    /// <returns>An authentication response.</returns>
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
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(1)
        };

        Response.Cookies.Append("authToken", token, cookieOptions);

        var correctResponse = new ApiResponse<ResponseAuthDTO>(true, "Login successful", GoogleResult);
        return Ok(correctResponse);


    }

    /// <summary>
    /// Checks user credentials based on the authentication token.
    /// </summary>
    /// <returns>An authentication response.</returns>
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
                SameSite = SameSiteMode.None,
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

    /// <summary>
    /// Handles user login using provided credentials.
    /// </summary>
    /// <param name="LoginData">User login data containing email and password.</param>
    /// <returns>Returns an authentication token in a cookie if login is successful.</returns>
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
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(1)
        };

        Response.Cookies.Append("authToken", token, cookieOptions);

        var correctResponse = new ApiResponse<ResponseAuthDTO>(true, "Login successful", LoginResult);
        return Ok(correctResponse);
    }

    /// <summary>
    /// Registers a new user with the provided data.
    /// </summary>
    /// <param name="RegisterData">User registration data including email, password, and other details.</param>
    /// <returns>Returns an authentication token in a cookie if registration is successful.</returns>
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
            SameSite = SameSiteMode.None,
            Expires = DateTime.UtcNow.AddDays(1)
        };

        Response.Cookies.Append("authToken", token, cookieOptions);

        var correctResponse = new ApiResponse<ResponseAuthDTO>(true, "ModelState is right", RegisterResult);

        return Ok(correctResponse);
    }

    /// <summary>
    /// Generates a JWT token for authentication.
    /// </summary>
    /// <param name="userId">The user's ID.</param>
    /// <param name="role">The user's role.</param>
    /// <returns>A JWT token as a string.</returns>
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