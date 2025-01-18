using Server.App.Models;

public interface IUserRepository
{
    Task<User?> GetUserById(long id);
    Task UpdateUser(User user);
}