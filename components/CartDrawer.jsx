//peptides\components\CartDrawer.jsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const router = useRouter();
 
  /* 🔑 get cart key */
  const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem("bio-user") || "null");
    return user ? `bio-cart-${user.email}` : "guest-cart";
  };

  /* 🔄 load cart */
  const loadCart = () => {
    const key = getCartKey();
    setCart(JSON.parse(localStorage.getItem(key) || "[]"));
  };

  /* ➕➖ update qty */
  const updateQty = (id, qty) => {
    const key = getCartKey();

    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, qty: Math.max(1, qty) }
        : item
    );

    setCart(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  /* ❌ remove item */
  const removeItem = (id) => {
    const key = getCartKey();
    const updated = cart.filter((i) => i.id !== id);

    setCart(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  /* 🔔 open drawer when cart updates */
  useEffect(() => {
    const openDrawer = () => {
      loadCart();
      setOpen(true);
    };

    window.addEventListener("bio-cart-updated", openDrawer);
    return () =>
      window.removeEventListener("bio-cart-updated", openDrawer);
  }, []);

  if (!open) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/40 z-[998]"
        onClick={() => setOpen(false)}
      />

      {/* DRAWER */}
      <aside
        className="
          fixed z-[999] bg-white shadow-2xl flex flex-col
          right-0 top-0 h-full
          w-full sm:w-[360px]
          sm:max-w-[360px]
        "
      >
        {/* HEADER */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-lg">Your Cart</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-sm">Cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-3 border-b pb-4"
              >
                <Image
                  src={item.image || "/images/product.png"}
                  width={60}
                  height={60}
                  alt={item.name}
                  className="object-contain bg-gray-50 rounded"
                />

                <div className="flex-1">
                  <p className="text-sm font-semibold">
                    {item.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.strength}
                  </p>

                  {/* QTY CONTROLS */}
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        updateQty(item.id, item.qty - 1)
                      }
                      className="w-8 h-8 border rounded-full text-lg"
                    >
                      −
                    </button>

                    <span className="text-sm font-medium">
                      {item.qty}
                    </span>

                    <button
                      onClick={() =>
                        updateQty(item.id, item.qty + 1)
                      }
                      className="w-8 h-8 border rounded-full text-lg"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-xs text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-4 border-t space-y-2">
          <button
            onClick={() => {
              setOpen(false);
              router.push("/cart");
            }}
            className="w-full py-3 rounded-full bg-bioBlue text-white"
          >
            View Full Cart
          </button>

          <button
            onClick={() => setOpen(false)}
            className="w-full py-2 text-sm text-gray-600"
          >
            Continue Shopping
          </button>
        </div>
      </aside>
    </>
  );
}
