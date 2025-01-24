using Microsoft.AspNetCore.Mvc;
using Server.App.Models;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly FileService _fileService; // Dodanie zależności do FileService
    private readonly IWebHostEnvironment _env;  // Dodanie IWebHostEnvironment

    // Konstruktor kontrolera
    public UserController(IUserRepository userRepository, IUserService userService, FileService fileService, IWebHostEnvironment env)
    {
        _userService = userService;
        _fileService = fileService;  
        _env = env; // Inicjalizacja _env
    }

    // GET: /user/{id}
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

    // PATCH: /user/{id}
    [HttpPatch("{id}/Email")]
    public async Task<IActionResult> UpdateUserEmail(long id, [FromBody] User updatedUser)
    {
        // Sprawdzamy, czy ID w URL pasuje do ID w ciele zapytania
        if (id != updatedUser.Id)
        {
            return BadRequest("ID in URL does not match ID in the body.");
        }

        // Pobieramy użytkownika z bazy danych
        var user = await _userService.GetUserById(id);

        // Jeśli użytkownik nie istnieje, zwracamy 404 Not Found
        if (user == null)
        {
            return NotFound($"User with ID {id} not found.");
        }

        // Aktualizujemy tylko pola, które zostały dostarczone
        if (!string.IsNullOrEmpty(updatedUser.Email))
        {
            user.Email = updatedUser.Email;
        }
   
        await _userService.UpdateUser(user);

        return NoContent();
    }

    [HttpPatch("{id}/Name")]
    public async Task<IActionResult> UpdateUserName(long id, [FromBody] User updatedUser)
    {
        // Sprawdzamy, czy ID w URL pasuje do ID w ciele zapytania
        if (id != updatedUser.Id)
        {
            return BadRequest("ID in URL does not match ID in the body.");
        }

        // Pobieramy użytkownika z bazy danych
        var user = await _userService.GetUserById(id);

        // Jeśli użytkownik nie istnieje, zwracamy 404 Not Found
        if (user == null)
        {
            return NotFound($"User with ID {id} not found.");
        }

        // Aktualizujemy tylko pola, które zostały dostarczone
        if (!string.IsNullOrEmpty(updatedUser.Name))
        {
            user.Name = updatedUser.Name;
        }

        
        await _userService.UpdateUser(user);

        return NoContent();
    }

    // PATCH: /user/{userId}/Password
    [HttpPatch("{id}/Password")]
    public async Task<IActionResult> UpdateUserPassword(long id, [FromBody] String newPassword)
    {

        var user = await _userService.GetUserById(id);
        if (user == null)
        {
            return NotFound($"User with ID {id} not found.");
        }

        // Nie zajmujemy się logiką zmiany hasła w kontrolerze!
        await _userService.UpdateUserPasswordAsync(id, newPassword);
        
        return NoContent();
    }

    // PATCH: /user/{userId}/profile-picture
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

            // Jeśli użytkownik nie istnieje, zwracamy 404 Not Found
            if (user == null)
            {
                return NotFound($"User with ID {userId} not found.");
            }

            // Jeśli użytkownik ma stare zdjęcie, usuń je
            if (!string.IsNullOrEmpty(user.Picture))
            {
                var oldFilePath = Path.Combine(_env.WebRootPath, user.Picture.TrimStart('/'));
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath); // Usuń stare zdjęcie
                }
            }

            // Zapisz nowe zdjęcie użytkownika
            var filePath = await _fileService.SaveFileAsync(file, "uploads/user-images");

            // Zaktualizuj ścieżkę zdjęcia użytkownika w bazie danych
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
