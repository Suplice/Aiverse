using Server.App.Models;

namespace Server.App.Services
{   
    /// <summary>
    /// Provides authentication-related services such as user registration, login, and Google login.
    /// This service interacts with the <see cref="IAuthRepository"/> to perform database operations.
    /// </summary>
    /// <remarks>
    /// The <see cref="AuthService"/> class is responsible for handling business logic related to user authentication.
    /// It uses the <see cref="IAuthRepository"/> to interact with the underlying data store.
    /// </remarks>
    public class AuthService : IAuthService
    {
        private readonly IAuthRepository _authRepository;


        /// <summary>
        /// Initializes a new instance of the <see cref="AuthService"/> class.
        /// </summary>
        /// <param name="authRepository">The repository used for authentication data access.</param>
        /// <remarks>
        /// This constructor injects the <see cref="IAuthRepository"/> dependency, which is used to perform database operations.
        /// </remarks>
        public AuthService(IAuthRepository authRepository)
        {
            _authRepository = authRepository;
        }


        /// <inheritdoc/>
        public async Task<User?> FindUserAsync(String Email)
        {
            return await _authRepository.FindUserAsync(Email);
        }

        /// <inheritdoc/>
        public async Task<ResponseAuthDTO> GoogleLogin(RequestGoogleDTO GoogleData)
        {
            User? user = await FindUserAsync(GoogleData.Email);

            if (user == null)
            {
                User newUser = new User
                {
                    Email = GoogleData.Email,
                    Name = GoogleData.GivenName,
                    Provider = "GOOGLE",
                    CreatedAt = DateTime.Now,
                    Role = "USER"
                };

                var result = await _authRepository.Register(newUser);

                if (result == null)
                {
                    return null;
                }

                ResponseAuthDTO firstResponseAuthDTO = new ResponseAuthDTO
                {
                    Id = result.Id,
                    Email = result.Email,
                    Name = result.Name,
                    Role = result.Role,
                    Provider = result.Provider
                };

                return firstResponseAuthDTO;
            }

            ResponseAuthDTO responseAuthDTO = new ResponseAuthDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Role = user.Role,
                Provider = user.Provider
            };

            return responseAuthDTO;
        }

        /// <inheritdoc/>
        public async Task<ResponseAuthDTO> Login(RequestLoginDTO LoginData)
        {

            User? user = await FindUserAsync(LoginData.Email);

            if (user == null)
            {
                return null;
            }

            var VerifyPassword = BCrypt.Net.BCrypt.EnhancedVerify(LoginData.Password, user.Password);

            if (!VerifyPassword)
            {
                return null;
            }

            ResponseAuthDTO responseAuthDTO = new ResponseAuthDTO
            {
                Id = user.Id,
                Email = user.Email,
                Name = user.Name,
                Role = user.Role
            };

            return responseAuthDTO;

        }

        /// <inheritdoc/>
        public async Task<ResponseAuthDTO> Register(RequestRegisterDTO RegisterData)
        {

            var CryptedPassword = BCrypt.Net.BCrypt.EnhancedHashPassword(RegisterData.Password, 10);

            User user = new User
            {
                Email = RegisterData.Email,
                Password = CryptedPassword,
                Provider = RegisterData.Provider,
                CreatedAt = DateTime.Now,
                Role = "USER"
            };

            var result = await _authRepository.Register(user);

            if (result == null)
            {
                return null;
            }
            ResponseAuthDTO responseAuthDTO = new ResponseAuthDTO
            {
                Id = result.Id,
                Email = result.Email,
                Name = result.Name,
                Role = result.Role
            };

            return responseAuthDTO;
        }

        /// <inheritdoc/>
        public async Task<ResponseAuthDTO> GetUserById(String UserId)
        {
            var user = await _authRepository.GetUserById(UserId);

            if (user == null)
            {
                return null;
            }

            ResponseAuthDTO responseAuthDTO = new ResponseAuthDTO
            {
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
