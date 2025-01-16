using Microsoft.EntityFrameworkCore;
using Server.App.Models;

public class AppDbContext : DbContext
{
   private readonly IConfiguration _configuration;

    public AppDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = _configuration.GetConnectionString("SupabaseDatabase");
        optionsBuilder.UseNpgsql(connectionString);
        
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Ignore<Supabase.Postgrest.ClientOptions>();
        modelBuilder.Entity<User>().Ignore(e => e.BaseUrl);
        modelBuilder.Entity<AiService>().Ignore(e => e.BaseUrl);
        modelBuilder.Entity<Functions>().Ignore(e => e.BaseUrl);
        modelBuilder.Entity<LikedServices>().Ignore(e => e.BaseUrl);
    }
    public DbSet<User> Users { get; set; }

    public DbSet<AiService> AiServices { get; set; }

    public DbSet<Functions> Functions { get; set; }

    public DbSet<LikedServices> LikedServices { get; set; }
}