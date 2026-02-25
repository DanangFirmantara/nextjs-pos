# Panduan Referensi Penggunaan AI dalam Pengembangan POS App

## 📋 Daftar Isi
1. [Pendahuluan](#pendahuluan)
2. [Prinsip Dasar Penggunaan AI](#prinsip-dasar-penggunaan-ai)
3. [Best Practices](#best-practices)
4. [Jenis-Jenis Tugas dengan AI](#jenis-jenis-tugas-dengan-ai)
5. [Prompt Engineering](#prompt-engineering)
6. [Debugging dengan AI](#debugging-dengan-ai)
7. [Standar Kode dan Dokumentasi](#standar-kode-dan-dokumentasi)
8. [Keamanan dan Privasi](#keamanan-dan-privasi)

---

## 🎯 Pendahuluan

Dokumen ini adalah panduan komprehensif untuk mengintegrasikan bantuan AI (GitHub Copilot) dalam proses pengembangan aplikasi POS. Tujuannya adalah meningkatkan produktivitas sambil memastikan kualitas dan keamanan kode.

---

## 🔑 Prinsip Dasar Penggunaan AI

### 1. AI sebagai Asisten, Bukan Pengganti
- AI digunakan untuk mempercepat proses pengembangan
- Developer tetap memiliki tanggung jawab penuh atas kode yang dihasilkan
- Setiap saran AI harus direview sebelum diimplementasikan

### 2. Verifikasi Selalu Diperlukan
- Periksa logika kode yang diusulkan AI
- Pastikan kode sesuai dengan requirements
- Test sebelum merge ke production

### 3. Context adalah Kunci
- Sediakan konteks lengkap dalam pertanyaan/prompt
- Jelaskan use case dan requirements dengan detail
- Referensikan file atau fungsi yang relevan

---

## ✅ Best Practices

### Komunikasi dengan AI

#### ✔️ BAIK: Prompt yang Detail dan Spesifik
```
Buatkan fungsi untuk validasi email dengan requirements:
- Mendukung format standard RFC 5322
- Return true jika valid, false jika tidak
- Handle edge case untuk email dengan subdomain
- Tambahkan unit test menggunakan Jest
File target: src/utils/validation.ts
```

#### ❌ KURANG: Prompt yang Vague
```
Buat validasi email
```

### Code Review Process
1. **Generate** - Minta AI menghasilkan kode
2. **Review** - Periksa logika dan standar kode
3. **Test** - Jalankan test untuk verifikasi
4. **Refine** - Revisi jika diperlukan
5. **Document** - Tambahkan dokumentasi

### Pemberian Feedback ke AI
- Jelaskan apa yang tidak sesuai
- Berikan contoh output yang diharapkan
- Referensikan bagian kode yang bermasalah

---

## 🛠️ Jenis-Jenis Tugas dengan AI

### ✅ SANGAT COCOK untuk AI:
- Boilerplate code dan scaffolding
- Unit tests dan test cases
- Dokumentasi dan comments
- Refactoring kode
- Error handling dan validation
- Code examples dan snippets
- Database queries dan migrations

### ⚠️ BUTUH REVIEW KETAT:
- Business logic kompleks
- Security-related code (auth, encryption)
- Performance-critical code
- API integration
- Database schema design

### ❌ TIDAK DISARANKAN:
- Architectural decisions tanpa diskusi
- Security algorithms dari scratch
- Production configuration files
- Sensitive data handling tanpa review

---

## 💡 Prompt Engineering

### Template Prompt yang Efektif

#### Template 1: Feature Implementation
```
Konteks: [Jelaskan fitur yang sedang dikerjakan]
Teknologi: [Framework, library, bahasa pemrograman]
Requirements: 
- [Requirement 1]
- [Requirement 2]
- [Requirement 3]

Constraints:
- [Constraint 1]
- [Constraint 2]

Referensi: [File atau function yang relevan]

Output yang diharapkan:
- [Output 1]
- [Output 2]
```

#### Template 2: Bug Fixing
```
Problem: [Jelaskan masalahnya]
Expected behavior: [Apa yang seharusnya terjadi]
Actual behavior: [Apa yang sebenarnya terjadi]
Error message: [Jika ada]
Code snippet: [Bagian kode yang bermasalah]
Environment: [Node version, OS, dll]
```

#### Template 3: Code Review
```
Tujuan: [Apa tujuan kode ini]
Concern: [Masalah spesifik yang ingin di-review]
Context: [File dan fungsi yang relevan]
```

---

## 🐛 Debugging dengan AI

### Strategy Debugging

1. **Isolasi Masalah**
   ```
   - Identifikasi exactly di mana error terjadi
   - Sediakan error message lengkap
   - Jelaskan steps untuk reproduce
   ```

2. **Berikan Context Lengkap**
   ```
   - Import statements
   - Function signature
   - Related code sections
   - Test cases yang fail
   ```

3. **Explain the Unexpected Behavior**
   ```
   "Fungsi ini seharusnya return Array<User>, 
    tapi return null ketika data kosong"
   ```

### Red Flags untuk Review Manual
- ⚠️ Multi-threading atau race conditions
- ⚠️ Memory leaks atau performance issues
- ⚠️ Data corruption atau loss risks
- ⚠️ Security vulnerabilities

---

## 📚 Standar Kode dan Dokumentasi

### Struktur File yang Diterima

```typescript
// 1. Imports
import { ... } from 'package';

// 2. Types/Interfaces
interface IUser {
  id: string;
  name: string;
}

// 3. Constants
const DEFAULT_TIMEOUT = 5000;

// 4. Main Function/Class
export function getUserData() {
  // Implementation
}

// 5. Helper Functions
function formatUserName() {
  // Implementation
}

// 6. Exports (jika perlu)
export { ... };
```

### Dokumentasi Minimum

```typescript
/**
 * Menjelaskan apa yang dilakukan function ini
 * 
 * @param userId - ID user yang akan diambil
 * @param options - Optional configuration
 * @returns Mengembalikan data user lengkap
 * @throws {Error} Jika user tidak ditemukan
 * 
 * @example
 * const user = await getUserData('123');
 */
export async function getUserData(userId: string, options?: UserOptions): Promise<User> {
  // Implementation
}
```

### Naming Conventions
- **Variables/Functions**: `camelCase`
- **Classes/Interfaces**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE`
- **Files**: `kebab-case.ts`
- **Folders**: `kebab-case/`

---

## 🔒 Keamanan dan Privasi

### DO's ✅
- ✅ Review semua generated security code
- ✅ Gunakan environment variables untuk secrets
- ✅ Verify input validation
- ✅ Test untuk SQL injection dan XSS
- ✅ Implement proper error handling

### DON'Ts ❌
- ❌ Jangan share production secrets di prompt
- ❌ Jangan copy-paste passwords atau API keys
- ❌ Jangan assume generated auth code sudah aman
- ❌ Jangan skip security review untuk code generator
- ❌ Jangan expose sensitive data di logging

### Checklist Sebelum Production

- [ ] Semua user input divalidasi
- [ ] Semua API calls menggunakan HTTPS
- [ ] Passwords di-hash dengan algorithm yang aman
- [ ] Error messages tidak expose sensitive info
- [ ] Rate limiting diimplementasikan
- [ ] Logging tidak mencatat sensitive data
- [ ] CORS properly configured
- [ ] SQL injections prevented (prepared statements)
- [ ] XSS protection enabled
- [ ] CSRF tokens implemented

---

## 📋 Workflow Implementasi Feature

```
1. PLAN (Planning)
   ↓
   - Deskripsikan feature requirement
   - Tentukan tech stack
   - Identifikasi dependencies
   
2. GENERATE (Generate dengan AI)
   ↓
   - Berikan konteks lengkap
   - Minta scaffold/skeleton kode
   - Tanya untuk test cases
   
3. REVIEW (Review Code)
   ↓
   - Check logic dan correctness
   - Verify security implications
   - Compare dengan requirements
   
4. TEST (Test Implementation)
   ↓
   - Run unit tests
   - Run integration tests
   - Manual testing
   
5. REFINE (Refine jika perlu)
   ↓
   - Optimize performance
   - Improve readability
   - Add documentation
   
6. DEPLOY (Deploy ke production)
   ↓
   - Final security check
   - Deploy dan monitor
```

---

## 🎓 Contoh Penggunaan Real-World

### Case 1: Membuat REST API Endpoint

**Prompt:**
```
Konteks: Build REST API untuk product management di POS app
Teknologi: Node.js + Express + TypeScript

Buat endpoint POST /api/products dengan:
- Input validation (name, price, category required)
- Store ke database (MongoDB)
- Return product dengan ID yang di-generate
- Handle error cases (duplicate, invalid data)
- Include error handling dan logging

Reference file structure:
- src/routes/products.ts (route definition)
- src/controllers/productController.ts (business logic)
- src/models/productModel.ts (database model)
```

### Case 2: Mengidentifikasi dan Fix Bug

**Prompt:**
```
Problem: Login function tidak work dengan special characters di email
Expected: Should sanitize dan accept email dengan + symbol
Actual: Returns "Invalid email" error untuk valid email

Kode:
const validateEmail = (email: string) => {
  return /^[a-zA-Z0-9@.]+$/.test(email);
};

Environment: Node 18, Express 4.18

Alternatif 1: Fix regex pattern
Alternatif 2: Use RFC 5322 compliant validation
Prefer: Alternatif 2 dengan test cases
```

---

## 📞 Tips & Tricks

### Productivity Shortcuts
1. Gunakan AI untuk generate test immediately setelah implementation
2. Ask AI untuk suggest performance optimizations
3. Use AI untuk generate juga dokumentasi bersama kode
4. Ask untuk explain complex logic sebelum refactor

### Ketika Stuck
1. Ubah cara bertanya/perspektif
2. Berikan lebih banyak context dari file lain
3. Minta AI untuk explain approach step-by-step
4. Try different approach atau architecture

### Keeping Track
- Dokumentasikan prompt yang berhasil
- Simpan contoh good vs bad outputs
- Maintain list of AI-generated components
- Regular review untuk improvement

---

## 🔄 Continuous Improvement

### Monthly Review
- [ ] Audit AI-generated code untuk bugs
- [ ] Check performance impact
- [ ] Review security of generated code
- [ ] Evaluate productivity gains
- [ ] Update this guideline document

### Team Feedback Loop
- Share successful prompts dengan team
- Discuss patterns dan anti-patterns
- Improve collective knowledge
- Align standards across developers

---

## 📞 Quick Reference

| Tugas | Rekomendasi | Review Level |
|------|-------------|--------------|
| Generate boilerplate | Very Good | Low |
| Write unit tests | Excellent | Low |
| API integration | Good | Medium |
| Database schema | Fair | High |
| Security code | Fair | Very High |
| Documentation | Excellent | Low |
| Bug fixing | Good | Medium |
| Performance tuning | Fair | High |

---

**Versi**: 1.0  
**Last Updated**: February 2026  
**Maintained By**: Development Team
