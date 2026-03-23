"use client";

import { useState, useEffect } from "react";
import { Search, Plus } from "lucide-react";
import { Button, Badge } from "./ui";
import defaultImage from "@/assets/images/img_1.png";
import { useKasir } from "./KasirContext";
import { useGetAllBarangQuery } from "@/store/api/barangApi";
import Toast from "./Toast";

const KATEGORI_MAP: Record<number, string> = {
  1: "Minuman",
  2: "Makanan",
  3: "Lainnya",
};

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(price)
    .replace("IDR", "")
    .trim();

export default function ListMenu() {
  const { addToCart, toast, hideToast } = useKasir();
  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch barang data from API
  const { data: barangData = [], isLoading } = useGetAllBarangQuery();
  
  // Log ketika barangData berubah (untuk detect refetch)
  useEffect(() => {
    // Barang data has been refreshed
    if (barangData.length > 0) {
      // Data refresh detected
    }
  }, [barangData]);
  
  // Transform barang data ke format product
  const products = barangData.filter((barang) => barang.bis_active).map((barang) => ({
    id: barang.id,
    name: barang.vname,
    code: barang.kodeBarang,
    type: KATEGORI_MAP[barang.ikategori] || "Lainnya",
    price: barang.hargaJual,
    stock: barang.istock,
    image: defaultImage.src,
  }));

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "semua" || product.type.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ["semua", ...Object.values(KATEGORI_MAP)];

  return (
    <div>
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="text-gray-600">Memuat menu...</div>
        </div>
      )}
      
      {!isLoading && (
        <>
          {/* Toast Notification */}
          {toast && <Toast message={toast} duration={3000} onClose={hideToast} />}
          
          {/* Filter Section */}
          <div className="flex gap-2 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cari produk (F2)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "primary" : "secondary"}
                onClick={() => setSelectedCategory(category)}
              >
                {category === "semua" ? "Semua produk" : category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-32 w-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover h-full w-full"
                    onError={(e) => {
                      e.currentTarget.src = defaultImage.src;
                    }}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge color={product.type === "Makanan" ? "primary" : "blue"}>
                      {product.type}
                    </Badge>
                  </div>
                </div>
                <div className="p-3">
                  <div className="font-medium text-sm leading-tight text-gray-800 min-h-9 line-clamp-2">
                    {product.name}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 mb-2">{product.code}</div>
                  <div className="font-bold text-blue-600 text-base mb-3">
                    {formatPrice(product.price)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-medium ${
                        product.stock <= 3 ? "text-red-500" : "text-gray-500"
                      }`}
                    >
                      Stok: {product.stock}
                    </span>
                    <Button size="sm" variant="primary" className="gap-1" onClick={() => addToCart(product)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
