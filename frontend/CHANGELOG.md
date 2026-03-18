# CHANGELOG

Semua perubahan penting pada proyek ini akan didokumentasikan di file ini.

---

## [Unreleased] - Perubahan yang belum di-push

### Added (Ditambahkan)
-

### Changed (Diubah)
-

### Fixed (Diperbaiki)
-

### Removed (Dihapus)
-

---

## [1.2.0] - 2026-03-18
### Added (Ditambahkan)
- Context global untuk kasir (KasirContext) agar ListMenu dan RingkasanPembayaran saling terhubung
- Toast notifikasi untuk aksi tambah/edit/hapus barang dan kasir
- Modal pembayaran kasir dengan quick amount, metode, dan cetak ulang
- File upload zone pada modal tambah barang dan pengeluaran

### Changed (Diubah)
- Slicing dan styling seluruh halaman utama agar sesuai desain terbaru:
  - **Kasir**: grid produk, keranjang, ringkasan pembayaran, modal pembayaran, toast, semua interaksi dummy
  - **Barang & Stok**: tabel, filter, alert stok minimum, modal tambah/edit barang, toast, upload gambar
  - **Riwayat Transaksi**: summary cards, tabel, filter, modal detail transaksi (2 kolom, breakdown item, subtotal, PPN, pembayaran, kembalian)
  - **Pengeluaran**: banner total, tabel, filter, modal tambah/edit pengeluaran, upload lampiran
- Semua tabel kini menampilkan jumlah total data di footer
- Semua modal diubah agar lebih konsisten dan responsif
- Penambahan field baru pada data dummy transaksi (ppn, bayar, kembalian, breakdown item)

### Fixed (Diperbaiki)
- Perbaikan typo pada header tabel riwayat transaksi ("Tangga/Jam" → "Tanggal/Jam")
- Perbaikan bug pada validasi form tambah/edit barang dan pengeluaran

### Removed (Dihapus)
- Kode inline yang tidak mengikuti slicing kasir (semua page kini pakai pattern komponen terpisah)

## [1.1.0] - 2026-03-03

### Other
- integrasi backend to db
- dokumentasi project
- integrasi postgress di backend dan testing frontend
- init new git

---

## [1.0.0] - 2026-02-26

### Added
- Setup awal Next.js dengan TypeScript
- Penambahan halaman login dan dashboard
- Penambahan komponen Navbar
- Penambahan context AuthContext untuk autentikasi
- Penambahan hooks useProtectedRoute
- Penambahan file konfigurasi (tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs)
- Penambahan file global stylesheet (globals.css)

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

