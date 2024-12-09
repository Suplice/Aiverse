
using Server.App.Models;

public interface IAuthRepository {

    Task<User> Register(User user);

}