
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("search")]
public class AIServiceController: ControllerBase {

    private readonly IAIServiceService _searchSerivce;

    public async Task<IActionResult> FindServices(){
        var ServicesResult = await _searchSerivce.FindServices();

        if(ServicesResult == null){
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<List<AiService>>(false, "Services found", ServicesResult);

        return Ok(correctResponse);
    }

}