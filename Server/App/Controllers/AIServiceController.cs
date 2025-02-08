
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

    private readonly FileService _fileService;


    public AIServiceController(IAIServiceService AIServiceService, FileService fileService, ICategoryService CategoryService)
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
    public IActionResult GetReviews(long serviceId)
    {
        try
        {
            var ReviewsResult = _AIServiceService.GetReviews(serviceId);

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

    [HttpPost("addComment")]
    public async Task<IActionResult> AddComment(RequestAddCommentDTO comment)
    {

        try
        {
            var CommentResult = await _AIServiceService.AddComment(comment);

            if (CommentResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<Comment>(true, "Comment added", CommentResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    [HttpGet("getReviewComments/{reviewId}")]
    public ActionResult GetReviewComments(long reviewId)
    {
        try
        {
            var CommentsResult = _AIServiceService.GetReviewComments(reviewId);

            if (CommentsResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<List<Comment>>(true, "Comments found", CommentsResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    [HttpGet("getCommentReplies/{commentId}")]
    public ActionResult GetCommentReplies(long commentId)
    {
        try
        {
            var RepliesResult = _AIServiceService.GetCommentComments(commentId);

            if (RepliesResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<List<Comment>>(true, "Replies found", RepliesResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    [HttpPost("addCommentReply")]
    public async Task<IActionResult> AddCommentReply(RequestAddCommentDTO comment)
    {

        try
        {
            var CommentResult = await _AIServiceService.AddComment(comment);

            if (CommentResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<Comment>(true, "Comment added", CommentResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }
    [HttpGet("likedbyuser/{userId}")]
    public IActionResult GetLikedServices(long userId)
    {
        try
        {
            var LikedServicesResult = _AIServiceService.GetLikedServices(userId);

            if (LikedServicesResult == null)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<List<long>>(true, "Liked services found", LikedServicesResult);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    [HttpPost("likeService")]
    public async Task<IActionResult> LikeService(RequestLikeServiceDTO likeService)
    {

        try
        {
            var LikeResult = await _AIServiceService.LikeService(likeService.UserId, likeService.AiServiceId);

            if (LikeResult == false)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<bool>(true, "Service liked", true);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    [HttpPost("dislikeService")]
    public async Task<IActionResult> DislikeService(RequestLikeServiceDTO likeService)
    {

        try
        {
            var DislikeResult = await _AIServiceService.DislikeService(likeService.UserId, likeService.AiServiceId);

            if (DislikeResult == false)
            {
                var response = new ApiResponse<bool>(false, "Error occured", false);
                return BadRequest(response);
            }

            var correctResponse = new ApiResponse<bool>(true, "Service disliked", true);

            return Ok(correctResponse);

        }
        catch (Exception e)
        {
            var response = new ApiResponse<bool>(false, e.Message, false);
            return BadRequest(response);
        }
    }

    [HttpGet("reviewedServices/{id}")]
    public async Task<IActionResult> GetUserReviewedServicesById(long id)
    {


        if (id <= 0)
        {
            var response = new ApiResponse<bool>(false, "User not exist", false);
            return BadRequest(response);
        }

        var ServiceResult = await _AIServiceService.GetUserReviewedServicesById(id);

        if (ServiceResult == null)
        {
            var response = new ApiResponse<bool>(false, "Error occured", false);
            return BadRequest(response);
        }

        var correctResponse = new ApiResponse<List<ResponseAIServiceDTO>>(true, "Services found", ServiceResult);

        return Ok(correctResponse);
    }

}