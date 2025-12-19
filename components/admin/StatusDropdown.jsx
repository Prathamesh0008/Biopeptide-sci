//components\admin\StatusDropdown.jsx
export default function StatusDropdown({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded-lg px-3 py-1 text-sm"
    >
      <option value="pending">Pending</option>
      <option value="paid">Paid</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
      <option value="cancelled">Cancelled</option>
    </select>
  );
}
