using Microsoft.Extensions.Options;
using Server.App.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:5173")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
        });
});



builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddScoped<IAIServiceService, AIServiceService>();
builder.Services.AddScoped<IAIServiceRepository, AIServiceRepository>();
builder.Services.AddScoped<IAuthRepository, AuthRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();

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

app.UseCors();

app.MapControllers();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();

