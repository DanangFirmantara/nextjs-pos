# Panduan Git Push & Update CHANGELOG

## 1. Tulis Perubahan di CHANGELOG
Tuliskan perubahan pada section `## [Unreleased]` di file:
- backend/CHANGELOG.md
- frontend/CHANGELOG.md

Contoh:
```
## [Unreleased]

### Added (Ditambahkan)
- fitur baru: integrasi pembayaran

### Fixed (Diperbaiki)
- fix: bug validasi login
```

## 2. Commit Perubahan
```bash
git add .
git commit -m "chore: update CHANGELOG versi baru"
```

## 3. Push ke Remote
```bash
git push
```
Jika ada error (rejected/non-fast-forward):
```bash
git pull --rebase
git push
```

## 4. Update Versi CHANGELOG
Jalankan script berikut untuk memindahkan isi Unreleased ke versi baru dan mengosongkan Unreleased:
```bash
node scripts/update-changelog.js
```
Script akan otomatis:
- Menaikkan versi (misal: 1.2.0 → 1.3.0)
- Memindahkan isi Unreleased ke versi baru
- Mengosongkan section Unreleased

## 5. Commit & Push Lagi
```bash
git add backend/CHANGELOG.md frontend/CHANGELOG.md
git commit -m "chore: release changelog vX.X.X"
git push
```

## 6. Selesai!
Perubahan dan versi terbaru sudah tercatat di repository.

---
**Tips:**
- Selalu tulis perubahan di section Unreleased sebelum release/push
- Jalankan script update-changelog.js setiap selesai development sebelum push

--- 

- feat: atau add:	feat: fitur baru	Minor bump (1.0.0 → 1.1.0)
- fix: atau bugfix:	fix: perbaikan bug	Patch bump (1.0.0 → 1.0.1)
- breaking atau major:	major: breaking change	Major bump (1.0.0 → 2.0.0)
- Lainnya	update docs	Patch bump (1.0.0 → 1.0.1)
