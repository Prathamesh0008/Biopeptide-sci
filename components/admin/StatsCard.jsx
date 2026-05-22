import {
  FaShoppingCart,
  FaClock,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

const ICONS = {
  "Total Orders": FaShoppingCart,
  "Pending Orders": FaClock,
  Users: FaUsers,
  Revenue: FaDollarSign,
};

export default function StatsCard({ title, value, subtitle }) {
  const Icon = ICONS[title];

  return (
    <div className="bg-white/90 border border-[#d8eef3] rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {title}
          </p>

          <p className="text-2xl font-black text-[#0d2d47] mt-2">{value}</p>

          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>

        {Icon && (
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#52c3c6] via-[#0978a7] to-[#0978a7] flex items-center justify-center text-white shadow">
            <Icon className="text-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
