// src/store/api/masterReferensiApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface MasterReferensi {
  id: string;
  vname: string;
  vdesc?: string;
}

export const masterReferensiApi = createApi({
  reducerPath: 'masterReferensiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
  }),
  endpoints: (builder) => ({
    // Get all referensi by type (e.g., Kategori, Satuan, etc)
    getReferensiByType: builder.query<MasterReferensi[], string>({
      query: (vdesc) => `/master-referensi/by-vdesc/${vdesc}`,
    }),
  }),
});

export const { useGetReferensiByTypeQuery } = masterReferensiApi;
