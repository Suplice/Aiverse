
using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("aiservice")]
public class AIServiceController : ControllerBase
{

    private readonly IAIServiceService _AIServiceService;

    private readonly ICategoryService _CategoryService;

    private readonly IFileService _fileService;


    public AIServiceController(IAIServiceService AIServiceService, IFileService fileService, ICategoryService CategoryService)
    {
        _CategoryService = CategoryService;
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

        var correctResponse = new ApiResponse<List<ResponseAIServiceDTO>>(true, "Services found", ServicesResult);

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

    [HttpGet("getservicegallery")]
    public IActionResult GetServiceGallery(string serviceTitle)
    {

        var galleryPath = Path.Combine("wwwroot", "AIServiceImages", serviceTitle, "galleryFiles");
        List<string> galleryImages = new List<string>();

        if (Directory.Exists(galleryPath))
        {
            var files = Directory.GetFiles(galleryPath);
            galleryImages = files.Select(file => Path.Combine("/AIServiceImages", serviceTitle, "galleryFiles", Path.GetFileName(file))).ToList();
        }

        Console.WriteLine(galleryImages);

        if (galleryImages == null)
        {
            var response = new ApiResponse<bool>(false, "No images in service Gallery", false);
            return BadRequest(response);
        }

        Console.WriteLine(galleryImages);

        var correctResponse = new ApiResponse<List<string>>(true, "Images found", galleryImages);

        return Ok(correctResponse);

    }

    [AuthorizeByCookie("USER")]
    [HttpPost("addservice")]
    public async Task<IActionResult> AddNewService(RequestAIServiceDTO service)
    {

        try
        {

            var filePath = await _fileService.SaveFileAsync(service.Image, "AIServiceImages/" + service.Title);
            var ServiceResult = await _AIServiceService.AddNewService(service, filePath);

            foreach (var image in service.GalleryImages)
            {
                await _fileService.SaveFileAsync(image, "AIServiceImages/" + service.Title + "/galleryFiles");
            }

            if (ServiceResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var resultCategories = await _CategoryService.getAllCategories();

            foreach (var Category in resultCategories)
            {
                Console.WriteLine(Category.Name);
            }

            foreach (var category in resultCategories)
            {
                foreach (var DtoCategory in service.Categories)
                {
                    if (DtoCategory == category.Name)
                    {
                        var serviceId = ServiceResult.Id;
                        var categoryId = category.Id;

                        var ServiceCategory = new AiServicesCategories
                        {
                            AiServiceId = serviceId,
                            CategoryId = categoryId
                        };

                        Console.WriteLine(serviceId);
                        Console.WriteLine(categoryId);

                        await _CategoryService.addAiServiceCategory(ServiceCategory);
                    }
                }

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


    [AuthorizeByCookie("MODERATOR")]
    [HttpPatch("updatestatus/{id}")]
    public async Task<IActionResult> UpdateStatus(long id)
    {

        if (id <= 0)
        {
            var response = new ApiResponse<bool>(false, "Service does not exist", false);
            return BadRequest(response);
        }

        var updatedService = await _AIServiceService.UpdateStatus(id);

        if (updatedService == null)
        {
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<AiService>(true, "Service updated", updatedService);

        return Ok(correctResponse);

    }


    [AuthorizeByCookie("MODERATOR")]
    [HttpDelete("deletebyid/{id}")]
    public async Task<IActionResult> DeleteServiceById(long id)
    {
        if (id <= 0)
        {
            var response = new ApiResponse<bool>(false, "Service does not exist", false);
            return BadRequest(response);
        }

        var service = await _AIServiceService.GetServiceById(id);

        if (service == null)
        {
            var response = new ApiResponse<bool>(false, "Service does not exist", false);
            return BadRequest(response);
        }

        _fileService.DeleteFile(service.Image);

        var result = await _AIServiceService.DeleteServiceById(id);

        if (result == false)
        {
            var response = new ApiResponse<bool>(false, "Error while deleting service", result);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<bool>(true, "The service has been deleted", result);

        return Ok(correctResponse);

    }

}