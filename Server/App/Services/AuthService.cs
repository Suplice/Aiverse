using Server.App.Models;

namespace Server.App.Services{
public class AuthService : IAuthService {

    private readonly IAuthRepository _authRepository;

    public AuthService(IAuthRepository authRepository){
        _authRepository = authRepository;
    }

    public async Task<User?> FindUserAsync(String Email){
        return await _authRepository.FindUserAsync(Email);
    }

    public async Task<ResponseAuthDTO> GoogleLogin(RequestGoogleDTO GoogleData){
        User? user = await FindUserAsync(GoogleData.Email);

        if(user == null){
            User newUser = new User {
                Email = GoogleData.Email,
                Name = GoogleData.Given_name,
                Provider = "GOOGLE",
                CreatedAt = DateTime.Now,
                Role = "USER"
            };

            var result = await _authRepository.Register(newUser);

            if(result == null){
                return null;
            }

            ResponseAuthDTO firstResponseAuthDTO = new ResponseAuthDTO {
                Id = result.Id,
                Email = result.Email,
                Name = result.Name,
                Role = result.Role,
                Provider = result.Provider
            };

            return firstResponseAuthDTO;
        }

        ResponseAuthDTO responseAuthDTO = new ResponseAuthDTO {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            Provider = user.Provider
        };

        return responseAuthDTO;
    }

    public async Task<ResponseAuthDTO> Login(RequestLoginDTO LoginData){

        User? user = await FindUserAsync(LoginData.Email);

        if(user == null){
            return null;
        }

        var VerifyPassword = BCrypt.Net.BCrypt.EnhancedVerify(LoginData.Password, user.Password);

        if(!VerifyPassword){
            return null;
        }

        ResponseAuthDTO responseAuthDTO = new ResponseAuthDTO {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Role = user.Role
        };
         
        return responseAuthDTO;

    }

    public async Task<ResponseAuthDTO> Register(RequestRegisterDTO RegisterData){

        var CryptedPassword =  BCrypt.Net.BCrypt.EnhancedHashPassword(RegisterData.Password, 10);

        User user = new User {
            Email = RegisterData.Email,
            Password = CryptedPassword,
            Provider = RegisterData.Provider,
            CreatedAt = DateTime.Now,
            Role = "USER"
        };

        var result = await _authRepository.Register(user);

        if(result==null){
            return null;
        }
        ResponseAuthDTO responseAuthDTO = new ResponseAuthDTO {
            Id = result.Id,
            Email = result.Email,
            Name = result.Name,
            Role = result.Role
        };

        return responseAuthDTO;
    }


    public async Task<ResponseAuthDTO> GetUserById(String UserId){
        var user = await _authRepository.GetUserById(UserId);

        if(user == null){
            return null;
        }

        ResponseAuthDTO responseAuthDTO = new ResponseAuthDTO {
            Id = user.Id,
            Email = user.Email,
            Name = user.Name,
            Role = user.Role,
            Provider = user.Provider
        };

        return responseAuthDTO;

    }

}
}
