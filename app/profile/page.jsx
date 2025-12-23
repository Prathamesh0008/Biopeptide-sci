// app/profile/page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // ✅ Load user first (from localStorage) so UI can render
  useEffect(() => {
    const stored = localStorage.getItem("bio-user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  // ✅ Load orders from DB (JWT cookie auth)
  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoadingOrders(true);

        const res = await fetch("/api/orders/my", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        // if cookie missing/expired
        if (res.status === 401) {
          localStorage.removeItem("bio-user");
          router.push("/login");
          return;
        }

        const data = await res.json();
        setOrders(data.orders || []);
      } catch (e) {
        console.error("PROFILE_ORDERS_ERROR:", e);
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user) loadOrders();
  }, [user, router]);

  const latestOrder = useMemo(() => {
    if (!orders?.length) return null;
    return orders[0];
  }, [orders]);

  const stats = useMemo(() => {
    const total = orders.length;
    const pending = orders.filter((o) => o.status === "pending").length;
    const delivered = orders.filter((o) => o.status === "delivered").length;
    return { total, pending, delivered };
  }, [orders]);

  const formatAddress = (addr) => {
    if (!addr) return "Address not added yet";
    const parts = [
      addr.fullName,
      addr.phone,
      addr.house,
      addr.area,
      addr.city,
      addr.state,
      addr.pincode,
      addr.country,
      addr.address, // in case you store combined address
    ].filter(Boolean);
    return parts.length ? parts.join(", ") : "Address not added yet";
  };

  const statusBadge = (status) => {
    if (status === "pending") return "bg-yellow-100 text-yellow-700";
    if (status === "paid") return "bg-emerald-100 text-emerald-700";
    if (status === "shipped") return "bg-blue-100 text-blue-700";
    if (status === "delivered") return "bg-green-100 text-green-700";
    if (status === "cancelled") return "bg-red-100 text-red-700";
    return "bg-gray-100 text-gray-700";
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("bio-user");
    router.push("/");
  };

  if (!user) return null;

  return (
    <main className="min-h-[80vh] bg-gradient-to-br from-white via-[#e8f7ff] to-[#d6ffe9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#0d2d47]">My Account</h1>
            <p className="text-sm text-gray-600 mt-1">
              Manage profile, address, and view your orders.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-3">
            <StatPill label="Orders" value={stats.total} />
            <StatPill label="Pending" value={stats.pending} />
            <StatPill label="Delivered" value={stats.delivered} />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT CARD */}
          <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-bioBlue to-bioGreen text-white flex items-center justify-center text-xl font-bold">
                {user.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div>
                <p className="font-semibold text-lg text-gray-900">
                  {user.name || "User"}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="space-y-2">
              <ProfileRow label="Name" value={user.name || "—"} />
              <ProfileRow label="Email" value={user.email || "—"} />
              <ProfileRow label="Phone" value={user.phone || latestOrder?.phone || "—"} />
              <ProfileRow label="Role" value={user.role || "user"} />
            </div>

            <button
              onClick={logout}
              className="mt-6 w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-bioBlue to-bioGreen hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="lg:col-span-2 space-y-8">
            {/* ADDRESS CARD */}
            <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Shipping Address</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Showing your latest checkout address.
                  </p>
                </div>

                <button
                  onClick={() => router.push("/checkout")}
                  className="text-sm font-semibold text-bioBlue hover:underline"
                >
                  Update →
                </button>
              </div>

              <div className="mt-4 border rounded-xl bg-white p-4 text-sm text-gray-700">
                {latestOrder?.address ? (
                  <>
                    <p className="font-medium text-gray-900">
                      {latestOrder.address.fullName || user.name}
                    </p>
                    <p className="text-gray-600 mt-1">
                      {formatAddress(latestOrder.address)}
                    </p>
                  </>
                ) : (
                  <p className="text-gray-600">Address not added yet</p>
                )}
              </div>
            </div>

            {/* ORDERS */}
            <div className="bg-white/85 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Order History</h2>
                <button
                  onClick={() => router.push("/")}
                  className="text-sm font-semibold text-bioBlue hover:underline"
                >
                  Shop more →
                </button>
              </div>

              {loadingOrders ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-16 rounded-xl bg-white animate-pulse border" />
                  ))}
                </div>
              ) : orders.length === 0 ? (
                <div className="border border-dashed rounded-xl p-6 text-center">
                  <p className="text-gray-600">No orders found for this account.</p>
                  <button
                    onClick={() => router.push("/")}
                    className="mt-4 px-6 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-bioBlue to-bioGreen"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border rounded-xl p-4 bg-white flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">
                          Order #{order._id.slice(-6)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Items: {order.items?.reduce((s, it) => s + (it.qty || 0), 0) || 0}
                        </p>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-gray-900">
                          ${Number(order.totals?.total || 0).toFixed(2)}
                        </p>
                        <span className={`inline-block mt-2 text-xs font-semibold px-2 py-1 rounded-full ${statusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function ProfileRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b last:border-none">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium text-gray-900">{value}</span>
    </div>
  );
}

function StatPill({ label, value }) {
  return (
    <div className="bg-white/85 backdrop-blur-md border border-white/60 rounded-xl px-4 py-2 shadow">
      <p className="text-[11px] text-gray-500">{label}</p>
      <p className="text-lg font-bold text-gray-900 leading-tight">{value}</p>
    </div>
  );
}
