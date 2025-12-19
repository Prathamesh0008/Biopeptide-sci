//app\checkout\page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    country: "India",
  });

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("bio-cart") || "[]");
    if (savedCart.length === 0) {
      router.push("/cart");
      return;
    }
    setCart(savedCart);

    const storedUser = localStorage.getItem("bio-user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    const u = JSON.parse(storedUser);
    setUser(u);
    setForm((f) => ({ ...f, fullName: u.name || "" }));
  }, [router]);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!form.fullName || !form.phone || !form.address) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user._id,
          userName: user.name,
          userEmail: user.email,
          phone: form.phone,
          address: form,
          items: cart,
          totals: {
            subtotal,
            shipping: 0,
            tax: 0,
            total: subtotal,
          },
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        alert("Order failed");
        setLoading(false);
        return;
      }

      localStorage.removeItem("bio-cart");
      router.push(`/order-success?orderId=${data.orderId}`);
    } catch (err) {
      alert("Order failed");
      setLoading(false);
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT — FORM */}
        <div className="md:col-span-2 space-y-4">
          <input
            placeholder="Full Name"
            className="border p-3 rounded w-full"
            value={form.fullName}
            onChange={(e) =>
              setForm({ ...form, fullName: e.target.value })
            }
          />

          <input
            className="border p-3 rounded w-full bg-gray-100"
            value={user?.email || ""}
            disabled
          />

          <input
            placeholder="Phone"
            className="border p-3 rounded w-full"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
          />

          <textarea
            placeholder="Full Address"
            className="border p-3 rounded w-full"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              placeholder="City"
              className="border p-3 rounded"
              value={form.city}
              onChange={(e) =>
                setForm({ ...form, city: e.target.value })
              }
            />
            <input
              placeholder="Pincode"
              className="border p-3 rounded"
              value={form.pincode}
              onChange={(e) =>
                setForm({ ...form, pincode: e.target.value })
              }
            />
          </div>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="border rounded-xl p-6 bg-white shadow-sm h-fit">
          <h3 className="font-semibold mb-4">Order Summary</h3>

          <div className="space-y-2 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} × {item.qty}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            disabled={loading}
            onClick={placeOrder}
            className="mt-6 w-full py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-bioBlue to-bioGreen
              disabled:opacity-50"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </main>
  );
}
