using System.Text.Json;
using Newtonsoft.Json;
using Server.App.Models;
using Supabase;

/// <summary>
/// The <see cref="AuthRepository"/> class is responsible for handling user authentication-related database operations.
/// It interacts with the Supabase database to perform operations such as finding, registering, and retrieving users.
/// </summary>
/// <remarks>
/// This class uses the Supabase client to communicate with the database. It is designed to be used in a server-side application
/// where user authentication and management are required. The class handles exceptions internally and returns null in case of errors.
/// </remarks>
public class AuthRepository: IAuthRepository{

    private readonly Client _supabaseClient;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthRepository"/> class.
    /// </summary>
    /// <param name="supabaseClient">The Supabase client instance used for database operations.</param>
    /// <remarks>
    /// The constructor initializes the Supabase client, which is used for all database interactions within this repository.
    /// </remarks>
    public AuthRepository(Client supabaseClient)
    {
        _supabaseClient = supabaseClient;
    }

    /// <summary>
    /// Asynchronously finds a user by their email address.
    /// </summary>
    /// <param name="Email">The email address of the user to find.</param>
    /// <returns>
    /// A <see cref="User"/> object if the user is found; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method queries the Supabase database for a user with the specified email address.
    /// If an exception occurs during the operation, it is logged, and the method returns null.
    /// </remarks>
    public async Task<User?> FindUserAsync(String Email){

        try
        {
        var responseUser = await _supabaseClient.From<User>()
                                    .Where(u => u.Email == Email)
                                    .Get();
        Console.WriteLine(responseUser.Model);
        return responseUser.Model;
        }
        catch(Exception e)
        {
            Console.WriteLine($"{e.Message}");
            return null;
        }
    }

    /// <summary>
    /// Asynchronously registers a new user in the database.
    /// </summary>
    /// <param name="user">The <see cref="User"/> object containing the user's details to be registered.</param>
    /// <returns>
    /// The registered <see cref="User"/> object if the operation is successful; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method serializes the user object to JSON and inserts it into the Supabase database.
    /// If an exception occurs during the operation, it is caught, and the method returns null.
    /// </remarks>
    public async Task<User> Register(User user){
        try
        {
            // Log the serialized JSON payload
            var jsonPayload = JsonConvert.SerializeObject(user);

            var response = await _supabaseClient.From<User>().Insert(user);

            return response.Model;
        }
        catch (Exception e)
        {
            return null;
        }

    }

    /// <summary>
    /// Asynchronously retrieves a user by their unique identifier.
    /// </summary>
    /// <param name="UserId">The unique identifier of the user as a string.</param>
    /// <returns>A <see cref="User"/> object if the user is found; otherwise, null.</returns>
    /// <remarks>
    /// This method queries the Supabase database for a user with the specified ID.
    /// The ID is parsed from a string to a long before querying the database.
    /// If an exception occurs during the operation, it is caught, and the method returns null.
    /// </remarks>
    public async Task<User?> GetUserById(String UserId){
        try {
            var id = long.Parse(UserId);
            var responseUser = await _supabaseClient.From<User>()
                                    .Where(u => u.Id == id)
                                    .Get();
            return responseUser.Model;
        }
        catch(Exception e)
        {
            return null;
        }
    }

}