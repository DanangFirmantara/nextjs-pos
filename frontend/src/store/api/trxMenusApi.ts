// src/store/api/trxMenusApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { barangApi } from './barangApi';

export interface TrxMenuDetail {
  imenuId: number;
  qty: number;
  totalTransaksi: number;
}

export interface TrxMenuRequest {
  itotalItem: number;
  totalTransaksi: number;
  imetodePembayaran: number | null;
  ipic: number;
  createdBy?: number;
  trxMenuDetail: TrxMenuDetail[];
}

export interface TrxMenuResponse {
  id?: number;
  message?: string;
  [key: string]: any;
}

export const trxMenusApi = createApi({
  reducerPath: 'trxMenusApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api',
  }),
  tagTypes: ['Barang'],
  endpoints: (builder) => ({
    // Create transaction with details
    createTrxMenuWithDetails: builder.mutation<TrxMenuResponse, TrxMenuRequest>({
      query: (data) => {
        return {
          url: '/trx-menus/with-details',
          method: 'POST',
          body: data,
        };
      },
      invalidatesTags: [{ type: 'Barang', id: 'LIST' }],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // Juga force refetch getAllBarang untuk memastikan data update
          dispatch(
            barangApi.endpoints.getAllBarang.initiate(undefined, {
              subscribe: false,
              forceRefetch: true,
            })
          );
        } catch (err) {
          // Handle error silently
        }
      },
    }),
  }),
});

export const { useCreateTrxMenuWithDetailsMutation } = trxMenusApi;
