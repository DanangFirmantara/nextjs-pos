"use client";

import { useState } from "react";
import { Trash2, Printer, Minus, Plus, X } from "lucide-react";
import { Button } from "./ui";
import { useKasir } from "./KasirContext";

function formatPrice(price: number) {
  return (
    "Rp " + price.toLocaleString("id-ID", { minimumFractionDigits: 0 })
  );
}

export default function RingkasanPembayaran() {
  const {
    cart,
    removeFromCart,
    updateQty,
    clearCart,
  } = useKasir();
  const [diskon, setDiskon] = useState(0);
  const [ppnEnabled, setPpnEnabled] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState<string | null>("tunai");
  const [modalOpen, setModalOpen] = useState(false);
  const [bayar, setBayar] = useState(0);

  const subTotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const discountAmount = (subTotal * diskon) / 100;
  const subtotalAfterDiscount = subTotal - discountAmount;
  const ppn = ppnEnabled ? Math.round(subtotalAfterDiscount * 0.11) : 0;
  const totalPayment = subtotalAfterDiscount + ppn;

  // For modal quick pay
  const quickAmounts = [50000, 100000, 150000, 200000];

  return (
    <div className="flex flex-col h-full">
      <h2 className="font-semibold text-base mb-4 text-gray-800">Ringkasan Pembayaran{cart.length > 0 && (
        <span className="ml-2 text-xs font-medium bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">{cart.length} Item</span>
      )}</h2>

      {/* Item Section */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-600 mb-3">Item Dipilih</h3>
        {cart.length === 0 ? (
          <div className="bg-gray-50 rounded-md border border-gray-200 p-6 flex flex-col items-center justify-center min-h-28 text-gray-400">
            <div className="text-3xl mb-2">🛒</div>
            <span className="text-xs">Keranjang masih kosong</span>
          </div>
        ) : (
          <div className="space-y-2">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center justify-between border-b border-gray-100 pb-2">
                <div className="flex-1">
                  <div className="font-medium text-xs text-gray-800 line-clamp-1">{item.product.name}</div>
                  <div className="text-xs text-gray-500">{formatPrice(item.product.price)} x {item.qty}</div>
                </div>
                <div className="flex items-center gap-1">
                  <Button size="sm" variant="ghost" onClick={() => updateQty(item.product.id, item.qty - 1)} disabled={item.qty <= 1}><Minus className="w-3 h-3" /></Button>
                  <span className="text-sm font-semibold w-4 text-center">{item.qty}</span>
                  <Button size="sm" variant="ghost" onClick={() => updateQty(item.product.id, item.qty + 1)} disabled={item.qty >= item.product.stock}><Plus className="w-3 h-3" /></Button>
                  <Button size="sm" variant="ghost" onClick={() => removeFromCart(item.product.id)}><X className="w-3 h-3 text-red-500" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="space-y-3 text-sm mb-4 border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Sub total</span>
          <span className="text-gray-800 font-medium">
            {formatPrice(subTotal)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <label className="text-gray-600 flex-1">Diskon (F7)</label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              className="w-12 border border-gray-300 rounded px-2 py-1 text-right text-sm"
              value={diskon}
              min={0}
              max={100}
              onChange={(e) => setDiskon(Number(e.target.value))}
            />
            <span className="text-gray-600">%</span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600">PPN 11%</span>
          <input
            type="checkbox"
            className="w-4 h-4 accent-blue-600 cursor-pointer"
            checked={ppnEnabled}
            onChange={(e) => setPpnEnabled(e.target.checked)}
          />
          <span className="text-gray-600 ml-2">{ppnEnabled ? formatPrice(ppn) : formatPrice(0)}</span>
        </div>
        <div className="flex justify-between items-center border-t border-gray-200 pt-3 mt-3">
          <span className="font-semibold text-gray-800">Total pembayaran</span>
          <span className="text-lg font-bold text-blue-600">
            {formatPrice(totalPayment)}
          </span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-gray-600 mb-2">Metode pembayaran:</h3>
        <div className="flex gap-2">
          <Button
            variant={selectedPayment === "tunai" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedPayment("tunai")}
            className="flex-1"
          >
            Tunai
          </Button>
          <Button
            variant={selectedPayment === "qris" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedPayment("qris")}
            className="flex-1"
          >
            QRIS
          </Button>
          <Button
            variant={selectedPayment === "debit" ? "primary" : "ghost"}
            size="sm"
            onClick={() => setSelectedPayment("debit")}
            className="flex-1"
          >
            Debit
          </Button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mt-auto">
        <Button
          variant="primary"
          size="md"
          className="w-full flex items-center justify-center gap-2"
          disabled={cart.length === 0}
          onClick={() => { setModalOpen(true); setBayar(totalPayment); }}
        >
          <Printer className="w-4 h-4" />
          Bayar (F9)
        </Button>
        <Button
          variant="secondary"
          size="md"
          className="w-full flex items-center justify-center gap-2"
          disabled={cart.length === 0}
          onClick={() => { if (confirm("Yakin hapus keranjang?")) clearCart(); }}
        >
          <Trash2 className="w-4 h-4" />
          Hapus keranjang
        </Button>
      </div>

      {/* Payment Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl w-[480px] max-w-full p-6 relative">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-600" onClick={() => setModalOpen(false)}><X className="w-5 h-5" /></button>
            <h2 className="text-lg font-bold mb-2">Pembayaran</h2>
            <p className="text-sm text-gray-600 mb-4">Silakan pilih metode pembayaran dan masukkan jumlah yang dibayarkan</p>
            <div className="bg-gray-50 rounded-lg px-4 py-3 mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">Total yang harus dibayar:</span>
              <span className="text-xl font-bold text-blue-700">{formatPrice(totalPayment)}</span>
            </div>
            <div className="mb-4">
              <div className="flex gap-2 mb-2">
                <Button
                  variant={selectedPayment === "tunai" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPayment("tunai")}
                  className="flex-1"
                >
                  Tunai
                </Button>
                <Button
                  variant={selectedPayment === "qris" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPayment("qris")}
                  className="flex-1"
                >
                  QRIS
                </Button>
                <Button
                  variant={selectedPayment === "debit" ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedPayment("debit")}
                  className="flex-1"
                >
                  Debit
                </Button>
              </div>
              <label className="block text-xs text-gray-600 mb-1">Jumlah bayar</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded px-3 py-2 text-lg font-semibold mb-2"
                value={bayar}
                min={0}
                onChange={e => setBayar(Number(e.target.value))}
              />
              <div className="flex gap-2 mb-2">
                {quickAmounts.map((amt) => (
                  <Button key={amt} size="sm" variant="secondary" onClick={() => setBayar(amt)}>{formatPrice(amt)}</Button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button className="flex-1" variant="primary" onClick={() => { setModalOpen(false); clearCart(); alert("Pembayaran berhasil dan cetak resi!"); }}>Simpan & Cetak resi</Button>
              <Button className="flex-1" variant="secondary" onClick={() => { setModalOpen(false); clearCart(); alert("Pembayaran berhasil tanpa cetak resi!"); }}>Simpan tanpa cetak resi</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
