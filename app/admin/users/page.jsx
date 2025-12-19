//app\admin\users\page.jsx
"use client";

import { useEffect, useState } from "react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const res = await fetch("/api/admin/users");

      if (res.status === 401 || res.status === 403) {
        window.location.href = "/login";
        return;
      }

      const data = await res.json();
      setUsers(data.users || []);
    };

    loadUsers();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Users</h1>

      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        {users.length === 0 ? (
          <div className="p-6 text-sm text-gray-500">
            No users found.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-t">
                  <td className="p-3">{u.name || "—"}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium
                        ${
                          u.role === "admin"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }
                      `}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-gray-500">
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
