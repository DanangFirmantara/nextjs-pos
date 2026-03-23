# Redux & RTK Query - Quick Start Guide

## ✅ Setup Sudah Complete!

Redux Toolkit dengan RTK Query telah di-setup di aplikasi ini. Berikut adalah apa yang sudah dilakukan:

### 📦 Files yang Dibuat:
\\\
src/store/
├── index.ts                              # Store configuration
├── provider.tsx                          # Redux Provider wrapper
└── api/
    ├── masterReferensiApi.ts             # API service untuk referensi data
    └── EXAMPLE_barangApi.ts              # Contoh membuat API service baru

src/hooks/
└── useMasterReferensi.ts                 # Custom hook untuk fetch referensi

src/app/
└── layout.tsx                            # Updated dengan ReduxProvider

src/app/barang-stock/_components/
└── BarangModal.tsx                       # Updated untuk fetch data dari API
\\\

## 🚀 Cara Menggunakan

### 1. Fetch Data di Component (Simple)

\\\	sx
'use client';

import { useMasterReferensi } from '@/hooks/useMasterReferensi';

export default function MyComponent() {
  // Tidak ada duplicate request! RTK Query auto-cache
  const { data: kategoris, isLoading } = useMasterReferensi('Kategori');

  return (
    <select disabled={isLoading}>
      <option>Pilih kategori</option>
      {kategoris.map((k) => (
        <option key={k.id} value={k.id}>{k.vname}</option>
      ))}
    </select>
  );
}
\\\

### 2. Create/Update/Delete Data (Mutation)

Lihat file \EXAMPLE_barangApi.ts\ untuk contoh lengkap mutations.

\\\	sx
'use client';

import { useCreateBarangMutation } from '@/store/api/barangApi';

export default function CreateBarangComponent() {
  const [createBarang, { isLoading, isError }] = useCreateBarangMutation();

  const handleSave = async (formData) => {
    try {
      const result = await createBarang(formData).unwrap();
      console.log('Barang berhasil dibuat:', result);
      // List barang akan otomatis update karena invalidateTags
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={() => handleSave(...)}>Simpan</button>;
}
\\\

## 🔧 Menambah API Endpoint Baru

### Langkah 1: Buat file API service baru

\\\ash
# Example: src/store/api/transaksiApi.ts
touch src/store/api/transaksiApi.ts
\\\

### Langkah 2: Copy template dari EXAMPLE_barangApi.ts dan sesuaikan

\\\	sx
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Transaksi {
  id: string;
  nomor: string;
  total: number;
}

export const transaksiApi = createApi({
  reducerPath: 'transaksiApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8080/api' }),
  tagTypes: ['Transaksi'],
  endpoints: (builder) => ({
    getTransaksi: builder.query<Transaksi[], void>({
      query: () => '/transaksi',
      providesTags: [{ type: 'Transaksi', id: 'LIST' }],
    }),
    // ... tambah endpoints lainnya
  }),
});

export const { useGetTransaksiQuery } = transaksiApi;
\\\

### Langkah 3: Add ke store configuration

File: \src/store/index.ts\

\\\	sx
import { transaksiApi } from './api/transaksiApi';

export const store = configureStore({
  reducer: {
    [masterReferensiApi.reducerPath]: masterReferensiApi.reducer,
    [transaksiApi.reducerPath]: transaksiApi.reducer,  // <-- Add ini
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(masterReferensiApi.middleware)
      .concat(transaksiApi.middleware),  // <-- Add ini
});
\\\

### Langkah 4: Gunakan di component

\\\	sx
'use client';

import { useGetTransaksiQuery } from '@/store/api/transaksiApi';

export default function TransaksiList() {
  const { data: transaksi = [], isLoading } = useGetTransaksiQuery();
  // ...
}
\\\

## 🎯 Key Features

✅ **Automatic Caching**: Data di-cache, optimal untuk performa
✅ **Deduplication**: Multiple requests untuk data yang sama = 1 request
✅ **Auto-refetch**: Data otomatis update setelah mutation
✅ **Type-Safe**: Full TypeScript support
✅ **Loading States**: Built-in loading, error, success states
✅ **Offline Support**: Data tersimpan di cache meskipun offline

## 📊 Cara Kerja

1. Component A request kategori → API call
2. Component B request kategori (bersamaan) → Reuse request A (deduplicated!)
3. Data di-cache di Redux store
4. Component C request kategori → Langsung dari cache (tidak ada API call)

## 🔌 Environment Variables (untuk production)

Buat file \.env.local\:

\\\
NEXT_PUBLIC_API_URL=https://api.production.com/api
\\\

Update \src/store/api/masterReferensiApi.ts\:

\\\	sx
baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
\\\

## 📚 Dokumentasi Lengkap

Lihat file \REDUX_SETUP.md\ untuk dokumentasi lengkap dan contoh advanced.

## ❓ Common Questions

**Q: Bagaimana cara refresh/refetch data?**
A: Data akan auto-refetch setelah mutation yang menggunakan \invalidateTags\. Atau manual dengan:
\\\	sx
const { data, refetch } = useGetReferensiByTypeQuery('Kategori');
refetch(); // Trigger manual refetch
\\\

**Q: Bagaimana handle error dari API?**
A: Setiap query/mutation return \isError\ dan \error\:
\\\	sx
const { data, isError, error } = useGetReferensiByTypeQuery('Kategori');
if (isError) {
  console.error('API Error:', error);
}
\\\

**Q: Apakah bisa customize base URL per endpoint?**
A: Ya, buat separate API services dengan baseQuery berbeda di masing-masing file.

## 🎓 Sumber Belajar

- RTK Query Docs: https://redux-toolkit.js.org/rtk-query/overview
- Redux Toolkit Docs: https://redux-toolkit.js.org/
- Best Practices: https://redux.js.org/usage/structuring-reducers

Happy coding! 🚀
