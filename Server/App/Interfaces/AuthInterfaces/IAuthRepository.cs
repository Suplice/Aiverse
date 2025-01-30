
using System.Runtime.InteropServices;
using Server.App.Models;

public interface IAuthRepository
{
    Task<User?> FindUserAsync(String Email);
    Task<User> Register(User user);
    Task<User?> GetUserById(String UserId);

}



