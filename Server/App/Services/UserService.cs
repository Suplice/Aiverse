using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
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
}
