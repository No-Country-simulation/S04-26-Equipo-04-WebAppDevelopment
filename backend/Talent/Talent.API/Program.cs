using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Talent.API.Data;
using Talent.API.Repositories;
using Talent.API.Services;

var builder = WebApplication.CreateBuilder(args);

// --- Configuración de servicios ---

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

// JWT Auth Configuration
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });

// CORS: permitir que el frontend se conecte desde cualquier origen
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Conexión a PostgreSQL (con retry para errores transitorios del pooler)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsqlOptions => npgsqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(10),
            errorCodesToAdd: null
        )
    ));

// Inyección de dependencias: conectamos interfaces con implementaciones
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IDiagnosticoRepository, DiagnosticoRepository>();
builder.Services.AddScoped<IDiagnosticoService, DiagnosticoService>();
builder.Services.AddScoped<IModuloRepository, ModuloRepository>();
builder.Services.AddScoped<IRutaAprendizajeRepository, RutaAprendizajeRepository>();
builder.Services.AddScoped<IPerfilRepository, PerfilRepository>();
builder.Services.AddScoped<IVacanteRepository, VacanteRepository>();
builder.Services.AddScoped<IModuloService, ModuloService>();
builder.Services.AddScoped<IRutaAprendizajeService, RutaAprendizajeService>();
builder.Services.AddScoped<IPerfilService, PerfilService>();
builder.Services.AddScoped<IVacanteService, VacanteService>();
builder.Services.AddScoped<IMatchService, MatchService>();
builder.Services.AddScoped<IPostulacionRepository, PostulacionRepository>();
builder.Services.AddScoped<IPostulacionService, PostulacionService>();


var app = builder.Build();

// --- Ejecutar el Data Seeder al arrancar ---
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<AppDbContext>();
        await Talent.API.DataSeeder.SeedAsync(context);
    }
    catch (Exception ex)
    {
        var logger = services.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "Ocurrió un error al seedear la base de datos.");
    }
}

// --- Pipeline HTTP ---

// Siempre habilitado para el MVP
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
