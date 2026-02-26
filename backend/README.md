# POS Backend - Spring Boot

Point of Sale System Backend API built with Spring Boot 3.x and PostgreSQL

## Prerequisites

- Java 17+
- Maven 3.6+
- Docker & Docker Compose (for PostgreSQL)
- IDE: IntelliJ IDEA or VS Code

## Project Structure

```
backend/
+-- src/
¦   +-- main/
¦   ¦   +-- java/com/pos/
¦   ¦   ¦   +-- config/          # Configuration classes
¦   ¦   ¦   +-- controller/      # REST controllers
¦   ¦   ¦   +-- service/         # Business logic
¦   ¦   ¦   +-- repository/      # Data access layer
¦   ¦   ¦   +-- entity/          # JPA entities
¦   ¦   ¦   +-- dto/             # Data transfer objects
¦   ¦   ¦   +-- exception/       # Custom exceptions
¦   ¦   ¦   +-- util/            # Utility classes
¦   ¦   +-- resources/
¦   ¦       +-- application.yml  # Spring Boot configuration
¦   ¦       +-- templates/       # Email templates (if needed)
¦   +-- test/
+-- pom.xml                       # Maven dependencies
+-- docker-compose.yml            # PostgreSQL setup
+-- .env.example                  # Environment variables template
+-- README.md                      # This file

## Setup Instructions

### 1. Clone the project
```bash
git clone <repository-url>
cd backend
```

### 2. Create `.env` file
```bash
cp .env.example .env
# Edit .env and set your database credentials
```

### 3. Start PostgreSQL
```bash
docker-compose up -d
```

### 4. Build the project
```bash
mvn clean install
```

### 5. Run the application
```bash
mvn spring-boot:run
```

The application will be available at `http://localhost:8080/api/v1`

## Database Access

- **pgAdmin**: http://localhost:5050
  - Email: `admin@example.com`
  - Password: `admin`

## API Endpoints

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/logout` - User logout
- `GET /api/v1/auth/health` - Health check

(Add more endpoints as you develop)

## Technology Stack

- **Framework**: Spring Boot 3.2.2
- **Language**: Java 17
- **Database**: PostgreSQL
- **ORM**: Spring Data JPA / Hibernate
- **Security**: Spring Security + JWT
- **Validation**: Spring Validation
- **Build Tool**: Maven

## Environment Variables

Below variables should be set in `.env` file:

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

## Development Notes

### Adding New Features

1. **Entity** - Create in `entity/` package with JPA annotations
2. **Repository** - Extend `JpaRepository` in `repository/` package
3. **DTO** - Create request/response models in `dto/` package
4. **Service** - Implement business logic in `service/` package
5. **Controller** - Create REST endpoints in `controller/` package

### Testing

```bash
mvn test
```

### Build for Production

```bash
mvn clean package -DskipTests
```

## CORS Configuration

Frontend URLs allowed by default:
- `http://localhost:3000`
- `http://localhost:3001`

Update in `config/CorsConfig.java` for additional origins.

## Documentation

- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL JDBC Driver](https://jdbc.postgresql.org/)

## Troubleshooting

### Port already in use
```bash
# Change port in application.yml
server.port: 8081
```

### Database connection failed
- Ensure PostgreSQL is running: `docker ps`
- Check .env variables
- Verify database exists: `docker exec pos_postgres psql -U postgres -l`

---

Created with ?? for POS System
