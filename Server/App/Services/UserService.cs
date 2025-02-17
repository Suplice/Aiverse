using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;


/// <summary>
/// Provides services for managing user-related operations, such as retrieving user data, updating user information, and handling user images and passwords.
/// This service interacts with the <see cref="IUserRepository"/> and <see cref="IFileService"/> to perform database and file operations.
/// </summary>
/// <remarks>
/// The <see cref="UserService"/> class is responsible for handling business logic related to users,
/// including retrieving user details, updating user information, saving user images, and managing user passwords and emails.
/// </remarks>
public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;
    private readonly IFileService _fileService;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserService"/> class.
    /// </summary>
    /// <param name="userRepository">The repository used for user data access.</param>
    /// <param name="fileService">The service used for handling file operations, such as saving user images.</param>
    /// <remarks>
    /// This constructor injects the <see cref="IUserRepository"/> and <see cref="IFileService"/> dependencies,
    /// which are used to perform database and file operations.
    /// </remarks>
    public UserService(IUserRepository userRepository, IFileService fileService)
    {
        _userRepository = userRepository;
        _fileService = fileService;
    }

    /// <inheritdoc/>
    public async Task<User?> GetUserById(long id)
    {
        if (id <= 0) return null;

        var user = await _userRepository.GetUserById(id);
        return user;
    }

    /// <inheritdoc/>
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

    /// <inheritdoc/>
    public async Task UpdateUser(User user)
    {
        await _userRepository.UpdateUser(user);
    }

    /// <inheritdoc/>
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

    /// <inheritdoc/>
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

        if (!Regex.IsMatch(newPassword, @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)"))
        {
            throw new ArgumentException("Password must contain at least one uppercase letter, one lowercase letter, and one number.");
        }

        if (BCrypt.Net.BCrypt.EnhancedVerify(newPassword, user.Password))
        {
            throw new ArgumentException("The new password must be different from the current password.");
        }


        var CryptedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(newPassword, workFactor: 12);
        user.Password = CryptedPassword;

        await _userRepository.UpdateUser(user);
    }

    /// <inheritdoc/>
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
