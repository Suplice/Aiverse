
using System.Runtime.InteropServices;
using Server.App.Models;

public interface IAuthRepository
{
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
    Task<User?> FindUserAsync(String Email);

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
    Task<User> Register(User user);

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
    Task<User?> GetUserById(String UserId);

}



