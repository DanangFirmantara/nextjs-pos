interface Props {
  itemName: string | null;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  entity?: string;
}

export default function DeleteModal({ itemName, onClose, onConfirm, title = "Hapus Barang", entity = "barang" }: Props) {
  if (!itemName) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-6">
        <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 mb-5">
          Yakin ingin menghapus <span className="font-medium text-gray-700">{itemName}</span>? Tindakan ini tidak dapat dibatalkan.
        </p>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Batal</button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm font-medium bg-red-600 text-white rounded-lg hover:bg-red-700">Hapus</button>
        </div>
      </div>
    </div>
  );
}
