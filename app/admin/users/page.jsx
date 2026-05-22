//app\admin\users\page.jsx
"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const res = await fetch("/api/admin/users", {
        credentials: "include",
      });

      if (!res.ok) return;

      const data = await res.json();
      setUsers(data.users || []);
    };

    loadUsers();
  }, []);

  return (
    <>
      <div className="mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#0978a7]">
          Customers
        </p>
        <h1 className="text-3xl font-black text-[#0d2d47] mt-1">Users</h1>
        <p className="text-sm text-gray-600 mt-2">
          Review registered customers and admin accounts.
        </p>
      </div>

      <div className="bg-white/95 border border-[#d8eef3] rounded-2xl shadow-sm overflow-x-auto">
        {users.length === 0 ? (
          <div className="p-6 text-gray-500">No users found</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[#f0fbfd] text-[#0d2d47]">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Phone</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t border-[#e6f3f5]">
                  <td className="p-4 font-semibold text-[#0d2d47]">
                    {u.name || "-"}
                  </td>
                  <td className="p-4">{u.email}</td>
                  <td className="p-4">{u.phone || "-"}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        u.role === "admin"
                          ? "bg-[#f0fbfd] text-[#0978a7] border-[#bde9ef]"
                          : "bg-[#ecfff6] text-green-700 border-green-200"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 text-gray-500">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
