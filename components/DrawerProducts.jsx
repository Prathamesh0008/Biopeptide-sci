//components\DrawerProducts.jsx


"use client";

import {
  FaFilter,
  FaSearch,
  FaTimes,
  FaShoppingCart,
  FaPlus,
  FaMinus,
} from "react-icons/fa";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";

export default function DrawerProducts({ open, setOpen }) {
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState({});
  const { products } = useProducts();

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("bio-user") || "null")
      : null;

  const results = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return products;

    return products.filter((p) =>
      String(p.name || "")
        .toLowerCase()
        .includes(query)
    );
  }, [products, search]);

  if (!open) return null;

  const getProductId = (product) => product.id || product._id;

  const openProduct = (slug) => {
    setTimeout(() => {
      setOpen(false);
      router.push(`/product/${slug}`);
    }, 300);
  };

  const updateCartStorage = (product, qtyChange) => {
    if (!user) return;

    const productId = getProductId(product);
    const key = `bio-cart-${user.email}`;
    const cart = JSON.parse(localStorage.getItem(key) || "[]");

    const existing = cart.find((i) => i.id === productId);

    if (existing) {
      existing.qty += qtyChange;

      if (existing.qty <= 0) {
        cart.splice(cart.indexOf(existing), 1);
      }
    } else if (qtyChange > 0) {
      cart.push({
        id: productId,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.image,
        category: product.category,
        qty: qtyChange,
      });
    }

    localStorage.setItem(key, JSON.stringify(cart));
    window.dispatchEvent(new Event("bio-cart-updated"));
    window.dispatchEvent(new Event("bio-cart-count-updated"));
  };

  const addToCart = (product) => {
    if (!user) {
      setOpen(false);
      router.push("/login");
      return;
    }

    const productId = getProductId(product);

    setCartItems((prev) => ({
      ...prev,
      [productId]: 1,
    }));

    updateCartStorage(product, 1);
  };

  const increaseQty = (product) => {
    const productId = getProductId(product);

    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));

    updateCartStorage(product, 1);
  };

  const decreaseQty = (product) => {
    const productId = getProductId(product);

    setCartItems((prev) => {
      const next = { ...prev };

      if (next[productId] === 1) {
        delete next[productId];
      } else {
        next[productId] -= 1;
      }

      return next;
    });

    updateCartStorage(product, -1);
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40 z-[9990]"
        onClick={() => setOpen(false)}
      />

      {/* DRAWER */}
      <aside
        className={`
          fixed top-0 right-0 h-full
          w-[85%] sm:w-[350px]
          z-[99999]
          transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* BACKGROUND IMAGE */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg/dnaa.jpeg')",
          }}
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col h-full backdrop-blur-sm bg-white/70">
          {/* HEADER */}
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <div className="flex items-center gap-2">
              <FaFilter className="text-bioBlue" />
              <span className="font-semibold text-sm">Product List</span>
            </div>

            <button onClick={() => setOpen(false)} className="cursor-pointer">
              <FaTimes />
            </button>
          </div>

          {/* SEARCH */}
          <div className="p-4 border-b">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />

              <input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-md pl-8 pr-3 py-2 text-xs"
              />
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
            {results.map((p) => {
              const productId = getProductId(p);

              return (
                <div
                  key={productId}
                  className="rounded-md px-3 py-2 flex items-center justify-between"
                >
                  <div
                    onClick={() => openProduct(p.slug)}
                    className="cursor-pointer"
                  >
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-gray-500">{p.category}</p>
                  </div>

                  {!cartItems[productId] ? (
                    <button
                      onClick={() => addToCart(p)}
                      className="p-2 rounded-full bg-bioBlue text-white cursor-pointer"
                    >
                      <FaShoppingCart size={12} />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2 border rounded-md px-2 py-1">
                      <button
                        onClick={() => decreaseQty(p)}
                        className="cursor-pointer p-1"
                      >
                        <FaMinus size={10} />
                      </button>

                      <span className="font-semibold cursor-pointer">
                        {cartItems[productId]}
                      </span>

                      <button
                        onClick={() => increaseQty(p)}
                        className="cursor-pointer p-1"
                      >
                        <FaPlus size={10} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {!results.length && (
              <p className="text-gray-500 text-xs">No products found.</p>
            )}
          </div>

          {/* CHECKOUT */}
          <div className="p-4 border-t">
            <button
              disabled={!Object.keys(cartItems).length}
              onClick={() => router.push("/cart")}
              className="w-full cursor-pointer bg-bioBlue text-white py-3 rounded-md font-semibold disabled:opacity-50"
            >
              Checkout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}




















