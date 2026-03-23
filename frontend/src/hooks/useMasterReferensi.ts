// src/hooks/useMasterReferensi.ts
import { useGetReferensiByTypeQuery } from '@/store/api/masterReferensiApi';

interface UseMasterReferensiOptions {
  enabled?: boolean;
}

/**
 * Custom hook untuk fetch master referensi (kategori, satuan, dll)
 * Data akan di-cache otomatis oleh RTK Query, jadi tidak ada duplicate request
 * 
 * @param vdesc - Tipe referensi (e.g., 'Kategori', 'Satuan')
 * @param options - Options untuk hook
 * @returns { data, isLoading, isError, error }
 * 
 * @example
 * const { data: kategoris, isLoading } = useMasterReferensi('Kategori');
 */
export function useMasterReferensi(vdesc: string, options?: UseMasterReferensiOptions) {
  const { data = [], isLoading, isError, error } = useGetReferensiByTypeQuery(
    vdesc,
    { skip: options?.enabled === false }
  );

  return { data, isLoading, isError, error };
}
