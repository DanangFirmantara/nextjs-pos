"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import mieGoreng from "@/assets/images/mie-goreng.jpg";

export type Product = {
  id: number;
  name: string;
  code: string;
  price: number;
  stock: number;
  type: string;
  image: string;
};

export type CartItem = {
  product: Product;
  qty: number;
};

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Mie Goreng Telur",
    code: "BRG-OS1",
    price: 12000,
    stock: 120,
    type: "Makanan",
    image: mieGoreng.src,
  },
  {
    id: 2,
    name: "Mie Goreng Telur + Sosis + Bakso",
    code: "BRG-OS2",
    price: 18000,
    stock: 33,
    type: "Makanan",
    image: "/assets/images/mie-goreng-bakso.jpg",
  },
  {
    id: 3,
    name: "Roti Bakar Madu Rasa",
    code: "BRG-0B3",
    price: 15000,
    stock: 32,
    type: "Makanan",
    image: "/assets/images/roti-bakar.jpg",
  },
  {
    id: 4,
    name: "Martabak Manis Coklat",
    code: "BRG-0A1",
    price: 15000,
    stock: 3,
    type: "Makanan",
    image: "/assets/images/martabak.jpg",
  },
  {
    id: 5,
    name: "Air Mineral 600ml",
    code: "BRG-001",
    price: 5000,
    stock: 120,
    type: "Minuman",
    image: "/assets/images/air-mineral.jpg",
  },
  {
    id: 6,
    name: "Es Teh Jumbo",
    code: "BRG-002",
    price: 8000,
    stock: 81,
    type: "Minuman",
    image: "/assets/images/es-teh.jpg",
  },
  {
    id: 7,
    name: "Ocha 500ml",
    code: "BRG-003",
    price: 8000,
    stock: 32,
    type: "Minuman",
    image: "/assets/images/ocha.jpg",
  },
];

type KasirContextType = {
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  showToast: (msg: string) => void;
  toast: string | null;
  hideToast: () => void;
};

const KasirContext = createContext<KasirContextType | undefined>(undefined);

export function useKasir() {
  const ctx = useContext(KasirContext);
  if (!ctx) throw new Error("useKasir must be used within KasirProvider");
  return ctx;
}

export function KasirProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  function addToCart(product: Product) {
    setCart((prev) => {
      const found = prev.find((item) => item.product.id === product.id);
      if (found) {
        // Increase qty if stock allows
        if (found.qty < product.stock) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          setToast("Stok tidak cukup");
          return prev;
        }
      } else {
        return [...prev, { product, qty: 1 }];
      }
    });
    setToast("Produk berhasil ditambahkan");
  }

  function removeFromCart(productId: number) {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateQty(productId: number, qty: number) {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, qty: Math.max(1, Math.min(qty, item.product.stock)) }
          : item
      )
    );
  }

  function clearCart() {
    setCart([]);
  }

  function showToast(msg: string) {
    setToast(msg);
  }
  function hideToast() {
    setToast(null);
  }

  return (
    <KasirContext.Provider
      value={{
        products: PRODUCTS,
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        showToast,
        toast,
        hideToast,
      }}
    >
      {children}
    </KasirContext.Provider>
  );
}