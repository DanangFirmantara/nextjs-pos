export type Kategori = "Listrik" | "Gaji" | "Perlengkapan" | "Sewa" | "Lainnya";

export interface Pengeluaran {
  id: number;
  tanggal: string;
  kategori: Kategori;
  deskripsi: string;
  nominal: number;
  pengguna: string;
}

export const KATEGORI_OPTIONS: Kategori[] = ["Listrik", "Gaji", "Perlengkapan", "Sewa", "Lainnya"];

export const KATEGORI_STYLE: Record<Kategori, string> = {
  Listrik:      "bg-orange-500 text-white",
  Gaji:         "bg-green-500 text-white",
  Perlengkapan: "bg-purple-500 text-white",
  Sewa:         "bg-blue-500 text-white",
  Lainnya:      "bg-gray-400 text-white",
};

export const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");

export const EMPTY_FORM: Omit<Pengeluaran, "id"> = {
  tanggal: "",
  kategori: "Listrik",
  deskripsi: "",
  nominal: 0,
  pengguna: "Owner",
};
