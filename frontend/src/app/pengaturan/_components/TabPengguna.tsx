export default function TabPengguna() {
  const users = [
    { nama: "Akbar Hidayat", role: "Kasir", email: "akbar@toko.com" },
    { nama: "Owner",         role: "Admin", email: "owner@toko.com" },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-gray-800">Daftar Pengguna</h3>
        <button onClick={() => alert("Tambah pengguna")} className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">+ Tambah Pengguna</button>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-semibold text-gray-600">
            <th className="text-left py-2">Nama</th><th className="text-left py-2">Role</th><th className="text-left py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.nama} className="border-b border-gray-100 hover:bg-gray-50">
              <td className="py-3 text-gray-700">{u.nama}</td>
              <td className="py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${u.role === "Admin" ? "bg-blue-100 text-blue-600" : "bg-gray-100 text-gray-600"}`}>{u.role}</span></td>
              <td className="py-3 text-gray-500">{u.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
