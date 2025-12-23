import {
  FaShoppingCart,
  FaClock,
  FaUsers,
  FaDollarSign,
} from "react-icons/fa";

const ICONS = {
  "Total Orders": FaShoppingCart,
  "Pending Orders": FaClock,
  "Users": FaUsers,
  "Revenue": FaDollarSign,
};

export default function StatsCard({ title, value, subtitle }) {
  const Icon = ICONS[title];

  return (
    <div
      className="
        bg-white border rounded-2xl p-6
        shadow-sm hover:shadow-md
        transition
      "
    >
      <div className="flex items-center justify-between">
        {/* TEXT */}
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <p className="text-2xl font-bold text-[#0d2d47] mt-1">
            {value}
          </p>

          {subtitle && (
            <p className="text-xs text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>

        {/* ICON */}
        {Icon && (
          <div
            className="
              h-12 w-12 rounded-xl
              bg-gradient-to-br from-[#145b2f] to-[#65b4d7]
              flex items-center justify-center
              text-white
              shadow
            "
          >
            <Icon className="text-lg" />
          </div>
        )}
      </div>
    </div>
  );
}
