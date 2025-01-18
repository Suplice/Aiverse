using Microsoft.AspNetCore.JsonPatch.Internal;
using Server.App.Models;
using Supabase;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;

    public UserRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<User?> GetUserById(long id)
    {
        return await _context.Users.FindAsync(id); // Używamy FindAsync, by pobrać użytkownika po ID
    }

    public async Task UpdateUser(User user)
    {
        _context.Users.Update(user);
        await _context.SaveChangesAsync();
    }
}
