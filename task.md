--

1. ✅ update CHANGELOG.md pada folder frontend dan backend. (SELESAI)

## Solusi Otomatisasi
- Script otomatis (`scripts/update-changelog.js`) untuk generate dan update changelog dari commit message.
- Git hook (`.githooks/post-push` dan `.githooks/post-push.bat`) untuk menjalankan script setelah push.
- Setup script (`setup-changelog.bat` dan `setup-changelog.sh`) untuk konfigurasi otomatis.
- Dokumentasi lengkap di `CHANGELOG_SETUP.md` dan panduan cepat di `CHANGELOG_QUICK_START.md`.

Cara pakai:
- Jalankan setup: `setup-changelog.bat` (Windows) atau `bash setup-changelog.sh` (Linux/Mac)
- Tambahkan script ke package.json: `"changelog:update": "node scripts/update-changelog.js"`
- Setiap push ke git, changelog akan otomatis terupdate di backend dan frontend.