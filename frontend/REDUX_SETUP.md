# Redux & RTK Query Setup untuk POS App

## Arsitektur

Redux Toolkit dengan RTK Query digunakan untuk:
- **State Management**: Menyimpan global state aplikasi
- **API Caching**: RTK Query otomatis cache data API, cegah duplicate request
- **Deduplication**: Jika 2 component minta data yang sama, hanya 1 request yang dikirim

## File Structure

\\\
src/
├── store/
│   ├── index.ts                    # Store configuration
│   ├── provider.tsx                # Redux Provider wrapper
│   └── api/
│       └── masterReferensiApi.ts   # API endpoints
└── hooks/
    └── useMasterReferensi.ts       # Custom hook untuk fetch referensi
\\\

## Penggunaan

### 1. Setup di Root Layout (SUDAH DONE)

File: \src/app/layout.tsx\

\\\	sx
import { ReduxProvider } from '@/store/provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
\\\

### 2. Menggunakan Hook di Component

#### Cara Simple (Recommended):

\\\	sx
'use client';

import { useMasterReferensi } from '@/hooks/useMasterReferensi';

export default function MyComponent() {
  // Data akan di-cache otomatis, jadi tidak ada duplicate request
  const { data: kategoris, isLoading } = useMasterReferensi('Kategori');

  return (
    <select disabled={isLoading}>
      <option value="">Pilih kategori</option>
      {kategoris.map((k) => (
        <option key={k.id} value={k.id}>
          {k.vname}
        </option>
      ))}
    </select>
  );
}
\\\

#### Cara Advanced (Direct RTK Query):

\\\	sx
'use client';

import { useGetReferensiByTypeQuery } from '@/store/api/masterReferensiApi';

export default function MyComponent() {
  // Lebih control, tapi perlu import dari API slice
  const { data = [], isLoading, isError, error } = useGetReferensiByTypeQuery('Kategori');

  return (
    // ... JSX
  );
}
\\\

## Menambah API Endpoint Baru

### 1. Edit \src/store/api/masterReferensiApi.ts\

\\\	sx
export const masterReferensiApi = createApi({
  // ... existing config
  endpoints: (builder) => ({
    getReferensiByType: builder.query<MasterReferensi[], string>({
      query: (vdesc) => \/master-referensi/by-vdesc/\\,
    }),
    
    // Endpoint baru
    createBarang: builder.mutation<Barang, CreateBarangRequest>({
      query: (body) => ({
        url: '/barang',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetReferensiByTypeQuery, useCreateBarangMutation } = masterReferensiApi;
\\\

### 2. Gunakan di Component

\\\	sx
'use client';

import { useCreateBarangMutation } from '@/store/api/masterReferensiApi';

export default function MyComponent() {
  const [createBarang, { isLoading }] = useCreateBarangMutation();

  const handleSave = async () => {
    try {
      const result = await createBarang({ nama: 'Test', ... }).unwrap();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return <button onClick={handleSave}>Simpan</button>;
}
\\\

## Keuntungan Setup Ini

✅ **Caching Otomatis**: Data di-cache, request hanya 1x
✅ **Deduplication**: Multiple components fetch sama data = 1 request
✅ **Type-Safe**: Full TypeScript support
✅ **Synchronization**: UI otomatis update ketika data berubah
✅ **Error Handling**: Built-in error states
✅ **Loading States**: Mudah show loading indicator

## Config Base URL

File: \src/store/api/masterReferensiApi.ts\

\\\	sx
const masterReferensiApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api', // Change ini untuk production
  }),
  // ...
});
\\\

Untuk production, ubah ke environment variable:

\\\	sx
baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
\\\

## API Response Format

API harus return format berikut:

\\\json
[
  { "id": "1", "vname": "Minuman", "vdesc": "Kategori" },
  { "id": "2", "vname": "Makanan", "vdesc": "Kategori" }
]
\\\

Sesuaikan interface \MasterReferensi\ di \masterReferensiApi.ts\ jika format berbeda.
