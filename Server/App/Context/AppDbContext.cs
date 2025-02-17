using Microsoft.EntityFrameworkCore;
using Server.App.Models;

/// <summary>
/// Represents the database context for the application, providing access to the database entities.
/// </summary>
/// <remarks>
/// The <see cref="AppDbContext"/> class is responsible for managing the connection to the database
/// and configuring the entity models. It inherits from <see cref="DbContext"/> and uses Entity Framework Core
/// to interact with the database. This class also configures the database connection and ignores certain
/// properties that are not mapped to the database.
/// </remarks>
public class AppDbContext : DbContext
{
    private readonly IConfiguration _configuration;

    /// <summary>
    /// Initializes a new instance of the <see cref="AppDbContext"/> class.
    /// </summary>
    /// <param name="configuration">The configuration object used to access application settings, such as connection strings.</param>
    public AppDbContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    /// <summary>
    /// Configures the database connection and options for the context.
    /// </summary>
    /// <param name="optionsBuilder">The builder used to configure the database context options.</param>
    /// <remarks>
    /// This method sets up the connection to the PostgreSQL database using the connection string
    /// retrieved from the application configuration.
    /// </remarks>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = _configuration.GetConnectionString("SupabaseDatabase");
        optionsBuilder.UseNpgsql(connectionString);
        
    }
    
    /// <summary>
    /// Configures the entity models and their relationships for the database.
    /// </summary>
    /// <param name="modelBuilder">The builder used to construct the model for the context.</param>
    /// <remarks>
    /// This method is used to configure the database schema, such as ignoring certain properties
    /// that are not mapped to the database (e.g., <see cref="Supabase.Postgrest.ClientOptions"/> and `BaseUrl` properties).
    /// </remarks>
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

    /// <summary>
    /// Gets or sets the <see cref="DbSet{TEntity}"/> for the <see cref="User"/> entity.
    /// </summary>
    public DbSet<User> Users { get; set; }

    /// <summary>
    /// Gets or sets the <see cref="DbSet{TEntity}"/> for the <see cref="AiService"/> entity.
    /// </summary>
    public DbSet<AiService> AiServices { get; set; }

    /// <summary>
    /// Gets or sets the <see cref="DbSet{TEntity}"/> for the <see cref="Category"/> entity.
    /// </summary>
    public DbSet<Category> Categories { get; set; }

    /// <summary>
    /// Gets or sets the <see cref="DbSet{TEntity}"/> for the <see cref="LikedServices"/> entity.
    /// </summary>
    public DbSet<LikedServices> LikedServices { get; set; }

    /// <summary>
    /// Gets or sets the <see cref="DbSet{TEntity}"/> for the <see cref="AiServicesCategories"/> entity.
    /// </summary>
    public DbSet<AiServicesCategories> AiServicesCategories { get; set; }

    /// <summary>
    /// Gets or sets the <see cref="DbSet{TEntity}"/> for the <see cref="Review"/> entity.
    /// </summary>
    public DbSet<Review> Reviews { get; set; }
    
    /// <summary>
    /// Gets or sets the <see cref="DbSet{TEntity}"/> for the <see cref="Comment"/> entity.
    /// </summary>
    public DbSet<Comment> Comments { get; set; }
}