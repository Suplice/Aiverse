using Microsoft.AspNetCore.Mvc;
using Server.App.Models;
using TaskManagementApp.Core.ApiResponse;

[ApiController]
[Route("user")]
public class UserController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IUserService _userService;

    public UserController(IUserRepository userRepository, IUserService userService)
    {
        _userRepository = userRepository;
        _userService = userService;
    }

    // GET: /user/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetUserById(long id)
    {
        if (id < 0)
        {
            return BadRequest("Invalid ID.");
        }

        var user = await _userRepository.GetUserById(id);

        if (user == null)
        {
            return NotFound($"User with ID {id} not found.");
        }

        return Ok(user);  // Zwróć dane użytkownika
    }

    // PATCH: /user/{id}
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateUser(long id, [FromBody] User updatedUser)
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
        if (!string.IsNullOrEmpty(updatedUser.Email))
        {
            user.Email = updatedUser.Email;
        }
        
        // Aktualizujemy dane użytkownika w bazie
        await _userService.UpdateUser(user);

        // Zwracamy 204 No Content, jeśli operacja zakończyła się sukcesem
        return NoContent();
    }
}
