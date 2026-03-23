// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { masterReferensiApi } from './api/masterReferensiApi';
import { barangApi } from './api/barangApi';
import { trxMenusApi } from './api/trxMenusApi';

export const store = configureStore({
  reducer: {
    [masterReferensiApi.reducerPath]: masterReferensiApi.reducer,
    [barangApi.reducerPath]: barangApi.reducer,
    [trxMenusApi.reducerPath]: trxMenusApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(masterReferensiApi.middleware).concat(barangApi.middleware).concat(trxMenusApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
