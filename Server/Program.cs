using Microsoft.AspNetCore.Http.Features;
using Server.App.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

builder.Configuration.AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);

var webRootPath = builder.Environment.WebRootPath;

if (webRootPath == null)
{
    Console.WriteLine("WebRootPath is null, setting a default value...");
    builder.Environment.WebRootPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
}

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("https://aiverse-ebon.vercel.app")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});

builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 10 * 1024 * 1024; // 10 MB limit na pliki
});



builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAIServiceService, AIServiceService>();
builder.Services.AddScoped<IAIServiceRepository, AIServiceRepository>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<ICommentsRepository, CommentsRepository>();
builder.Services.AddScoped<ILikesRepository, LikesRepository>();
builder.Services.AddScoped<IReviewsRepository, ReviewsRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IFileService, FileService>();
builder.Services.AddScoped<ICommentsService, CommentsService>();
builder.Services.AddScoped<ILikesService, LikesService>();
builder.Services.AddScoped<IReviewsService, ReviewsService>();

builder.Services.AddControllers()
    .AddNewtonsoftJson(options =>
    {
        options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver
        {
            IgnoreSerializableAttribute = true
        };
    });

// Add controllers to the services
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<SupabaseOptions>(builder.Configuration.GetSection("Supabase"));

Console.WriteLine($"Supabase URL: {builder.Configuration["Supabase:Url"]}");
Console.WriteLine($"Supabase Key: {builder.Configuration["Supabase:Key"]}");


builder.Services.AddScoped<Supabase.Client>(_ =>
new Supabase.Client(
    builder.Configuration["Supabase:Url"],
    builder.Configuration["Supabase:Key"],
    new Supabase.SupabaseOptions
    {
        Schema = "public",
        AutoRefreshToken = true,
        AutoConnectRealtime = true
    }
));


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseCors();

app.MapControllers();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

