using Microsoft.AspNetCore.Mvc;
using Server.App.Models;


/// <summary>
/// The <see cref="UserController"/> class is responsible for handling operations related to user management.
/// It provides endpoints for retrieving user details, updating user information (such as email, name, and password),
/// and managing user profile pictures.
/// </summary>
/// <remarks>
/// This controller manages user-related operations, including fetching user details by ID or email, updating user information,
/// and handling profile picture uploads. It relies on the <see cref="IUserService"/> for core user management logic
/// and the <see cref="IFileService"/> for handling file uploads (e.g., profile pictures).
/// The controller enforces role-based authorization, ensuring that only authenticated users with the "USER" role can access its endpoints.
/// </remarks>
[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IFileService _fileService;
    private readonly IWebHostEnvironment _env;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserController"/> class.
    /// </summary>
    /// <param name="userRepository">The repository interface responsible for data access operations related to users.</param>
    /// <param name="userService">The service interface responsible for handling user-related business logic.</param>
    /// <param name="fileService">The service interface responsible for managing file uploads and deletions.</param>
    /// <param name="env">The hosting environment, used to manage file paths for profile pictures.</param>
    /// <remarks>
    /// This constructor injects the necessary dependencies for the controller to function. The <see cref="IUserService"/> handles
    /// core user management logic, while the <see cref="IFileService"/> manages file-related operations, such as saving and deleting profile pictures.
    /// The <see cref="IWebHostEnvironment"/> provides access to the hosting environment, which is used to construct file paths.
    /// </remarks>
    public UserController(IUserRepository userRepository, IUserService userService, IFileService fileService, IWebHostEnvironment env)
    {
        _userService = userService;
        _fileService = fileService;
        _env = env;
    }

    [AuthorizeByCookie("USER")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(long id)
    {
        try
        {
            if (id < 0)
            {
                return BadRequest("Invalid ID.");
            }

            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            return Ok(user);
        }
        catch (Exception e)
        {
            return StatusCode(400, new { message = e.Message });
        }

    }

    /// <summary>
    /// Retrieves a user by their ID.
    /// </summary>
    /// <param name="id">The ID of the user to retrieve.</param>
    /// <returns>The user details or an error response if the user is not found or the ID is invalid.</returns>
    [AuthorizeByCookie("USER")]
    [HttpGet("by-email")]
    public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
    {
        try
        {
            var user = await _userService.GetUserByEmailAsync(email);

            if (user == null)
            {
                return NotFound($"User with email '{email}' not found.");
            }

            return Ok(user);
        }
        catch (Exception e)
        {
            return StatusCode(400, new { message = e.Message });
        }
    }

    /// <summary>
    /// Retrieves a user by their email address.
    /// </summary>
    /// <param name="email">The email address of the user to retrieve.</param>
    /// <returns>The user details or an error response if the user is not found.</returns>
    [AuthorizeByCookie("USER")]
    [HttpPatch("{id}/Email")]
    public async Task<IActionResult> UpdateUserEmail(long id, [FromBody] UpdateEmailDto updateEmailDto)
    {
        try
        {
            if (id != updateEmailDto.Id)
            {
                return BadRequest("ID in the URL does not match the ID in the request body.");
            }

            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            var isEmailUpdated = await _userService.TryUpdateUserEmailAsync(id, updateEmailDto.Email);

            if (!isEmailUpdated)
            {
                return Conflict("The provided email is already in use.");
            }

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(400, new { message = e.Message });
        }
    }

    /// <summary>
    /// Updates a user's name.
    /// </summary>
    /// <param name="id">The ID of the user whose name is to be updated.</param>
    /// <param name="updatedUser">The updated user object containing the new name.</param>
    /// <returns>A response indicating success or failure of the name update.</returns>
    [AuthorizeByCookie("USER")]
    [HttpPatch("{id}/Name")]
    public async Task<IActionResult> UpdateUserName(long id, [FromBody] User updatedUser)
    {
        try
        {
            if (id != updatedUser.Id)
            {
                return BadRequest("ID in URL does not match ID in the body.");
            }

            var user = await _userService.GetUserById(id);

            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }

            if (!string.IsNullOrEmpty(updatedUser.Name))
            {
                user.Name = updatedUser.Name;
            }

            await _userService.UpdateUser(user);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(400, new { message = e.Message });
        }

    }

    /// <summary>
    /// Updates a user's password.
    /// </summary>
    /// <param name="id">The ID of the user whose password is to be updated.</param>
    /// <param name="newPassword">The new password to set for the user.</param>
    /// <returns>A response indicating success or failure of the password update.</returns>
    [AuthorizeByCookie("USER")]
    [HttpPatch("{id}/Password")]
    public async Task<IActionResult> UpdateUserPassword(long id, [FromBody] String newPassword)
    {
        try
        {
            var user = await _userService.GetUserById(id);
            if (user == null)
            {
                return NotFound($"User with ID {id} not found.");
            }


            await _userService.UpdateUserPasswordAsync(id, newPassword);

            return NoContent();
        }
        catch (Exception e)
        {
            return StatusCode(400, new { message = e.Message });
        }

    }

    /// <summary>
    /// Updates a user's profile picture.
    /// </summary>
    /// <param name="userId">The ID of the user whose profile picture is to be updated.</param>
    /// <param name="file">The image file to upload as the new profile picture.</param>
    /// <returns>A response indicating success or failure of the profile picture update.</returns>
    [AuthorizeByCookie("USER")]
    [HttpPatch("{userId}/profile-picture")]
    public async Task<IActionResult> UpdateUserProfilePicture(long userId, IFormFile file)
    {

        if (file == null)
        {
            return BadRequest("No file uploaded.");
        }

        try
        {
            var user = await _userService.GetUserById(userId);


            if (user == null)
            {
                return NotFound($"User with ID {userId} not found.");
            }


            if (!string.IsNullOrEmpty(user.Picture))
            {
                var oldFilePath = Path.Combine(_env.WebRootPath, user.Picture.TrimStart('/'));
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
            }


            var filePath = await _fileService.SaveFileAsync(file, "uploads/user-images");


            user.Picture = filePath;
            await _userService.UpdateUser(user);

            return Ok(new { message = "Profile picture updated successfully.", filePath });
        }
        catch (Exception e)
        {
            return StatusCode(400, new { message = e.Message });
        }
    }
}
