# ?? Project Structure Index

## ?? Overview Struktur Project

```
C:\Users\Administrator\OneDrive\Desktop\copilot\pos-app\
�
+-- ?? frontend/                    # Next.js Application (rename dari nextjs-pos)
�   +-- app/
�   +-- src/
�   +-- public/
�   +-- package.json
�   +-- tsconfig.json
�   +-- README.md
�
+-- ?? backend/                     # Spring Boot Application (BARU)
�   +-- src/main/java/com/pos/
�   �   +-- PosBackendApplication.java    # Main entry point
�   �   +-- config/                       # Configuration classes
�   �   �   +-- CorsConfig.java
�   �   �   +-- JpaConfig.java
�   �   +-- controller/                   # REST Controllers
�   �   �   +-- AuthController.java
�   �   +-- service/                      # Business Logic
�   �   �   +-- AuthService.java
�   �   +-- repository/                   # Data Access Layer
�   �   �   +-- UserRepository.java
�   �   +-- entity/                       # JPA Entities
�   �   �   +-- User.java
�   �   +-- dto/                          # Data Transfer Objects
�   �   �   +-- LoginRequest.java
�   �   �   +-- LoginResponse.java
�   �   +-- exception/                    # Exception Handlers
�   �   �   +-- GlobalExceptionHandler.java
�   �   +-- util/                         # Utilities
�   �       +-- ApiResponse.java
�   +-- src/main/resources/
�   �   +-- application.yml               # Spring Boot configuration
�   �   +-- templates/                    # (optional) Email templates
�   +-- src/test/java/com/pos/           # Test classes
�   +-- pom.xml                           # Maven Configuration
�   +-- docker-compose.yml                # PostgreSQL Docker Setup
�   +-- .env.example                      # Environment Variables Template
�   +-- .gitignore                        # Git ignore rules
�   +-- README.md                         # Backend Documentation
�
+-- ?? README.md                    # Main Project Documentation
+-- ?? SETUP_COMPLETE.md            # Setup Guide & Next Steps
+-- ?? INDEX.md                     # This file
+-- ?? CHANGELOG.md                 # Root Project Changelog

```

---

## ?? File Breakdown

### Root Level Files
| File | Purpose |
|------|---------|
| `README.md` | Dokumentasi utama project, architecture, dan quick start |
| `SETUP_COMPLETE.md` | Panduan lengkap setup dan next steps |
| `INDEX.md` | Structure overview (file ini) |

### Backend Core Files

#### Configuration (3 files)
```
backend/src/main/java/com/pos/config/
+-- CorsConfig.java          - Handle CORS untuk frontend
+-- JpaConfig.java           - JPA Repository configuration
```

#### Controllers (1 file)
```
backend/src/main/java/com/pos/controller/
+-- AuthController.java      - Authentication endpoints
```

#### Services (1 file)
```
backend/src/main/java/com/pos/service/
+-- AuthService.java         - Business logic untuk authentication
```

#### Repositories (1 file)
```
backend/src/main/java/com/pos/repository/
+-- UserRepository.java      - Database queries untuk User
```

#### Entities (1 file)
```
backend/src/main/java/com/pos/entity/
+-- User.java                - User JPA Entity
```

#### DTOs (2 files)
```
backend/src/main/java/com/pos/dto/
+-- LoginRequest.java        - Request untuk login
+-- LoginResponse.java       - Response setelah login
```

#### Exception Handling (1 file)
```
backend/src/main/java/com/pos/exception/
+-- GlobalExceptionHandler.java  - Global error handling
```

#### Utilities (1 file)
```
backend/src/main/java/com/pos/util/
+-- ApiResponse.java         - Standard API response wrapper
```

#### Main Application (1 file)
```
backend/src/main/java/com/pos/
+-- PosBackendApplication.java  - Spring Boot entry point
```

#### Configuration Files (4 files)
```
backend/
+-- pom.xml                  - Maven dependencies & build config
+-- docker-compose.yml       - PostgreSQL + pgAdmin setup
+-- .env.example             - Environment variables template
+-- .gitignore               - Git ignore rules
```

#### Resources (1 file)
```
backend/src/main/resources/
+-- application.yml          - Spring Boot properties
```

#### Documentation (2 files)
```
backend/
+-- README.md                - Backend specific documentation
+-- src/test/java/com/pos/  - Test directory (empty, ready for tests)
```

---

## ?? Quick Navigation

### Untuk Menjalankan Project

**Backend:**
```bash
cd backend/
docker-compose up -d        # Start PostgreSQL
mvn spring-boot:run         # Run Spring Boot
```

**Frontend:**
```bash
cd frontend/
npm install
npm run dev
```

### Untuk Menambah Feature Baru

**Menambah Endpoint API:**
1. Create Entity: `backend/src/main/java/com/pos/entity/`
2. Create Repository: `backend/src/main/java/com/pos/repository/`
3. Create Service: `backend/src/main/java/com/pos/service/`
4. Create Controller: `backend/src/main/java/com/pos/controller/`

**Menambah Page Frontend:**
1. Create Component: `frontend/src/components/`
2. Create Page: `frontend/app/[route]/page.tsx`
3. Call API: Use fetch or axios to call backend

---

## ?? Architecture Flows

### Authentication Flow
```
Frontend Form 
  ? POST /api/v1/auth/login 
  ? AuthController 
  ? AuthService 
  ? UserRepository 
  ? Database 
  ? Return JWT Token
  ? Frontend Save Token
```

### API Flow
```
Frontend Request 
  ? CorsConfig (validate origin) 
  ? AuthController/Handler 
  ? Service Layer 
  ? Repository 
  ? Database 
  ? Response 
  ? Frontend
```

---

## ?? Technology Stack

### Frontend
- **Framework**: Next.js 14+
- **Language**: TypeScript
- **State**: Context API/Zustand
- **Styling**: Tailwind CSS

### Backend
- **Framework**: Spring Boot 3.2.2
- **Language**: Java 21
- **Database**: PostgreSQL
- **ORM**: Hibernate (via Spring Data JPA)
- **Security**: Spring Security + JWT
- **Validation**: Spring Validation

### DevOps
- **Database**: PostgreSQL 16 (Docker)
- **Admin Tool**: pgAdmin (Docker)
- **Build**: Maven
- **Containerization**: Docker & Docker Compose

---

## ?? Next Steps

1. **Rename folder** `nextjs-pos` ? `frontend`
2. **Setup backend**: `docker-compose up -d && mvn spring-boot:run`
3. **Setup frontend**: `npm install && npm run dev`
4. **Implement features** sesuai requirement
5. **Write tests** untuk backend dan frontend
6. **Deploy** ke production

---

## ?? Troubleshooting Quick Links

- Port conflict? ? Change in `backend/src/main/resources/application.yml`
- Database not connecting? ? Check `docker-compose logs postgres`
- CORS error? ? Update `backend/src/main/java/com/pos/config/CorsConfig.java`
- Java not found? ? Install Java 17+ dan update PATH
- Maven not found? ? Install Maven atau gunakan `./mvnw` (Maven Wrapper)

---

**Created**: February 26, 2026
**Status**: ? Ready for Development
**Next Document**: Read `SETUP_COMPLETE.md` for detailed setup instructions
