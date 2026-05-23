# 0. Actualización del Código Base (Prerrequisito)

## ¿Qué es?

Antes de construir cualquier módulo nuevo, hay que actualizar el código existente para soportar **roles de usuario** y **protección de endpoints**. Todo el MVP depende de esto.

---

## Cambios necesarios

### 1. Agregar `TipoUsuario` a la entidad Usuario

La entidad `Usuario` actual no distingue entre profesional, empresa y admin. Hay que agregar el campo.

**Archivo:** `Entities/Usuario.cs`

```csharp
public class Usuario
{
    public long Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public string Apellido { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string TipoUsuario { get; set; } = "profesional"; // "profesional", "empresa", "admin"
    public DateTime FechaRegistro { get; set; } = DateTime.UtcNow;
}
```

**Archivo:** `Data/AppDbContext.cs` — agregar mapeo:

```csharp
entity.Property(e => e.TipoUsuario).HasColumnName("tipo_usuario");
entity.Property(e => e.FechaRegistro).HasColumnName("fecha_registro");
```

### 2. Actualizar RegisterDTO para recibir tipo

**Archivo:** `DTO/RegisterDTO.cs`

```csharp
public string TipoUsuario { get; set; } = "profesional"; // opcional, default "profesional"
```

### 3. Incluir `TipoUsuario` en el JWT (claims)

**Archivo:** `Services/AuthService.cs` — en `GenerarToken()`:

```csharp
var claims = new[]
{
    new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
    new Claim(ClaimTypes.Email, usuario.Email),
    new Claim(ClaimTypes.Name, usuario.Nombre),
    new Claim(ClaimTypes.Role, usuario.TipoUsuario)  // <-- AGREGAR
};
```

### 4. Configurar autenticación JWT en el pipeline

**Archivo:** `Program.cs` — agregar ANTES de `var app = builder.Build();`:

```csharp
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
```

Y en el pipeline HTTP, agregar `app.UseAuthentication();` ANTES de `app.UseAuthorization();`:

```csharp
app.UseAuthentication();   // <-- AGREGAR
app.UseAuthorization();
```

### 5. Proteger endpoints existentes

**Archivo:** `Controllers/UsuariosController.cs`

Los endpoints de GET pueden quedar públicos por ahora. Los de PUT y DELETE deben requerir autenticación:

```csharp
[HttpPut("{id}")]
[Authorize]
public async Task<ActionResult<UsuarioResponseDTO>> Update(...)

[HttpDelete("{id}")]
[Authorize(Roles = "admin")]
public async Task<ActionResult> Delete(...)
```

---

## Convención de tipos de ID

> **IMPORTANTE:** El código existente usa `long` (BIGINT en PostgreSQL) para el ID de Usuario. Todos los módulos nuevos deben usar `long` para PKs y FKs para mantener coherencia.

---

## Convención de niveles de skill

> **IMPORTANTE:** En toda la plataforma se usa UNA sola escala de nivel: `"basico"`, `"intermedio"`, `"avanzado"`. Esta escala se usa en:
> - Resultados del diagnóstico (nivel por categoría)
> - Skills del perfil (nivel de dominio)
> - Requisitos de vacantes (nivel requerido)
> - Dificultad de módulos de aprendizaje

---

## Convención de categorías

> **IMPORTANTE:** Existe UNA sola tabla de categorías: `CategoriaSkill` (definida en `04-skills.md`). Esta tabla es usada por:
> - Skills (categoría de la habilidad)
> - Diagnóstico (categoría de las preguntas)
> - Módulos de aprendizaje (categoría que desarrolla)
>
> No crear tablas de categorías separadas por módulo.
