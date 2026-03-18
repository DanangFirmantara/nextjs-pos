export interface Barang {
  id: number;
  kode: string;
  nama: string;
  barcode?: string;
  deskripsi?: string;
  kategori: "Minuman" | "Makanan" | "Lainnya";
  satuan: string;
  hargaBeli: number;
  hargaJual: number;
  stok: number;
  minStok: number;
  status: "Aktif" | "Nonaktif";
}

export const KATEGORI_OPTIONS = ["Semua kategori", "Minuman", "Makanan", "Lainnya"];

export const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

export const EMPTY_FORM: Omit<Barang, "id"> = {
  kode: "",
  nama: "",
  barcode: "",
  deskripsi: "",
  kategori: "Minuman",
  satuan: "",
  hargaBeli: 0,
  hargaJual: 0,
  stok: 0,
  minStok: 20,
  status: "Aktif",
};
