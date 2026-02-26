# POS (Point of Sale) System

Aplikasi Point of Sale profesional dengan arsitektur monorepo yang terpisah antara Frontend dan Backend.

## Project Structure

```
pos-app/
+-- frontend/                    # Next.js Frontend Application
¦   +-- app/                     # App Router (Next.js 13+)
¦   +-- src/
¦   ¦   +-- components/
¦   ¦   +-- context/
¦   ¦   +-- hooks/
¦   ¦   +-- types/
¦   ¦   +-- utils/
¦   +-- public/
¦   +-- package.json
¦   +-- tsconfig.json
¦   +-- README.md
¦   +-- CHANGELOG.md
¦
+-- backend/                     # Spring Boot Backend API
    +-- src/
    ¦   +-- main/
    ¦   ¦   +-- java/com/pos/
    ¦   ¦   ¦   +-- config/      # Configuration classes
    ¦   ¦   ¦   +-- controller/  # REST Controllers
    ¦   ¦   ¦   +-- service/     # Business Logic
    ¦   ¦   ¦   +-- repository/  # Data Access
    ¦   ¦   ¦   +-- entity/      # JPA Entities
    ¦   ¦   ¦   +-- dto/         # Data Transfer Objects
    ¦   ¦   ¦   +-- exception/   # Exception Handlers
    ¦   ¦   ¦   +-- util/        # Utilities
    ¦   ¦   +-- resources/
    ¦   ¦       +-- application.yml
    ¦   +-- test/
    +-- pom.xml                  # Maven Configuration
    +-- docker-compose.yml       # PostgreSQL Setup
    +-- .env.example             # Environment Template
    +-- .gitignore
    +-- README.md
```

## Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Access at: http://localhost:3000

### Backend Setup

```bash
cd backend

# 1. Start PostgreSQL
docker-compose up -d

# 2. Create .env file
cp .env.example .env

# 3. Build project
mvn clean install

# 4. Run application
mvn spring-boot:run
```

Access at: http://localhost:8080/api/v1

## Architecture

### Frontend (Next.js)
- **Framework**: Next.js 14+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Context API / Zustand
- **API Communication**: Fetch API / Axios

### Backend (Spring Boot)
- **Framework**: Spring Boot 3.2.2
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Hibernate/Spring Data JPA
- **Security**: Spring Security + JWT
- **API**: RESTful with proper error handling

## Key Features

- ? User Authentication (Frontend + Backend)
- ? JWT Token-based Authorization
- ? PostgreSQL Database Integration
- ? CORS Configuration for Frontend-Backend Communication
- ? Docker Support for Database
- ? Professional Project Structure
- ? Environment-based Configuration
- ? Global Exception Handling

## Development Workflow

1. **Frontend Development**
   - Design UI components with Next.js
   - Implement state management
   - Create API client utilities
   - Handle authentication flow

2. **Backend Development**
   - Create entities and repositories
   - Implement business logic in services
   - Build REST controllers
   - Add validation and exception handling

3. **Database**
   - Start PostgreSQL: `docker-compose up -d`
   - Access pgAdmin: http://localhost:5050
   - Create migrations as needed

## Environment Configuration

### Backend (.env)
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=pos_db
DB_USERNAME=postgres
DB_PASSWORD=postgres
JWT_SECRET=your-secret-key
SERVER_PORT=8080
APP_ENV=dev
```

## API Documentation

### Health Check
```bash
GET http://localhost:8080/api/v1/auth/health
```

### Authentication Endpoints
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout

(More endpoints to be added)

## Common Commands

### Frontend
```bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
npm test         # Run tests
npm run lint     # Run linter
```

### Backend
```bash
cd backend
mvn spring-boot:run   # Run application
mvn clean package     # Build JAR
mvn test              # Run tests
```

### Docker
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f postgres
```

## Troubleshooting

### Port Conflicts
- Frontend: Change port in `next.config.ts`
- Backend: Change `server.port` in `application.yml`

### Database Issues
- Ensure Docker is running
- Check PostgreSQL container: `docker ps`
- Reset database: `docker-compose down -v && docker-compose up -d`

### CORS Issues
- Update `CorsConfig.java` in backend
- Ensure frontend URL is in allowed origins

## Next Steps

1. Implement authentication endpoints
2. Create database schema and models
3. Build business logic services
4. Develop frontend pages and components
5. Integrate frontend with backend APIs
6. Add unit and integration tests
7. Deploy to production

---

Developed with ?? using Next.js & Spring Boot
