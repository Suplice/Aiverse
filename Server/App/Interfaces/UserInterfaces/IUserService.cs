using Server.App.Models;

public interface IUserService
{
    Task<User?> GetUserById(long id);
    Task<User?> GetUserByEmailAsync(string email);
    Task<bool> TryUpdateUserEmailAsync(long id, string newEmail);
    Task UpdateUser(User user);
    Task<string> SaveUserImageAsync(long userId, IFormFile image);
    Task UpdateUserPasswordAsync(long id, string newPassword);
}
