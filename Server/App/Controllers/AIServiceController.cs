
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using Supabase.Gotrue;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("aiservice")]
public class AIServiceController: ControllerBase {

    private readonly IAIServiceService _AIServiceService;

    public AIServiceController(IAIServiceService AIServiceService){
        _AIServiceService = AIServiceService;
    }

    [HttpGet("getall")]
    public async Task<IActionResult> GetAllServices(){
        var ServicesResult = await _AIServiceService.GetAllServices();

        if(ServicesResult == null){
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<List<AiService>>(true, "Services found", ServicesResult);

        return Ok(correctResponse);
    }

    [HttpGet("getservice/{serviceId}")]
    public async Task<IActionResult> GetServiceById(long serviceId){

        if(serviceId <= 0){
            var response = new ApiResponse<bool>(false, "Error: Provided ID was below 0", false);
            return BadRequest(response);
        }

        var ServiceResult = await _AIServiceService.GetServiceById(serviceId);

        if(ServiceResult == null){
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<AiService>(true, "Service found", ServiceResult);

        return Ok(correctResponse);
    }


}