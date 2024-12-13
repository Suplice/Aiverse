
using Server.App.Models;

public interface IAuthService{
    Task<User?> FindUserAsync(String Email);
    Task<ResponseAuthDTO> Login(RequestLoginDTO LoginData);
    Task<ResponseAuthDTO> Register(RequestRegisterDTO RegisterData);
    Task<ResponseAuthDTO> GetUserById(String UserId);
    Task<ResponseAuthDTO> GoogleLogin(RequestGoogleDTO GoogleData);

}