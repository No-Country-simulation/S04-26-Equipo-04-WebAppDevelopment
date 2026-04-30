# 🚀 Guía de Inicio Rápido

## Requisitos

- [Docker](https://docs.docker.com/get-docker/) instalado
- [Docker Compose](https://docs.docker.com/compose/install/) (viene con Docker Desktop)

## Levantar el proyecto

```bash
docker compose up -d
```

Esto levanta 3 servicios:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| Frontend | http://localhost:3000 | Next.js (React) |
| Backend | http://localhost:5000 | ASP.NET Core .NET 8 |
| Database | localhost:5432 | PostgreSQL 16 |

## Comandos útiles

```bash
# Ver logs en tiempo real
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f frontend
docker compose logs -f backend
docker compose logs -f db

# Detener todo
docker compose down

# Detener y borrar datos de la base de datos
docker compose down -v

# Reconstruir después de cambios en dependencias
docker compose up -d --build

# Entrar a un contenedor
docker compose exec frontend sh
docker compose exec backend sh
```

## Desarrollo

### Frontend (Next.js)

Los archivos en `frontend/` se sincronizan automáticamente con el contenedor. Solo editá y el servidor se recarga solo.

### Backend (.NET 8)

Los archivos en `backend/` se sincronizan automáticamente. `dotnet watch` detecta cambios y recompila.

### Base de datos

PostgreSQL persiste los datos en un volumen Docker (`postgres_data`). Los datos sobreviven entre `docker compose down` y `up`.

## Estructura del proyecto

```
├── frontend/           # Next.js + TypeScript + Tailwind
│   └── src/
│       ├── app/        # Next.js App Router
│       ├── domain/     # Entidades y reglas de negocio
│       ├── application/# Casos de uso
│       ├── infrastructure/ # Servicios externos
│       └── interfaces/ # Controladores/API
├── backend/            # ASP.NET Core .NET 8
│   └── src/
│       ├── Domain/     # Entidades
│       ├── Application/# Casos de uso
│       ├── Infrastructure/ # DB, servicios externos
│       └── Interfaces/ # Controllers, endpoints
└── docker-compose.yml  # Orquestación de servicios
```

## Solución de problemas

### Puerto ya en uso

Si algún puerto está ocupado, cambiá el mapeo en `docker-compose.yml`:

```yaml
ports:
  - "3001:3000"  # Cambia el primer número (host)
```

### Reconstruir desde cero

```bash
docker compose down -v --rmi all
docker compose up -d --build
```
