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
        modelBuilder.Entity<Category>().Ignore(e => e.BaseUrl);
        modelBuilder.Entity<LikedServices>().Ignore(e => e.BaseUrl);
        modelBuilder.Entity<AiServicesCategories>().Ignore(e => e.BaseUrl);
        modelBuilder.Entity<Review>().Ignore(e => e.BaseUrl);
        modelBuilder.Entity<Comment>().Ignore(e => e.BaseUrl);
    }
    public DbSet<User> Users { get; set; }

    public DbSet<AiService> AiServices { get; set; }

    public DbSet<Category> Categories { get; set; }

    public DbSet<LikedServices> LikedServices { get; set; }

    public DbSet<AiServicesCategories> AiServicesCategories { get; set; }

    public DbSet<Review> Reviews { get; set; }

    public DbSet<Comment> Comments { get; set; }
}