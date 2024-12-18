
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("aiservice")]
public class AIServiceController: ControllerBase {

    private readonly IAIServiceService _AIServiceSerivce;

    [HttpGet("getall")]
    public async Task<IActionResult> GetAllServices(){
        var ServicesResult = await _AIServiceSerivce.GetAllServices();

        if(ServicesResult == null){
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<List<AiService>>(true, "Services found", ServicesResult);

        return Ok(correctResponse);
    }


}