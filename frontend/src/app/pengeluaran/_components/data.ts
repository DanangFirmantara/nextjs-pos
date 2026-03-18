import { Pengeluaran } from "./types";

export const INITIAL: Pengeluaran[] = [
  { id: 1, tanggal: "22/12/2025 12:00", kategori: "Listrik",      deskripsi: "Bayar listrik bulan desember",        nominal: 850000,  pengguna: "Owner" },
  { id: 2, tanggal: "22/12/2025 12:00", kategori: "Gaji",         deskripsi: "Gaji mingguan karyawan 1-15 oktober", nominal: 3500000, pengguna: "Owner" },
  { id: 3, tanggal: "22/12/2025 12:00", kategori: "Perlengkapan", deskripsi: "Beli kantong plastik",                nominal: 250000,  pengguna: "Owner" },
  { id: 4, tanggal: "22/12/2025 12:00", kategori: "Sewa",         deskripsi: "Sewa toko bulan oktober",             nominal: 5000000, pengguna: "Owner" },
];
