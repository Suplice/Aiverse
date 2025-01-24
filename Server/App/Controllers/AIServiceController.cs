
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("aiservice")]
public class AIServiceController : ControllerBase
{

    private readonly IAIServiceService _AIServiceService;

    private readonly FileService _fileService;


    public AIServiceController(IAIServiceService AIServiceService, FileService fileService)
    {
        _AIServiceService = AIServiceService;
        _fileService = fileService ?? throw new ArgumentNullException(nameof(fileService));
    }

    public Boolean UploadServicePicture(long serviceId, IFormFile file)
    {
        return true;
    }

    [HttpGet("getall")]
    public async Task<IActionResult> GetAllServices()
    {
        var ServicesResult = await _AIServiceService.GetAllServices();

        if (ServicesResult == null)
        {
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<List<AiService>>(true, "Services found", ServicesResult);

        return Ok(correctResponse);
    }

    [HttpGet("getservice/{serviceId}")]
    public async Task<IActionResult> GetServiceById(long serviceId)
    {

        if (serviceId <= 0)
        {
            var response = new ApiResponse<bool>(false, "Provided id does not exist", false);
            return BadRequest(response);
        }

        var ServiceResult = await _AIServiceService.GetServiceById(serviceId);

        if (ServiceResult == null)
        {
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<AiService>(true, "Service found", ServiceResult);

        return Ok(correctResponse);
    }

    [HttpPost("addservice")]
    public async Task<IActionResult> AddNewService(RequestAIServiceDTO service)
    {

        try
        {

            var filePath = await _fileService.SaveFileAsync(service.Image, "AIServiceImages");
            var ServiceResult = await _AIServiceService.AddNewService(service, filePath);

            if (ServiceResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<AiService>(true, "Service added", ServiceResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }

    }

    [HttpPost("AddReview")]
    public async Task<IActionResult> AddReview(RequestReviewDTO review)
    {

        try
        {
            var ReviewResult = await _AIServiceService.AddReview(review);

            if (ReviewResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<Review>(true, "Review added", ReviewResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    [HttpGet("getreviews/{serviceId}")]
    public async Task<IActionResult> GetReviews(long serviceId)
    {
        try
        {
            var ReviewsResult = await _AIServiceService.GetReviews(serviceId);

            if (ReviewsResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<List<Review>>(true, "Reviews found", ReviewsResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }


}