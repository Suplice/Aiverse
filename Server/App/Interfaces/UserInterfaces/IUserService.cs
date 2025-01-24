using Server.App.Models;

public interface IUserService
{
    Task<User?> GetUserById(long id);
    Task UpdateUser(User user);
    Task<string> SaveUserImageAsync(long userId, IFormFile image);
    Task UpdateUserPasswordAsync(long id, string newPassword);
}
