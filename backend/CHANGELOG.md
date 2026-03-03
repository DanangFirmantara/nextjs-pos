# CHANGELOG

Semua perubahan penting pada proyek ini akan didokumentasikan di file ini.

---

## [Unreleased] - Perubahan yang belum di-push

### Added (Ditambahkan)
- Entity baru dari DDL PostgreSQL:
  - MasterModule (master_module)
  - MasterRole (master_role)
  - RoleModuleMapping (role_module_mapping)
  - UserRoleMapping (user_role_mapping)
  - Users (users)
- Repository untuk setiap entity:
  - MasterModuleRepository
  - MasterRoleRepository
  - RoleModuleMappingRepository
  - UserRoleMappingRepository
  - UsersRepository
- Service layer dengan partial update support:
  - MasterModuleService
  - MasterRoleService
  - RoleModuleMappingService
  - UserRoleMappingService
  - UsersService
- Controller CRUD lengkap untuk setiap entity:
  - MasterModuleController (/api/master-modules)
  - MasterRoleController (/api/master-roles)
  - RoleModuleMappingController (/api/role-module-mappings)
  - UserRoleMappingController (/api/user-role-mappings)
  - UsersController (/api/users)
- Endpoint PATCH untuk partial update di semua controller
- HealthService dan HealthController untuk health check:
  - GET /api/health - Simple health check
  - GET /api/health/detail - Detailed health dengan system info
  - GET /api/health/ping - Simple ping endpoint
- CODE_REFERENCE.md sebagai panduan standar coding untuk backend
- Auto-generate UUID via @PrePersist di semua entity

### Changed (Diubah)
- Refactor controller untuk menggunakan service layer (bukan langsung repository)
- Update endpoint getById agar return single object (bukan ResponseEntity/Optional)
- Update application.yml configuration

### Fixed (Diperbaiki)
- Fix BOM (Byte Order Mark) pada file Java baru
- Fix @GeneratedValue error untuk UUID (pindah ke @PrePersist)
- Fix schema validation mismatch antara entity dan database

### Removed (Dihapus)
- 

### Security
- Tambah @JsonIgnore pada field password (vpassword) di entity Users



## [1.0.0] - 2026-03-03

### Added
- fitur baru

### Other
- integrasi backend to db
- dokumentasi project
- integrasi postgress di backend dan testing frontend
- init new git

## [1.0.0] - 2026-03-03

### Other
- integrasi backend to db
- dokumentasi project
- integrasi postgress di backend dan testing frontend
- init new git

---

## [1.0.0] - 2026-02-26 23:15

### Added
- Setup awal Spring Boot dengan Java 21
- Konfigurasi koneksi PostgreSQL via Docker
- Integrasi dotenv-java untuk membaca file .env
- Spring Boot DevTools untuk auto-reload saat development
- SLF4J Logger untuk logging
- SecurityConfig: Nonaktifkan autentikasi untuk semua endpoint API
- AuthController dengan endpoint:
  - POST /api/v1/auth/login
  - POST /api/v1/auth/logout
  - GET /api/v1/auth/health
- AuthService dengan login simulasi (sample JWT token)
- User entity dengan JPA/Hibernate
- CorsConfig untuk mengizinkan request dari frontend
- GlobalExceptionHandler untuk handling error

### Changed
- Update dependency ke versi terbaru (Spring Boot 3.3.5, Java 21)
- Refactor konfigurasi security agar endpoint bisa diakses tanpa autentikasi

### Fixed
- Fix BOM (Byte Order Mark) pada file Java
- Fix koneksi database (password authentication)
- Fix schema migration issue pada tabel users

---

## Format Changelog

### Tipe Perubahan:
- **Added**: Fitur baru
- **Changed**: Perubahan pada fitur yang sudah ada
- **Deprecated**: Fitur yang akan dihapus di versi mendatang
- **Removed**: Fitur yang dihapus
- **Fixed**: Bug yang diperbaiki
- **Security**: Perbaikan keamanan

### Cara Menggunakan:
1. Sebelum push ke GitHub, catat semua perubahan di bagian [Unreleased]
2. Setelah push, pindahkan ke versi baru dengan tanggal
3. Commit file ini bersama dengan perubahan lainnya
4. jika perubahan yang terjadi besar maka naikkan versi angka paling depan, begitupun seterusnya
