export interface Barang {
  id: number;
  kodeBarang: string;
  vname: string;
  barcode?: string;
  deskripsi?: string;
  ikategori: number;
  ijenisSatuan: number;
  hargaBeli: number;
  hargaJual: number;
  istock: number;
  iminStock: number;
  bis_active: boolean;
}

export const KATEGORI_OPTIONS = ["Semua kategori", "Minuman", "Makanan", "Lainnya"];

export const formatRupiah = (n: number) => "Rp " + n.toLocaleString("id-ID");

export const EMPTY_FORM: Omit<Barang, "id"> = {
kodeBarang: "",
  vname: "",
  barcode: "",
  deskripsi: "",
  ikategori: 0,
  ijenisSatuan: 0,
  hargaBeli: 0,
  hargaJual: 0,
  istock: 0,
  iminStock: 20,
  bis_active: true,
};
