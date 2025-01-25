using Microsoft.AspNetCore.Http.HttpResults;
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

    public async Task<User?> GetUserByEmailAsync(string email)
    {
        // Sprawdzamy, czy email jest podany
        if (string.IsNullOrEmpty(email))
        {
            throw new ArgumentException("Email cannot be null or empty.", nameof(email));
        }

        // Pobieramy użytkownika z repozytorium
        var user = await _userRepository.GetUserByEmailAsync(email);
        return user;
    }
  
    public async Task UpdateUser(User user)
    {
        await _userRepository.UpdateUser(user); 
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

    public async Task UpdateUserPasswordAsync(long id, string newPassword)
    {
        var user = await _userRepository.GetUserById(id);
        if (user == null)
        {
            throw new ArgumentException($"User with ID {id} not found.");
        }

        if (string.IsNullOrEmpty(newPassword))
        {
            throw new ArgumentException("Password cannot be empty.");
        }

        if (newPassword.Length < 6)
        {
            throw new ArgumentException("Password must be at least 6 characters long.");
        }

        // Sprawdzamy, czy nowe hasło nie jest takie samo jak obecne
        if (BCrypt.Net.BCrypt.EnhancedVerify(newPassword, user.Password))
        {
            throw new ArgumentException("The new password must be different from the current password.");
        }

        // Tworzymy nowe hasło po zakodowaniu
        var CryptedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(newPassword, workFactor: 12); // Przykład z wartością 12
        user.Password = CryptedPassword;

        await _userRepository.UpdateUser(user);
    }

    public async Task<bool> TryUpdateUserEmailAsync(long id, string newEmail)
    {
        // Sprawdzamy, czy email już istnieje
        var existingUser = await _userRepository.GetUserByEmailAsync(newEmail);
        if (existingUser != null)
        {
            return false; // Email jest już zajęty
        }

        // Pobieramy użytkownika
        var user = await _userRepository.GetUserById(id);
        if (user == null)
        {
            return false; // W kontrolerze już obsłużono ten przypadek
        }

        // Aktualizujemy email użytkownika
        user.Email = newEmail;
        await _userRepository.UpdateUser(user);
        return true;
    }
}
