
public interface IAuthService{
    //Task<ResponseLoginDTO> Login(RequestLoginDTO loginData);
    Task<ResponseRegisterDTO> Register(RequestRegisterDTO RegisterData);
}