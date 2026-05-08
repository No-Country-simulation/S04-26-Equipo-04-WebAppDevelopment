# Usa la imagen oficial del SDK de .NET 10 para compilar
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

# Copia primero solo el csproj y restaura paquetes (mejora el caché de Docker)
COPY ["Talent.API/Talent.API.csproj", "Talent.API/"]
RUN dotnet restore "Talent.API/Talent.API.csproj"

# Copia el resto del código
COPY . .
WORKDIR "/src/Talent.API"

# Compila la aplicación
RUN dotnet publish "Talent.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Usa la imagen de ASP.NET (solo ejecución, más liviana)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# Render usa el puerto 8080 por defecto para los Web Services
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Configurar Swagger para que se muestre en producción (Render)
ENV ASPNETCORE_ENVIRONMENT=Development

ENTRYPOINT ["dotnet", "Talent.API.dll"]
