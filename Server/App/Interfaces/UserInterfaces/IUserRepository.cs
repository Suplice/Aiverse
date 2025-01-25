using Server.App.Models;

public interface IUserRepository
{
    Task<User?> GetUserById(long id);
    Task<User?> GetUserByEmailAsync(string email);
    Task UpdateUser(User user);
}