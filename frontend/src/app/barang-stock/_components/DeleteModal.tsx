interface Props {
  itemName: string | null;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  entity?: string;
  isDeleting?: boolean;
}

export default function DeleteModal({ itemName, onClose, onConfirm, title = "Hapus Barang", entity = "barang", isDeleting = false }: Props) {
  if (!itemName) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-5">
          Yakin ingin menghapus <span className="font-medium text-gray-700">{itemName}</span>? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} disabled={isDeleting} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">Batal</button>
          <button onClick={onConfirm} disabled={isDeleting} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
            {isDeleting && <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />}
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
