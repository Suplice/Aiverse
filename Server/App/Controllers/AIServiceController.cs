
using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;


/// <summary>
/// The <see cref="AIServiceController"/> class is responsible for managing operations related to AI services.
/// It provides endpoints for retrieving, adding, updating, and deleting AI services, as well as managing their associated images and categories.
/// </summary>
/// <remarks>
/// This controller handles the lifecycle of AI services, including their creation, verification, and deletion.
/// It integrates with services such as <see cref="IAIServiceService"/> for core AI service operations,
/// <see cref="IFileService"/> for managing file uploads (e.g., service images and galleries),
/// and <see cref="ICategoryService"/> for handling category associations.
/// The controller also supports role-based authorization, allowing only authorized users (e.g., "USER" or "MODERATOR")
/// to perform specific actions like adding, updating, or deleting services.
/// </remarks>
[ApiController]
[Route("aiservice")]
public class AIServiceController : ControllerBase
{

    private readonly IAIServiceService _AIServiceService;
    private readonly ICategoryService _CategoryService;
    private readonly IFileService _fileService;


    /// <summary>
    /// Initializes a new instance of the <see cref="AIServiceController"/> class.
    /// </summary>
    /// <param name="AIServiceService">The service interface responsible for handling core AI service operations, such as retrieval, addition, and deletion.</param>
    /// <param name="fileService">The service interface responsible for managing file uploads and deletions, including service images and gallery files.</param>
    /// <param name="CategoryService">The service interface responsible for managing categories and their associations with AI services.</param>
    /// <remarks>
    /// This constructor injects the necessary dependencies for the controller to function. The <see cref="IAIServiceService"/> handles
    /// the core logic for AI services, while the <see cref="IFileService"/> manages file-related operations, such as saving and deleting images.
    /// The <see cref="ICategoryService"/> is used to associate AI services with relevant categories, enabling better organization and filtering.
    /// </remarks>
    public AIServiceController(IAIServiceService AIServiceService, IFileService fileService, ICategoryService CategoryService)
    {
        _CategoryService = CategoryService;
        _AIServiceService = AIServiceService;
        _fileService = fileService ?? throw new ArgumentNullException(nameof(fileService));
    }

    /// <summary>
    /// Retrieves all AI services.
    /// </summary>
    /// <returns>List of AI services or an error response.</returns>
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

    /// <summary>
    /// Retrieves an AI service by its ID.
    /// </summary>
    /// <param name="serviceId">The ID of the AI service.</param>
    /// <returns>The AI service details or an error response.</returns>
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

    /// <summary>
    /// Retrieves the gallery images of a specific AI service.
    /// </summary>
    /// <param name="serviceTitle">The title of the AI service.</param>
    /// <returns>List of gallery image paths or an error response.</returns>
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

    /// <summary>
    /// Adds a new AI service.
    /// </summary>
    /// <param name="service">Service data transfer object containing the new service details.</param>
    /// <returns>Response indicating success or failure.</returns>
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

    /// <summary>
    /// Changes the status of an AI service to "Verified".
    /// </summary>
    /// <param name="id">ID of the AI service.</param>
    /// <returns>Response indicating success or failure.</returns>
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

    /// <summary>
    /// Deletes an AI service by its ID.
    /// </summary>
    /// <param name="id">ID of the AI service.</param>
    /// <returns>Response indicating success or failure.</returns>
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