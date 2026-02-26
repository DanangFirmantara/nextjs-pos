# ?? Setup Refactoring - COMPLETE!

Selesai! Struktur project Anda telah direfaktor menjadi monorepo yang profesional dengan folder `frontend` dan `backend` yang terpisah.

## ? Apa Yang Telah Selesai

### Backend - Spring Boot
? Membuat folder struktur Maven yang profesional
? `pom.xml` dengan dependencies Spring Boot 3.2.2
? Configuration files (CORS, JPA)
? Sample Entity (User), Repository, Service, Controller
? DTO untuk Login Request/Response
? Exception handler dan API Response wrapper
? `.env.example` untuk environment variables
? `application.yml` dengan PostgreSQL configuration
? `docker-compose.yml` untuk PostgreSQL + pgAdmin
? Comprehensive README.md

### File-file yang Dibuat:
```
backend/
+-- pom.xml                          ?
+-- .env.example                     ?
+-- .gitignore                       ?
+-- docker-compose.yml               ?
+-- README.md                        ?
+-- src/main/java/com/pos/
    +-- PosBackendApplication.java   ?
    +-- config/
    ¦   +-- CorsConfig.java          ?
    ¦   +-- JpaConfig.java           ?
    +-- controller/
    ¦   +-- AuthController.java      ?
    +-- service/
    ¦   +-- AuthService.java         ?
    +-- repository/
    ¦   +-- UserRepository.java      ?
    +-- entity/
    ¦   +-- User.java                ?
    +-- dto/
    ¦   +-- LoginRequest.java        ?
    ¦   +-- LoginResponse.java       ?
    +-- exception/
    ¦   +-- GlobalExceptionHandler.java ?
    +-- util/
        +-- ApiResponse.java         ?
```

### Frontend - Next.js
- Folder `nextjs-pos` sudah ada (tinggal rename menjadi `frontend`)
- Semua file Next.js Anda sudah siap digunakan

### Root Project
- `README.md` dengan dokumentasi lengkap di root folder

---

## ?? TODO: Langkah Berikutnya

### 1. Rename Folder Frontend
**Jika folder nextjs-pos tidak terbuka di aplikasi lain:**

```powershell
cd C:\Users\Administrator\OneDrive\Desktop\copilot\pos-app
Rename-Item -Path nextjs-pos -NewName frontend
```

Atau gunakan File Explorer:
1. Buka `C:\Users\Administrator\OneDrive\Desktop\copilot\pos-app`
2. Klik kanan pada `nextjs-pos`
3. Pilih "Rename"
4. Ubah menjadi `frontend`

**Struktur akhir akan menjadi:**
```
pos-app/
+-- frontend/          ? dari nextjs-pos
+-- backend/           ? baru dibuat
+-- README.md
```

### 2. Setup Backend

```powershell
cd C:\Users\Administrator\OneDrive\Desktop\copilot\pos-app\backend

# 1. Copy .env dari template
copy .env.example .env

# 2. Edit .env dengan credentials Anda (jika berbeda dari default)
# DB_HOST=localhost
# DB_PORT=5432
# DB_NAME=pos_db
# DB_USERNAME=postgres
# DB_PASSWORD=postgres
# JWT_SECRET=your-secret-key

# 3. Start PostgreSQL dengan Docker
docker-compose up -d

# 4. Tunggu beberapa detik, kemudian verify
docker ps

# 5. Build project (memerlukan Maven dan Java 17+)
mvn clean install

# 6. Run Backend
mvn spring-boot:run
```

Backend akan berjalan di: **http://localhost:8080/api/v1**

### 3. Setup Frontend

```powershell
cd C:\Users\Administrator\OneDrive\Desktop\copilot\pos-app\frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

Frontend akan berjalan di: **http://localhost:3000**

### 4. Verify Semua Berjalan

```bash
# Test Backend
curl http://localhost:8080/api/v1/auth/health

# Cek PostgreSQL
docker exec pos_postgres psql -U postgres -l
```

---

## ?? Configuration Details

### Backend PostgreSQL (.env)
```env
DB_HOST=localhost           # Database host
DB_PORT=5432               # PostgreSQL port
DB_NAME=pos_db             # Database name
DB_USERNAME=postgres       # PostgreSQL user
DB_PASSWORD=postgres       # PostgreSQL password (change this!)
JWT_SECRET=change-me       # For JWT tokens
SERVER_PORT=8080           # Backend server port
APP_ENV=dev                # Environment
```

### Docker Compose Services
- **PostgreSQL**: `pos_postgres` at localhost:5432
- **pgAdmin**: `pos_pgadmin` at http://localhost:5050
  - Email: admin@example.com
  - Password: admin

---

## ?? Develop & Integrate

### Menambah Endpoint Baru di Backend

1. **Create Entity** di `backend/src/main/java/com/pos/entity/`
2. **Create Repository** di `backend/src/main/java/com/pos/repository/`
3. **Create Service** di `backend/src/main/java/com/pos/service/`
4. **Create Controller** di `backend/src/main/java/com/pos/controller/`
5. **Test dengan Postman/Insomnia**
6. **Integrate di Frontend** dengan fetch API

### Menambah Page Baru di Frontend

1. **Create component** di `frontend/src/components/`
2. **Create page** di `frontend/app/(route)/page.tsx`
3. **Test di browser**
4. **Call backend API** menggunakan fetch

---

## ?? Development Commands

### Backend
```bash
cd backend

mvn clean install          # Build project
mvn spring-boot:run        # Run dev server
mvn test                   # Run tests
mvn clean package          # Build JAR for production
```

### Frontend
```bash
cd frontend

npm install                # Install dependencies
npm run dev                # Run dev server
npm run build              # Production build
npm run lint               # Check code quality
npm test                   # Run tests
```

### Docker
```bash
docker-compose up -d       # Start services
docker-compose down        # Stop services
docker-compose down -v     # Stop + remove volumes
docker ps                  # Show running containers
docker logs pos_postgres   # View PostgreSQL logs
```

---

## ?? Resources

### Backend Documentation
- [Spring Boot 3.x Docs](https://spring.io/projects/spring-boot)
- [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
- [PostgreSQL JDBC](https://jdbc.postgresql.org/)
- [JWT in Spring](https://github.com/jwtk/jjwt)

### Frontend Documentation
- [Next.js 14 Docs](https://nextjs.org/docs)
- [React 18 Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/)

---

## ?? Important Notes

1. **Java 17+ Required**: Pastikan Java sudah ter-install
   ```bash
   java -version
   ```

2. **Maven Required**: Untuk build Spring Boot
   ```bash
   mvn -version
   ```

3. **Docker Required**: Untuk PostgreSQL
   ```bash
   docker --version
   docker-compose --version
   ```

4. **Change Passwords**: Update credentials di `.env` untuk production

5. **JWT Secret**: Generate secret yang kuat untuk production

6. **CORS Configuration**: Update allowed origins sesuai kebutuhan

---

## ?? Next Development Steps

1. ? Setup Infrastructure (Done!)
2. ? Implement User Authentication
3. ? Create Product Management
4. ? Build Order System
5. ? Add Inventory Management
6. ? Create Reports & Analytics
7. ? Deploy to Production

---

**Happy Coding! ??**

Jika ada pertanyaan atau masalah, cek README.md di folder backend/ atau root folder.
