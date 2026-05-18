// components/admin/StatusDropdown.jsx
"use client";

export default function StatusDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-[#d8eef3] rounded-lg px-3 py-2 text-sm font-semibold bg-white text-[#0d2d47] outline-none focus:ring-2 focus:ring-[#52c3c6]/40"
    >
      <option value="pending">Pending</option>
      <option value="paid">Paid</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
