// src/store/api/barangApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// API Response type for master-menus endpoint
export interface BarangResponse {
  id: number;
  guid: string;
  createdAt: string;
  createdBy: null | string;
  updatedAt: null | string;
  updatedBy: null | string;
  vname: string;
  vdesc: string | null;
  ikategory: null | number;
  kodeBarang: string | null;
  ijenisSatuan: null | number;
  hargaJual: number;
  hargaBeli: number | null;
  istock: number | null;
  iminStock: number | null;
  fileName: null | string;
  fileType: null | string;
  filePath: null | string;
  bisDelete: boolean;
  bisActive: boolean;
}

// Domain type for frontend (based on types.ts)
export interface Barang {
  id: number;
  kodeBarang: string;
  vname: string;
  barcode?: string;
  deskripsi?: string;
  ikategori: number;
  ijenisSatuan: number;
  hargaBeli: number;
  hargaJual: number;
  istock: number;
  iminStock: number;
  bis_active: boolean;
}

// Function to transform API response to domain type
export const transformBarangResponse = (apiData: BarangResponse | any): Barang => {
  try {
    return {
      id: apiData.id || apiData.ID || 0,
      kodeBarang: apiData.kodeBarang || apiData.kodBarang || '',
      vname: apiData.vname || apiData.nama || apiData.name || '',
      barcode: apiData.barcode || undefined,
      deskripsi: apiData.vdesc || apiData.deskripsi || undefined,
      ikategori: Number(apiData.ikategory ?? apiData.ikategori ?? 0),
      ijenisSatuan: Number(apiData.ijenisSatuan ?? apiData.iJenisSatuan ?? 0),
      hargaBeli: Number(apiData.hargaBeli ?? 0),
      hargaJual: Number(apiData.hargaJual ?? 0),
      istock: Number(apiData.istock ?? apiData.stock ?? 0),
      iminStock: Number(apiData.iminStock ?? apiData.minStock ?? 0),
      bis_active: Boolean(apiData.bisActive ?? apiData.bis_active ?? true),
    };
  } catch (err) {
    throw err;
  }
};

// Function to transform frontend Barang to API request format
export const transformBarangToRequest = (barang: Omit<Barang, "id">): any => {
  const payload: any = {
    vname: barang.vname,
    kodeBarang: barang.kodeBarang,
    ijenisSatuan: barang.ijenisSatuan > 0 ? barang.ijenisSatuan : null,
    ikategory: barang.ikategori > 0 ? barang.ikategori : null,
    hargaBeli: barang.hargaBeli || 0,
    hargaJual: barang.hargaJual || 0,
    istock: barang.istock || 0,
    iminStock: barang.iminStock || 0,
    bisActive: barang.bis_active,
  };

  // Only include optional fields if they have values
  if (barang.deskripsi) {
    payload.vdesc = barang.deskripsi;
  }

  return payload;
};

export const barangApi = createApi({
  reducerPath: 'barangApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
  }),
  tagTypes: ['Barang'],
  endpoints: (builder) => ({
    // GET: Fetch all barang from master-menus endpoint
    getAllBarang: builder.query<Barang[], void>({
      query: () => '/master-menus',
      transformResponse: (response: BarangResponse[]) =>
        response.map(transformBarangResponse),
      providesTags: [{ type: 'Barang', id: 'LIST' }],
    }),

    // POST: Create barang
    createBarang: builder.mutation<BarangResponse, Omit<Barang, "id">>({
      query: (body) => ({
        url: '/master-menus',
        method: 'POST',
        body: transformBarangToRequest(body),
      }),
      invalidatesTags: [{ type: 'Barang', id: 'LIST' }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          // Handle error silently
        }
      },
    }),

    // PATCH: Update barang
    updateBarang: builder.mutation<BarangResponse, { id: number; data: Omit<Barang, "id"> }>({
      query: ({ id, data }) => ({
        url: `/master-menus/${id}`,
        method: 'POST',
        body: transformBarangToRequest(data),
      }),
      invalidatesTags: [{ type: 'Barang', id: 'LIST' }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: result } = await queryFulfilled;
        } catch (err) {
          // Handle error silently
        }
      },
    }),

    // POST: Soft delete barang (set bis_delete to true)
    deleteBarang: builder.mutation<BarangResponse, number>({
      query: (id) => ({
        url: `/master-menus/${id}`,
        method: 'POST',
        body: { bisDelete: true },
      }),
      invalidatesTags: [{ type: 'Barang', id: 'LIST' }],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          // Handle error silently
        }
      },
    }),
  }),
});

export const { 
  useGetAllBarangQuery, 
  useCreateBarangMutation,
  useUpdateBarangMutation,
  useDeleteBarangMutation,
} = barangApi;
