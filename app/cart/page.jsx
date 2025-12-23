//peptides\app\cart\page.jsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const router = useRouter();

useEffect(() => {
  const user = localStorage.getItem("bio-user");
  if (!user) {
    localStorage.setItem("bio-after-login", "/cart");
    router.push("/login");
    return;
  }

  const saved = JSON.parse(localStorage.getItem("bio-cart") || "[]");
  setCart(saved);
}, []);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("bio-cart") || "[]");
    setCart(saved);
  }, []);

  const updateQty = (id, qty) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: Number(qty) } : item
    );
    setCart(updated);
    localStorage.setItem("bio-cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("bio-cart", JSON.stringify(updated));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT — CART LIST */}
        <div className="lg:col-span-2 space-y-6">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-lg">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-6 border rounded-2xl p-5 shadow-sm"
              >
                {/* IMAGE */}
                <div className="w-28 h-28 bg-gray-50 flex items-center justify-center rounded-xl overflow-hidden">
                  <Image
                    src={item.image || "/images/product.png"}
                    width={80}
                    height={80}
                    alt={item.name}
                    className="object-contain"
                  />
                </div>

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{item.strength}</p>

                  {/* QTY */}
                  <div className="flex items-center gap-3 mt-4">
                    <label className="text-sm text-gray-500">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={item.qty}
                      onChange={(e) => updateQty(item.id, e.target.value)}
                      className="w-20 border rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* PRICE & REMOVE */}
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-sm text-red-500 hover:underline mt-3"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT — SUMMARY BOX */}
        <div className="border rounded-2xl p-6 shadow-md h-fit">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between text-gray-700 text-sm mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between text-gray-700 text-sm mb-4">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-bold text-lg text-gray-900 mb-6">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

        <button
  onClick={() => {
  const cart = JSON.parse(localStorage.getItem("bio-cart") || "[]");
  if (!cart.length) {
    alert("Cart is empty");
    return;
  }

  const user = localStorage.getItem("bio-user");

  // ✅ If NOT logged in → go login
  if (!user) {
    localStorage.setItem("bio-after-login", "/checkout");
    window.location.href = "/login";
    return;
  }

  // ✅ If logged in → go checkout
  window.location.href = "/checkout";
}}

  className="
    w-full 
    py-3 
    font-semibold 
    rounded-full 
    text-white 
    bg-gradient-to-r from-bioBlue to-bioGreen 
    hover:opacity-90 
    transition
    text-sm
  "
>
  Proceed to Checkout
</button>
        </div>
      </div>
    </div>
  );
}
