using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly FileService _fileService;

    public UserService(IUserRepository userRepository, FileService fileService)
    {
        _userRepository = userRepository;
        _fileService = fileService;
    }

    public async Task<User?> GetUserById(long id)
    {
        if (id <= 0) return null;

        var user = await _userRepository.GetUserById(id);
        return user;
    }
  
    public async Task UpdateUser(User user)
    {
        await _userRepository.UpdateUser(user); // Aktualizacja użytkownika w bazie danych
    }

    public async Task<string> SaveUserImageAsync(long userId, IFormFile image)
    {
        // Zapisz plik
        var relativePath = await _fileService.SaveFileAsync(image, "uploads/user-images");

        // Pobierz użytkownika
        var user = await _userRepository.GetUserById(userId);
        if (user == null)
        {
            throw new ArgumentException("User not found.");
        }

        // Zaktualizuj użytkownika
        user.Picture = relativePath;
        await _userRepository.UpdateUser(user);

        return relativePath;
    }
}
