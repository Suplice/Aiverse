
using Server.App.Models;

public interface IAuthService{

    /// <summary>
    /// Finds a user by their email address asynchronously.
    /// </summary>
    /// <param name="Email">The email address of the user to find.</param>
    /// <returns>A <see cref="User"/> object if found; otherwise, null.</returns>
    Task<User?> FindUserAsync(String Email);

    /// <summary>
    /// Authenticates a user using their email and password.
    /// </summary>
    /// <param name="LoginData">The login data containing the user's email and password.</param>
    /// <returns>A <see cref="ResponseAuthDTO"/> object containing user details if authentication is successful; otherwise, null.</returns>
    /// <remarks>
    /// This method verifies the user's password using BCrypt for secure password hashing.
    /// </remarks>
    Task<ResponseAuthDTO> Login(RequestLoginDTO LoginData);

    /// <summary>
    /// Registers a new user with the provided registration data.
    /// </summary>
    /// <param name="RegisterData">The registration data containing the user's email, password, and provider.</param>
    /// <returns>A <see cref="ResponseAuthDTO"/> object containing the newly registered user's details if successful; otherwise, null.</returns>
    /// <remarks>
    /// The user's password is hashed using BCrypt before being stored in the database.
    /// </remarks>
    Task<ResponseAuthDTO> Register(RequestRegisterDTO RegisterData);

    /// <summary>
    /// Retrieves a user by their unique identifier.
    /// </summary>
    /// <param name="UserId">The unique identifier of the user to retrieve.</param>
    /// <returns>A <see cref="ResponseAuthDTO"/> object containing the user's details if found; otherwise, null.</returns>
    Task<ResponseAuthDTO> GetUserById(String UserId);

    /// <summary>
    /// Handles Google login by either finding an existing user or registering a new one.
    /// </summary>
    /// <param name="GoogleData">The Google login data containing user information.</param>
    /// <returns>A <see cref="ResponseAuthDTO"/> object containing user details if successful; otherwise, null.</returns>
    /// <remarks>
    /// If the user does not exist, a new user is created using the Google-provided data.
    /// </remarks>
    Task<ResponseAuthDTO> GoogleLogin(RequestGoogleDTO GoogleData);

}