using Microsoft.AspNetCore.JsonPatch.Internal;
using Microsoft.EntityFrameworkCore;
using Server.App.Models;
using Supabase;

/// <summary>
/// The <see cref="UserRepository"/> class is responsible for handling user-related database operations.
/// It interacts with the application database context (<see cref="AppDbContext"/>) to perform operations
/// such as retrieving users by ID or email, and updating user information.
/// </summary>
/// <remarks>
/// This class manages user data and provides methods to query and update user records in the database.
/// It uses Entity Framework Core for database interactions and handles asynchronous operations.
/// </remarks>
public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserRepository"/> class.
    /// </summary>
    /// <param name="context">The application database context (<see cref="AppDbContext"/>).</param>
    /// <remarks>
    /// The constructor initializes the application database context, which is used for database interactions.
    /// </remarks>
    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

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
    public async Task<User?> GetUserById(long id)
    {
        return await _context.Users.FindAsync(id); // Używamy FindAsync, by pobrać użytkownika po ID
    }

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
    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _context.Users
            .Where(u => u.Email == email)
            .FirstOrDefaultAsync();
    }

    /// <summary>
    /// Asynchronously updates a user's information in the database.
    /// </summary>
    /// <param name="user">The <see cref="User"/> object containing the updated user details.</param>
    /// <remarks>
    /// This method updates the user record in the database and saves the changes asynchronously.
    /// </remarks>
    public async Task UpdateUser(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }
}
