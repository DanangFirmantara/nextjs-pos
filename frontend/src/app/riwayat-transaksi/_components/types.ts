export interface TransaksiItem {
  nama: string;
  qty: number;
  harga: number;
  subtotal: number;
}

export interface Transaksi {
  id: number;
  noTransaksi: string;
  tanggal: string;
  kasir: string;
  totalItem: number;
  totalPembayaran: number;
  ppn: number;
  labaKotor: number;
  metodeBayar: "Tunai" | "QRIS" | "Transfer";
  status: "Lunas" | "Pending";
  bayar: number;
  kembalian: number;
  items: TransaksiItem[];
}

export const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");
