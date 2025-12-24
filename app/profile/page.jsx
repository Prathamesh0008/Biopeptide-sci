//app\profile\page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("bio-user");
    if (!stored) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(stored));
  }, [router]);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch("/api/orders/my", {
          credentials: "include",
          cache: "no-store",
        });

        if (res.status === 401) {
          localStorage.removeItem("bio-user");
          router.push("/login");
          return;
        }

        const data = await res.json();
        setOrders(data.orders || []);
      } catch {
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user) loadOrders();
  }, [user, router]);

  const latestOrder = orders?.[0] || null;

  const stats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === "pending").length,
    delivered: orders.filter(o => o.status === "delivered").length,
  }), [orders]);

  const logout = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch {}
    localStorage.removeItem("bio-user");
    router.push("/");
  };

  if (!user) return null;
const hasUserInfo =
  user?.name ||
  user?.email ||
  user?.phone ||
  user?.role;

const hasAddress =
  latestOrder?.address &&
  Object.values(latestOrder.address).some(Boolean);

  return (
    <>
      <Navbar />

      <main className="min-h-[80vh] bg-gradient-to-br from-white via-[#eef8ff] to-[#e8fff2]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">

    {/* HEADER */}
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
      <div>
        <h1 className="text-4xl font-bold text-[#0d2d47]">
          My Account
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your profile, addresses, and orders
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4">
        <Stat label="Orders" value={stats.total} />
        <Stat label="Pending" value={stats.pending} />
        <Stat label="Delivered" value={stats.delivered} />
      </div>
    </div>

    <div className="grid lg:grid-cols-4 gap-8">

      {/* LEFT – PROFILE CARD */}
      <div className="lg:col-span-1 bg-gradient-to-br from-bioBlue to-bioGreen
  rounded-3xl shadow-xl p-6 text-white relative overflow-hidden">

  {/* glow */}
  <div className="absolute inset-0 bg-white/10 blur-2xl" />

  <div className="relative z-10 flex flex-col items-center text-center">
    <div className="w-24 h-24 rounded-full bg-white/20
      flex items-center justify-center text-3xl font-bold shadow-lg">
      {user.name?.[0]?.toUpperCase() || "U"}
    </div>

    <h2 className="mt-4 text-xl font-semibold">
      {user.name}
    </h2>
    <p className="text-sm opacity-90">{user.email}</p>

    <div className="mt-6 w-full space-y-3 text-sm">
      <ProfileRowDark label="Phone" value={user.phone || "—"} />
      <ProfileRowDark label="Role" value={user.role || "Customer"} />
      <ProfileRowDark
        label="Joined"
        value={new Date(user.createdAt || Date.now()).toLocaleDateString()}
      />
    </div>

    <button
      onClick={logout}
      className="mt-8 w-full py-3 rounded-full font-semibold
        bg-white text-bioBlue hover:bg-gray-100 transition"
    >
      Logout
    </button>
  </div>
</div>


      {/* RIGHT – CONTENT */}
      <div className="lg:col-span-3 space-y-8">
{/* USER INFORMATION */}
{hasUserInfo && (
  <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border p-6">
    <h3 className="text-xl font-semibold text-gray-900 mb-4">
      Account Information
    </h3>

    <div className="grid sm:grid-cols-2 gap-4 text-sm">
      {user.name && <InfoRow label="Full Name" value={user.name} />}
      {user.email && <InfoRow label="Email" value={user.email} />}
      {user.phone && <InfoRow label="Phone" value={user.phone} />}
      {user.role && <InfoRow label="Role" value={user.role} />}
      {user.createdAt && (
        <InfoRow
          label="Joined On"
          value={new Date(user.createdAt).toLocaleDateString()}
        />
      )}
    </div>
  </div>
)}

        {/* SHIPPING ADDRESS */}
{hasAddress && (
  <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border p-6">
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          Shipping Address
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Last used delivery address
        </p>
      </div>

      <button
        onClick={() => router.push("/checkout")}
        className="text-sm font-semibold text-bioBlue hover:underline"
      >
        Edit →
      </button>
    </div>

    <div className="mt-4 rounded-xl bg-gray-50 border p-4 text-sm text-gray-700 leading-relaxed">
      {Object.values(latestOrder.address).filter(Boolean).join(", ")}
    </div>
  </div>
)}


        {/* ORDERS */}
        <div className="bg-white/90 backdrop-blur rounded-2xl shadow-xl border p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-semibold text-gray-900">
              Order History
            </h3>

            <button
              onClick={() => router.push("/")}
              className="text-sm font-semibold text-bioBlue hover:underline"
            >
              Shop More →
            </button>
          </div>

          {loadingOrders ? (
            <p className="text-gray-500">Loading orders…</p>
          ) : orders.length === 0 ? (
            <div className="border border-dashed rounded-xl p-8 text-center">
              <p className="text-gray-600">No orders found</p>
              <button
                onClick={() => router.push("/")}
                className="mt-4 px-6 py-2 rounded-full text-white
                  bg-gradient-to-r from-bioBlue to-bioGreen"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map(order => (
                <div
                  key={order._id}
                  className="bg-gradient-to-br from-white to-[#f5fbff]
                  border rounded-2xl p-5 flex items-center justify-between
                  hover:shadow-lg transition"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      Order #{order._id.slice(-6)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      ${order.totals?.total?.toFixed(2)}
                    </p>
                    <span className="inline-block mt-2 text-xs px-3 py-1 rounded-full
                      bg-gray-100 text-gray-700 capitalize">
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


      <Footer />
    </>
  );
}

/* --------- SMALL UI PARTS --------- */

function ProfileRow({ label, value }) {
  return (
    <div className="flex justify-between py-2 border-b last:border-none">
      <span className="text-sm text-gray-500">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-md
      border-t-4 border-bioBlue text-center">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-[#0d2d47] mt-1">{value}</p>
    </div>
  );
}

function ProfileRowDark({ label, value }) {
  return (
    <div className="flex justify-between border-b border-white/20 pb-2">
      <span className="opacity-80">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="bg-gray-50 border rounded-xl p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900 mt-1">
        {value}
      </p>
    </div>
  );
}

