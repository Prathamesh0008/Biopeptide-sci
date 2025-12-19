//components\admin\Sidebar.jsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/users", label: "Users" },
  { href: "/admin/products", label: "Products" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r flex flex-col">
      <div className="p-6 border-b">
        <p className="text-xl font-bold text-gray-900">BioPeptide</p>
        <p className="text-xs text-gray-500">Admin Panel</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`block px-4 py-2 rounded-lg text-sm font-medium
                ${active
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"}
              `}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={() => {
            localStorage.removeItem("bio-user");
            window.location.href = "/login";
          }}
          className="w-full text-sm text-red-600 hover:underline"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
