
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Supabase.Gotrue;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("auth")]
public class AuthController: ControllerBase{

    private readonly IAuthService _authService;

    public AuthController(IAuthService authService){
        _authService = authService;
    }

    private Dictionary<string, List<string>?> GetModelStateErrors (ModelStateDictionary modelState)
        {
            var errors = modelState.ToDictionary(
                k => k.Key,
                v => v.Value?.Errors.Select(e => e.ErrorMessage).ToList());

            return errors;
        }

    [HttpPost("login")]
    public async Task<IActionResult> Login(RequestLoginDTO LoginData){
        if(!ModelState.IsValid){
            var errors = GetModelStateErrors(ModelState);
            var response = new ApiResponse<RequestLoginDTO>(false, "ModelState is invalid", LoginData, errors);
            return BadRequest(response);
        }

        var LoginResult = await _authService.Login(LoginData);

        if(LoginResult == null){
            return BadRequest(new ApiResponse<bool>(false, "Error occured", false));
        }

        var correctResponse = new ApiResponse<ResponseAuthDTO>(true, "ModelState is right", LoginResult);

        return Ok(correctResponse);
    } 

    [HttpPost("register")]
    public async Task<IActionResult> Register(RequestRegisterDTO RegisterData){
        if(!ModelState.IsValid){
            var errors = GetModelStateErrors(ModelState);
            var response = new ApiResponse<RequestRegisterDTO>(false, "ModelState is invalid", RegisterData, errors);
            return BadRequest(response);
        }

        var RegisterResult = await _authService.Register(RegisterData);

    if(RegisterResult == null)
        return BadRequest(new ApiResponse<bool>(false, "Error occured", false));

    var correctResponse = new ApiResponse<ResponseAuthDTO>(true, "ModelState is right", RegisterResult);

        return Ok(correctResponse);
    } 
}