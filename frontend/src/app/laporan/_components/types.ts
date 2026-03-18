export type Tab = "Pendapatan" | "Pengeluaran" | "Perbandingan";

export const fmt = (n: number) => "Rp " + n.toLocaleString("id-ID");
export const fmtAxis = (n: number) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1).replace(".0", "") + "jt";
  if (n >= 1000) return (n / 1000).toFixed(0) + "rb";
  return String(n);
};
