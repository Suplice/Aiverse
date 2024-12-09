using Server.App.Models;

namespace Server.App.Services{
public class AuthService : IAuthService {

    private readonly IAuthRepository _authRepository;

    public AuthService(IAuthRepository authRepository){
        _authRepository = authRepository;
    }

    // public Task<ResponseLoginDTO> Login(RequestLoginDTO LoginData){

    // }

    public async Task<ResponseRegisterDTO> Register(RequestRegisterDTO RegisterData){
        var CryptedPassword =  BCrypt.Net.BCrypt.EnhancedHashPassword(RegisterData.Password, 10);

        User user = new User {
            Email = RegisterData.Email,
            Password = CryptedPassword,
            Provider = RegisterData.Provider,
            CreatedAt = DateTime.Now,
            Role = "USER"
        };

        var result = await _authRepository.Register(user);

        ResponseRegisterDTO responseRegisterDTO = new ResponseRegisterDTO {
            Id = result.Id,
            Email = result.Email,
            Name = result.Name,
            Role = result.Role
        };

        return responseRegisterDTO;
    }

}
}
