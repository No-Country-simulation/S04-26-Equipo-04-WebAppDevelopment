using Microsoft.EntityFrameworkCore;
using Talent.API.Data;
using Talent.API.Repositories;
using Talent.API.Services;

var builder = WebApplication.CreateBuilder(args);

// --- Configuración de servicios ---

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();

// Conexión a PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Inyección de dependencias: conectamos interfaces con implementaciones
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IAuthService, AuthService>();


var app = builder.Build();

// --- Pipeline HTTP ---

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
