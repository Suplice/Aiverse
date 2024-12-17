
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("aiservice")]
public class AIServiceController: ControllerBase {

    private readonly IAIServiceService _AIServiceSerivce;

    [HttpGet("findall")]
    public async Task<IActionResult> FindAllServices(){
        var ServicesResult = await _AIServiceSerivce.FindAllServices();

        if(ServicesResult == null){
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<List<AiService>>(false, "Services found", ServicesResult);

        return Ok(correctResponse);
    }

}