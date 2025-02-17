using Server.App.Models;

public interface IUserRepository
{   
    /// <summary>
    /// Asynchronously retrieves a user by their unique identifier.
    /// </summary>
    /// <param name="id">The unique identifier of the user.</param>
    /// <returns>
    /// The <see cref="User"/> object if the user is found; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method uses <see cref="DbContext.FindAsync"/> to retrieve the user by their ID.
    /// </remarks>
    Task<User?> GetUserById(long id);

    /// <summary>
    /// Asynchronously retrieves a user by their email address.
    /// </summary>
    /// <param name="email">The email address of the user.</param>
    /// <returns>
    /// The <see cref="User"/> object if the user is found; otherwise, null.
    /// </returns>
    /// <remarks>
    /// This method queries the database to find a user with the specified email address using Entity Framework Core's <see cref="Queryable.FirstOrDefaultAsync"/>.
    /// </remarks>
    Task<User?> GetUserByEmailAsync(string email);

    /// <summary>
    /// Asynchronously updates a user's information in the database.
    /// </summary>
    /// <param name="user">The <see cref="User"/> object containing the updated user details.</param>
    /// <remarks>
    /// This method updates the user record in the database and saves the changes asynchronously.
    /// </remarks>
    Task UpdateUser(User user);
}