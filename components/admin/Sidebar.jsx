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
  { href: "/admin/products", label: "Products", icon: FaBox },
  { href: "/admin/users", label: "Users", icon: FaUsers },
];

export default function Sidebar({ open, onClose }) {
  const pathname = usePathname();

  return (
    <aside
      className={`
        fixed lg:sticky lg:top-0 z-50 top-0 left-0 h-screen w-72
        bg-white/95 backdrop-blur-xl border-r border-[#d8eef3] shadow-[20px_0_50px_-35px_rgba(13,45,71,0.45)]
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b border-[#d8eef3] bg-gradient-to-br from-[#0d2d47] via-[#0978a7] to-[#52c3c6]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-white text-[#0978a7] flex items-center justify-center font-black shadow-sm">
                  B
                </div>
                <div>
                  <p className="text-xl font-bold text-white leading-tight">
                    BioPeptide
                  </p>
                  <p className="text-xs text-white/75 mt-0.5">
                    Admin Workspace
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="lg:hidden text-white/90 hover:text-white p-2"
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5">
          {links.map((l) => {
            const active = pathname === l.href;
            const Icon = l.icon;

            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={onClose}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold
                  transition border
                  ${
                    active
                      ? "bg-gradient-to-r from-[#52c3c6] via-[#0978a7] to-[#0978a7] text-white border-transparent shadow-md"
                      : "text-gray-700 border-transparent hover:border-[#d8eef3] hover:bg-[#f2fbff] hover:text-[#0978a7]"
                  }
                `}
              >
                <span
                  className={`
                    h-9 w-9 rounded-lg flex items-center justify-center
                    ${active ? "bg-white/15" : "bg-[#f0fbfd] text-[#0978a7]"}
                  `}
                >
                  <Icon />
                </span>
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-[#d8eef3]">
          <button
            onClick={() => {
              localStorage.removeItem("bio-user");
              window.location.href = "/login";
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition"
          >
            <span className="h-9 w-9 rounded-lg bg-red-50 flex items-center justify-center">
              <FaSignOutAlt />
            </span>
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
