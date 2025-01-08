using Server.App.Models;

public interface IUserService
{
    Task<User?> GetUserById(long id);
    Task UpdateUser(User user);
}
