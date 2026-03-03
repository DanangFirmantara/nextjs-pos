# Backend Code Reference Guide

File ini adalah referensi utama untuk semua kode yang di-generate di folder backend.
Setiap entity, repository, service, dan controller HARUS mengikuti standar yang ada di file ini.

---

## 1. STRUKTUR PROJECT

```
backend/
├── src/main/java/com/pos/
│   ├── config/          # Konfigurasi (CORS, Security, JPA)
│   ├── controller/      # REST Controllers
│   ├── dto/             # Data Transfer Objects (Request/Response)
│   ├── entity/          # JPA Entities
│   ├── exception/       # Custom Exceptions & Global Handler
│   ├── repository/      # JPA Repositories
│   ├── service/         # Business Logic Services
│   └── util/            # Utility classes
├── src/main/resources/
│   └── application.yml  # Konfigurasi aplikasi
└── pom.xml
```

---

## 2. ENTITY TEMPLATE

Setiap entity HARUS mengikuti struktur berikut:

```java
package com.pos.entity;

import jakarta.persistence.*;
import lombok.*;
import java.sql.Timestamp;
import java.util.UUID;

@Entity
@Table(name = "nama_tabel")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NamaEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private UUID guid;

    @Column(name = "created_at")
    private Timestamp createdAt;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @Column(name = "updated_by")
    private Integer updatedBy;

    // Field-field spesifik entity
    @Column(name = "nama_kolom", length = 100, nullable = false)
    private String namaField;

    @Column(name = "bis_delete")
    @Builder.Default
    private Boolean bisDelete = false;

    // Auto-generate UUID sebelum insert
    @PrePersist
    protected void onCreate() {
        if (this.guid == null) {
            this.guid = UUID.randomUUID();
        }
    }
}
```

### Entity Rules:
- Gunakan `@Data`, `@NoArgsConstructor`, `@AllArgsConstructor`, `@Builder` dari Lombok
- Field dengan default value HARUS menggunakan `@Builder.Default`
- UUID di-generate otomatis via `@PrePersist`
- Password field HARUS menggunakan `@JsonIgnore`
- Foreign key menggunakan `@ManyToOne` dengan `FetchType.LAZY`

---

## 3. REPOSITORY TEMPLATE

```java
package com.pos.repository;

import com.pos.entity.NamaEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NamaEntityRepository extends JpaRepository<NamaEntity, Integer> {
    // Custom query methods jika diperlukan
    // Optional<NamaEntity> findByFieldName(String fieldName);
}
```

---

## 4. SERVICE TEMPLATE

Setiap service HARUS memiliki method untuk partial update:

```java
package com.pos.service;

import com.pos.entity.NamaEntity;
import com.pos.repository.NamaEntityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class NamaEntityService {
    @Autowired
    private NamaEntityRepository repository;

    // GET ALL
    public List<NamaEntity> getAll() {
        return repository.findAll();
    }

    // GET BY ID - Return single object
    public NamaEntity getById(Integer id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("NamaEntity not found"));
    }

    // CREATE
    public NamaEntity create(NamaEntity entity) {
        return repository.save(entity);
    }

    // PARTIAL UPDATE - Update hanya field yang dikirim (tidak null)
    public NamaEntity updatePartial(Integer id, NamaEntity updates) {
        NamaEntity existing = getById(id);

        // Update setiap field jika tidak null
        if (updates.getFieldName() != null) {
            existing.setFieldName(updates.getFieldName());
        }
        // ... tambahkan field lainnya

        if (updates.getBisDelete() != null) {
            existing.setBisDelete(updates.getBisDelete());
        }

        if (updates.getUpdatedBy() != null) {
            existing.setUpdatedBy(updates.getUpdatedBy());
        }

        return repository.save(existing);
    }

    // FULL UPDATE
    public NamaEntity updateFull(Integer id, NamaEntity entity) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("NamaEntity not found");
        }
        entity.setId(id);
        return repository.save(entity);
    }

    // DELETE
    public void delete(Integer id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("NamaEntity not found");
        }
        repository.deleteById(id);
    }
}
```

### Service Rules:
- `getById()` HARUS return single object, bukan Optional
- `updatePartial()` WAJIB ada untuk update field tertentu saja
- Error handling menggunakan RuntimeException (atau custom exception)

---

## 5. CONTROLLER TEMPLATE

```java
package com.pos.controller;

import com.pos.entity.NamaEntity;
import com.pos.service.NamaEntityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/nama-entities")
public class NamaEntityController {
    @Autowired
    private NamaEntityService service;

    // GET ALL
    @GetMapping
    public List<NamaEntity> getAll() {
        return service.getAll();
    }

    // GET BY ID - Return single object
    @GetMapping("/{id}")
    public NamaEntity getById(@PathVariable Integer id) {
        return service.getById(id);
    }

    // CREATE
    @PostMapping
    public NamaEntity create(@RequestBody NamaEntity entity) {
        return service.create(entity);
    }

    // FULL UPDATE
    @PutMapping("/{id}")
    public NamaEntity update(@PathVariable Integer id, @RequestBody NamaEntity entity) {
        return service.updateFull(id, entity);
    }

    // PARTIAL UPDATE - Update hanya field yang dikirim
    @PatchMapping("/{id}")
    public NamaEntity partialUpdate(@PathVariable Integer id, @RequestBody NamaEntity updates) {
        return service.updatePartial(id, updates);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Integer id) {
        service.delete(id);
    }
}
```

### Controller Rules:
- URL endpoint menggunakan kebab-case: `/api/nama-entities`
- GET by ID return single object (bukan ResponseEntity)
- PATCH untuk partial update
- PUT untuk full update

---

## 6. NAMING CONVENTIONS

| Type | Convention | Example |
|------|------------|---------|
| Entity Class | PascalCase | `MasterModule`, `UserRoleMapping` |
| Table Name | snake_case | `master_module`, `user_role_mapping` |
| Column Name | snake_case | `created_at`, `bis_delete` |
| Repository | EntityName + Repository | `MasterModuleRepository` |
| Service | EntityName + Service | `MasterModuleService` |
| Controller | EntityName + Controller | `MasterModuleController` |
| Endpoint URL | kebab-case | `/api/master-modules` |
| Field Java | camelCase | `createdAt`, `bisDelete` |

---

## 7. COMMON FIELDS (Wajib ada di setiap entity)

```java
// Primary Key
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Integer id;

// GUID - Auto generated
@Column(nullable = false, unique = true)
private UUID guid;

// Audit fields
@Column(name = "created_at")
private Timestamp createdAt;

@Column(name = "created_by")
private Integer createdBy;

@Column(name = "updated_at")
private Timestamp updatedAt;

@Column(name = "updated_by")
private Integer updatedBy;

// Soft delete flag
@Column(name = "bis_delete")
@Builder.Default
private Boolean bisDelete = false;
```

---

## 8. FOREIGN KEY RELATIONS

```java
// Many-to-One (FK)
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "foreign_key_column", nullable = false)
private RelatedEntity relatedEntity;
```

---

## 9. HIDE SENSITIVE FIELDS

```java
// Password atau field sensitif
@Column(name = "vpassword", length = 255)
@com.fasterxml.jackson.annotation.JsonIgnore
private String vpassword;
```

---

## 10. API ENDPOINT PATTERNS

| Method | URL Pattern | Action | Return |
|--------|-------------|--------|--------|
| GET | `/api/entities` | Get all | List |
| GET | `/api/entities/{id}` | Get by ID | Single Object |
| POST | `/api/entities` | Create | Created Object |
| PUT | `/api/entities/{id}` | Full Update | Updated Object |
| PATCH | `/api/entities/{id}` | Partial Update | Updated Object |
| DELETE | `/api/entities/{id}` | Delete | void |

---

## 11. ERROR HANDLING

```java
// Di Service
public Entity getById(Integer id) {
    return repository.findById(id)
            .orElseThrow(() -> new RuntimeException("Entity not found"));
}
```

---

## 12. PARTIAL UPDATE PATTERN

Partial update WAJIB mengecek setiap field apakah null atau tidak:

```java
public Entity updatePartial(Integer id, Entity updates) {
    Entity existing = getById(id);

    if (updates.getField1() != null) {
        existing.setField1(updates.getField1());
    }
    if (updates.getField2() != null) {
        existing.setField2(updates.getField2());
    }
    // ... dst untuk semua field

    return repository.save(existing);
}
```

---

## 13. POSTMAN REQUEST EXAMPLES

### Create
```http
POST /api/v1/users
Content-Type: application/json

{
  "vusername": "john_doe",
  "vpassword": "password123",
  "bisActive": true
}
```

### Partial Update
```http
PATCH /api/v1/users/1
Content-Type: application/json

{
  "vusername": "new_username"
}
```

### Full Update
```http
PUT /api/v1/users/1
Content-Type: application/json

{
  "vusername": "john_doe",
  "vpassword": "newpassword",
  "bisActive": true,
  "bisDelete": false
}
```

---

**CATATAN PENTING:**
- Semua kode yang di-generate HARUS mengikuti panduan ini
- Jika ada perubahan standar, update file ini terlebih dahulu
- File ini adalah "source of truth" untuk konsistensi kode backend