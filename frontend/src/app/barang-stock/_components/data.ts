import { Barang } from "./types";

export const INITIAL_DATA: Barang[] = [
  { id: 1, kode: "BRG-001", nama: "Air Mineral 600ml",               kategori: "Minuman", satuan: "Botol", hargaBeli: 3000,  hargaJual: 5000,  stok: 120, minStok: 20, status: "Aktif" },
  { id: 2, kode: "BRG-002", nama: "Es Teh Jumbo",                    kategori: "Minuman", satuan: "Cup",   hargaBeli: 4000,  hargaJual: 8000,  stok: 81,  minStok: 20, status: "Aktif" },
  { id: 3, kode: "BRG-003", nama: "Ochaa 500ml",                     kategori: "Minuman", satuan: "Botol", hargaBeli: 4000,  hargaJual: 8000,  stok: 32,  minStok: 20, status: "Aktif" },
  { id: 4, kode: "BRG-0B3", nama: "Roti Bakar Madu",                 kategori: "Makanan", satuan: "Pcs",   hargaBeli: 8000,  hargaJual: 15000, stok: 32,  minStok: 20, status: "Aktif" },
  { id: 5, kode: "BRG-0A1", nama: "Martabak Manis Coklat",           kategori: "Makanan", satuan: "Pcs",   hargaBeli: 7500,  hargaJual: 15000, stok: 3,   minStok: 20, status: "Aktif" },
  { id: 6, kode: "BRG-0S1", nama: "Mie Goreng Telur",                kategori: "Makanan", satuan: "Pcs",   hargaBeli: 6000,  hargaJual: 12000, stok: 120, minStok: 20, status: "Aktif" },
  { id: 7, kode: "BRG-0S2", nama: "Mie Goreng Telur + Sosis + Bakso", kategori: "Makanan", satuan: "Pcs",  hargaBeli: 10000, hargaJual: 18000, stok: 33,  minStok: 20, status: "Aktif" },
];
