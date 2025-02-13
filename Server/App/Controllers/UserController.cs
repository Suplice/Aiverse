using Microsoft.AspNetCore.Mvc;
using Server.App.Models;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IFileService _fileService; 
    private readonly IWebHostEnvironment _env;  

    // Konstruktor kontrolera
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

    [AuthorizeByCookie("USER")]
    [HttpGet("by-email")]
    public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
    {
        var user = await _userService.GetUserByEmailAsync(email);

        if (user == null)
        {
            return NotFound($"User with email '{email}' not found.");
        }

        return Ok(user);
    }

    [AuthorizeByCookie("USER")]
    [HttpPatch("{id}/Email")]
    public async Task<IActionResult> UpdateUserEmail(long id, [FromBody] UpdateEmailDto updateEmailDto)
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

    [AuthorizeByCookie("USER")]
    [HttpPatch("{id}/Name")]
    public async Task<IActionResult> UpdateUserName(long id, [FromBody] User updatedUser)
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

    [AuthorizeByCookie("USER")]
    [HttpPatch("{id}/Password")]
    public async Task<IActionResult> UpdateUserPassword(long id, [FromBody] String newPassword)
    {

        var user = await _userService.GetUserById(id);
        if (user == null)
        {
            return NotFound($"User with ID {id} not found.");
        }

 
        await _userService.UpdateUserPasswordAsync(id, newPassword);
        
        return NoContent();
    }

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
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }
}
