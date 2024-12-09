
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Supabase.Gotrue;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("auth")]
public class AuthController: ControllerBase{

    private readonly IAuthService _authService;

    private Dictionary<string, List<string>?> GetModelStateErrors (ModelStateDictionary modelState)
        {
            var errors = modelState.ToDictionary(
                k => k.Key,
                v => v.Value?.Errors.Select(e => e.ErrorMessage).ToList());

            return errors;
        }

    // [HttpPost("login")]
    // public async Task<IActionResult> Login(RequestLoginDTO data){
    //     if(!ModelState.IsValid){
    //         var errors = GetModelStateErrors(ModelState);
    //         var response = new ApiResponse<RequestLoginDTO>(false, "ModelState is invalid", data, errors);
    //         return BadRequest(response);
    //     }

    //     var LoginResult = await _authService.Login(data);
    // } 

    [HttpPost("register")]
    public async Task<IActionResult> Register(RequestRegisterDTO RegisterData){
        if(!ModelState.IsValid){
            var errors = GetModelStateErrors(ModelState);
            var response = new ApiResponse<RequestRegisterDTO>(false, "ModelState is invalid", RegisterData, errors);
            return BadRequest(response);
        }

        var RegisterResult = await _authService.Register(RegisterData);

        // if(RegisterResult == null)
        //     return BadRequest(new ApiResponse<bool>(false, "Error occured", false));

        // var correctResponse = new ApiResponse<ResponseRegisterDTO>(true, "ModelState is right", RegisterResult);

        var fakeregister = new ResponseRegisterDTO{
            Id = 1,
            Email = "cos@tam.pl",
            Name = "",
            Role = "USER"
        };

        return Ok(fakeregister);
    } 
}