//components\admin\StatsCard.jsx

export default function StatsCard({ title, value, subtitle }) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
      {subtitle && (
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      )}
    </div>
  );
}
