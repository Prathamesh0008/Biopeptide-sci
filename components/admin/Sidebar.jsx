//peptides\components\admin\Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaTachometerAlt,
  FaShoppingBag,
  FaUsers,
  FaSignOutAlt,
  FaTimes,
  FaBox,
} from "react-icons/fa";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { href: "/admin/orders", label: "Orders", icon: FaShoppingBag },

  // ✅ ADD THIS LINE
  { href: "/admin/products", label: "Products", icon: FaBox },

  { href: "/admin/users", label: "Users", icon: FaUsers },
];


export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <aside
  className={`
    fixed lg:sticky
    lg:top-0
    z-50
    top-0 left-0 h-screen w-64
    bg-white border-r shadow-sm
    transform transition-transform duration-300
    ${open ? "translate-x-0" : "-translate-x-full"}
    lg:translate-x-0
  `}
>



      {/* HEADER */}
      <div className="p-6 border-b bg-[#0d2d47] flex items-center justify-between">
        <div>
          <p className="text-xl font-bold text-white">BioPeptide</p>
          <p className="text-xs text-white/70">Admin Panel</p>
        </div>

        {/* CLOSE (MOBILE) */}
        <button
          onClick={onClose}
          className="lg:hidden text-white"
        >
          <FaTimes />
        </button>
      </div>

      {/* LINKS */}
      <nav className="flex-1 p-4 space-y-1">
        {links.map((l) => {
          const active = pathname === l.href;
          const Icon = l.icon;

          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={onClose}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
                transition
                ${
                  active
                    ? "bg-gradient-to-r from-[#145b2f] to-[#65b4d7] text-white shadow"
                    : "text-gray-700 hover:bg-gray-100"
                }
              `}
            >
              <Icon />
              {l.label}
            </Link>
          );
        })}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t">
        <button
          onClick={() => {
            localStorage.removeItem("bio-user");
            window.location.href = "/login";
          }}
          className="flex items-center gap-3 text-red-600 text-sm"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </aside>
  );
}
