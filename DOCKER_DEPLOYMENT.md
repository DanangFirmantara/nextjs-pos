# Docker Deployment Guide

This guide explains how to deploy the POS application using Docker with a unified docker-compose setup.

## Prerequisites

- Docker (version 20.10+)
- Docker Compose (version 1.29+)
- No need to have Node.js or Java installed locally - everything runs in containers!

## Quick Start (Single Command)

Deploy the entire application stack (Frontend, Backend, Database) with one command:

```bash
docker-compose up -d
```

This will:
- Build and start the PostgreSQL database
- Build and start the backend (Java Spring Boot on port 8080)
- Build and start the frontend (Next.js on port 3000)
- Set up PgAdmin for database management (port 5050)

## Accessing the Application

After `docker-compose up -d` completes (wait ~2-3 minutes for builds):

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database Admin (PgAdmin)**: http://localhost:5050
  - Email: `admin@example.com`
  - Password: `admin`

## Configuration

### Environment Variables

Create a `.env` file in the project root to customize settings:

```bash
cp .env.example .env
```

Edit `.env` to customize:
- Database credentials (`DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`)
- JWT secret (`JWT_SECRET`)
- API URL (`NEXT_PUBLIC_API_URL`)
- PgAdmin credentials

## Common Docker Compose Commands

```bash
# Start services (rebuild if needed)
docker-compose up -d

# Start services without rebuilding
docker-compose up -d --no-build

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Stop and remove volumes (including database data)
docker-compose down -v

# Rebuild specific service
docker-compose build backend --no-cache
docker-compose build frontend --no-cache

# Rebuild all services
docker-compose build --no-cache

# Execute command in running container
docker-compose exec backend bash
docker-compose exec frontend bash
```

## Troubleshooting

### Services keep restarting
Check logs: `docker-compose logs -f`

### Database connection errors
Ensure postgres service is healthy:
```bash
docker-compose ps
```

Wait for postgres to be ready before backend starts (healthy status shown in ps output)

### Port already in use
Change ports in docker-compose.yml:
```yaml
ports:
  - "8080:8080"  # Change first number to unused port (e.g., 8081:8080)
  - "3000:3000"  # Change first number to unused port (e.g., 3001:3000)
  - "5432:5432"
  - "5050:80"
```

### Frontend can't reach backend API
Ensure `NEXT_PUBLIC_API_URL` in `.env` matches the backend container hostname:
- For requests from container: `http://backend:8080`
- For requests from host browser: `http://localhost:8080`

### Rebuild images from scratch
```bash
docker-compose down
docker system prune -a
docker-compose up --build
```

## Production Deployment

For production, consider:

1. **Update JWT Secret**
   ```bash
   JWT_SECRET=$(openssl rand -hex 32)
   ```

2. **Use environment-specific configs**
   - Create `.env.production`
   - Set `NEXT_PUBLIC_API_URL` to your production domain

3. **Database backups**
   - Set up automated backups of the postgres_data volume

4. **Security**
   - Change PgAdmin default credentials
   - Use strong database passwords
   - Use HTTPS/SSL certificates

5. **Scaling**
   - For multiple instances, use container orchestration (Kubernetes, Docker Swarm)
   - Use Docker registries for image distribution

## Project Structure

```
pos-app/
├── backend/
│   ├── Dockerfile             # Backend build configuration
│   ├── .dockerignore          # Files to exclude from Docker build
│   ├── pom.xml
│   └── src/
├── frontend/
│   ├── Dockerfile             # Frontend build configuration
│   ├── .dockerignore          # Files to exclude from Docker build
│   ├── package.json
│   └── src/
├── docker-compose.yml         # Orchestration config (deploy with this!)
├── .env.example               # Example environment variables
└── DOCKER_DEPLOYMENT.md       # This file
```

## Performance Tips

1. **Use .dockerignore files** to reduce build context
2. **Cache layers** - dependencies are cached, source changes rebuild faster
3. **Multi-stage builds** - reduces final image size
4. **Use Alpine images** - lightweight base images

## Support

For issues or questions:
- Check the logs: `docker-compose logs`
- Verify services: `docker-compose ps`
- Inspect running containers: `docker ps`
