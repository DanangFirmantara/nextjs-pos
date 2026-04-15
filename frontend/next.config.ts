import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Menghasilkan build standalone yang optimal untuk Docker
  output: "standalone",

  // Mengaktifkan React Strict Mode untuk praktik terbaik
  reactStrictMode: true,

  // Mengurangi ukuran bundle dengan menghapus console.log saat production
  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },

  // Mengoptimalkan gambar (opsional)
  images: {
    unoptimized: true, // Direkomendasikan jika tidak menggunakan layanan image optimization Next.js
  },
};

export default nextConfig;