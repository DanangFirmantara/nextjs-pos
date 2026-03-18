import React from "react";

export function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {text}{required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

export function Input({ placeholder, value, onChange, type = "text" }: {
  placeholder?: string; value: string; onChange: (v: string) => void; type?: string;
}) {
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
  );
}

export function Select({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
      {options.map((o) => <option key={o}>{o}</option>)}
    </select>
  );
}

export function SaveBtn({ label, onClick }: { label: string; onClick?: () => void }) {
  return (
    <button onClick={onClick ?? (() => alert(`${label} berhasil disimpan`))}
      className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-600 rounded-lg hover:bg-gray-400 transition-colors">
      {label}
    </button>
  );
}
