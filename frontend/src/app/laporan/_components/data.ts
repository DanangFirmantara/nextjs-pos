export const PENDAPATAN_HARIAN = [
  { tgl: "10 Nov", value: 1250000 },
  { tgl: "11 Nov", value: 1100000 },
  { tgl: "12 Nov", value: 800000  },
  { tgl: "13 Nov", value: 1050000 },
  { tgl: "14 Nov", value: 600000  },
  { tgl: "15 Nov", value: 1200000 },
];

export const PENGELUARAN_HARIAN = [
  { tgl: "10 Nov", value: 300000 },
  { tgl: "11 Nov", value: 450000 },
  { tgl: "12 Nov", value: 200000 },
  { tgl: "13 Nov", value: 500000 },
  { tgl: "14 Nov", value: 350000 },
  { tgl: "15 Nov", value: 400000 },
];

export const PERBANDINGAN = PENDAPATAN_HARIAN.map((d, i) => ({
  tgl: d.tgl,
  pendapatan: d.value,
  pengeluaran: PENGELUARAN_HARIAN[i].value,
}));

export const METODE_BAYAR = [
  { name: "Tunai", value: 1, color: "#22c55e" },
  { name: "QRIS",  value: 1, color: "#f59e0b" },
  { name: "Debit", value: 1, color: "#3b82f6" },
];

export const SUMMARY = {
  totalTransaksi: 54,
  totalPendapatan: 13100000,
  totalPengeluaran: 8000000,
  labaKotor: 5100000,
};
