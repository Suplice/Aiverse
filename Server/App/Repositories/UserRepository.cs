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

    /// <inheritdoc/>
    public async Task<User?> GetUserById(long id)
    {
        return await _context.Users.FindAsync(id); // Używamy FindAsync, by pobrać użytkownika po ID
    }

    /// <inheritdoc/>
    public async Task<User?> GetUserByEmailAsync(string email)
    {
        return await _context.Users
            .Where(u => u.Email == email)
            .FirstOrDefaultAsync();
    }

    /// <inheritdoc/>
    public async Task UpdateUser(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }
}
