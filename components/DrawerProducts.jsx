


//peptides\components\DrawerProducts.jsx
"use client";

import {
  FaFilter,
  FaSearch,
  FaTimes,
  FaShoppingCart,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import Image from "next/image";


import { PRODUCTS } from "@/data/products";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DrawerProducts({ open, setOpen }) {

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [loadingSlug, setLoadingSlug] = useState(null);
  const [cartItems, setCartItems] = useState({});
const user =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("bio-user"))
    : null;


  const results = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (!open) return null;

  // Loading animation element
  const LoaderBars = () => (
    <div className="flex gap-2">
      <div className="w-2 h-8 bg-bioBlue animate-pulse rounded"></div>
      <div className="w-2 h-8 bg-bioGreen animate-pulse rounded delay-150"></div>
      <div className="w-2 h-8 bg-bioBlue animate-pulse rounded delay-300"></div>
    </div>
  );

  const openProduct = (slug) => {
    setLoadingSlug(slug);     // start loader
    setTimeout(() => {
      setOpen(false);         // close drawer
      router.push(`/product/${slug}`); // go to page
    }, 500);
  };
const addToCart = (product) => {
  if (!user) {
    setOpen(false);
    router.push("/login");
    return;
  }

  setCartItems((prev) => ({
    ...prev,
    [product.id]: 1,
  }));

  updateCartStorage(product, 1);
};


const increaseQty = (id) => {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

  setCartItems((prev) => ({
    ...prev,
    [id]: prev[id] + 1,
  }));

  updateCartStorage(product, 1);
};


const decreaseQty = (id) => {
  const product = PRODUCTS.find((p) => p.id === id);
  if (!product) return;

  setCartItems((prev) => {
    const next = { ...prev };
    if (next[id] === 1) delete next[id];
    else next[id] -= 1;
    return next;
  });

  updateCartStorage(product, -1);
};


const updateCartStorage = (product, qtyChange) => {
  if (!user) return;

  const key = `bio-cart-${user.email}`;
  const cart = JSON.parse(localStorage.getItem(key) || "[]");

  const existing = cart.find((i) => i.id === product.id);

  if (existing) {
    existing.qty += qtyChange;
    if (existing.qty <= 0) {
      const index = cart.findIndex((i) => i.id === product.id);
      cart.splice(index, 1);
    }
  } else if (qtyChange > 0) {
    cart.push({ ...product, qty: qtyChange });
  }

  localStorage.setItem(key, JSON.stringify(cart));

  // ✅ notify NAVBAR ONLY
  window.dispatchEvent(new Event("bio-cart-count-updated"));
};


  return (
    <>
      {/* FULLSCREEN BACKDROP */}
<div
  className={`
    fixed inset-0 bg-black/40 z-[9990]
    transition-opacity duration-400 ease-out
    ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
  `}
  onClick={() => setOpen(false)}
/>

{/* FIXED SLIDING DRAWER */}
<aside
  className={`
    fixed top-0 right-0 h-full
    w-[85%] sm:w-[350px]
    bg-white shadow-2xl
    z-[99999]
    transform translate-z-0
    transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
    will-change-transform
    overflow-y-auto flex flex-col
    ${open ? "translate-x-0" : "translate-x-full"}
  `}
>


        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FaFilter className="text-bioBlue" />
            <span className="font-semibold text-gray-800 text-sm">Product List</span>
          </div>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800">
            <FaTimes />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
            <input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-xs"
            />
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">

          {results.map((p) => (
           <div
  key={p.id}
  className=" rounded-md px-3 py-2 flex items-center justify-between"
>
  {/* LEFT SIDE – PRODUCT INFO */}
  <div
    onClick={() => openProduct(p.slug)}
    className="cursor-pointer"
  >
    <p className="font-semibold text-gray-900">{p.name}</p>
    <p className="text-gray-500">{p.category}</p>
  </div>

  {/* RIGHT SIDE – CART CONTROLS */}
  {!cartItems[p.id] ? (
    <button
      onClick={() => addToCart(p)}
      className="p-2 rounded-full bg-bioBlue text-white"
    >
      <FaShoppingCart size={12} />
    </button>
  ) : (
    <div className="flex items-center gap-2 border rounded-md px-2 py-1">
      <button onClick={() => decreaseQty(p.id)}>
        <FaMinus size={10} />
      </button>
      <span className="text-xs font-semibold">
        {cartItems[p.id]}
      </span>
      <button onClick={() => increaseQty(p.id)}>
        <FaPlus size={10} />
      </button>
    </div>
  )}
</div>

          ))}

        </div>
{/* CHECKOUT BUTTON */}
<div className="p-4 border-t border-gray-200">
  <button
    onClick={() => {
      if (!user) {
        setOpen(false);
        router.push("/login");
        return;
      }

      const key = `bio-cart-${user.email}`;
      const existing = JSON.parse(localStorage.getItem(key) || "[]");
      const updated = [...existing];

      Object.entries(cartItems).forEach(([id, qty]) => {
        const product = PRODUCTS.find((p) => p.id === id);
        if (!product) return;

        const found = updated.find((i) => i.id === product.id);
        if (found) found.qty += qty;
        else updated.push({ ...product, qty });
      });

      localStorage.setItem(key, JSON.stringify(updated));
      window.dispatchEvent(new Event("bio-cart-updated"));

      setOpen(false);
      router.push("/cart");
    }}
    disabled={Object.keys(cartItems).length === 0}
    className="w-full bg-bioBlue text-white py-3 rounded-md font-semibold disabled:opacity-50"
  >
    Checkout
  </button>
</div>

      </aside>
    </>
  );
}























// //peptides\components\DrawerProducts.jsx
// "use client";

// import {
//   FaFilter,
//   FaSearch,
//   FaTimes,
//   FaShoppingCart,
//   FaPlus,
//   FaMinus,
// } from "react-icons/fa";

// import { PRODUCTS } from "@/data/products";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function DrawerProducts({ open, setOpen }) {

//   const router = useRouter();
//   const [search, setSearch] = useState("");
//   const [loadingSlug, setLoadingSlug] = useState(null);
//   const [cartItems, setCartItems] = useState({});
// const user =
//   typeof window !== "undefined"
//     ? JSON.parse(localStorage.getItem("bio-user"))
//     : null;


//   const results = PRODUCTS.filter((p) =>
//     p.name.toLowerCase().includes(search.toLowerCase())
//   );

//   if (!open) return null;

//   // Loading animation element
//   const LoaderBars = () => (
//     <div className="flex gap-2">
//       <div className="w-2 h-8 bg-bioBlue animate-pulse rounded"></div>
//       <div className="w-2 h-8 bg-bioGreen animate-pulse rounded delay-150"></div>
//       <div className="w-2 h-8 bg-bioBlue animate-pulse rounded delay-300"></div>
//     </div>
//   );

//   const openProduct = (slug) => {
//     setLoadingSlug(slug);     // start loader
//     setTimeout(() => {
//       setOpen(false);         // close drawer
//       router.push(`/product/${slug}`); // go to page
//     }, 500);
//   };
// const addToCart = (product) => {
//   if (!user) {
//     setOpen(false);
//     router.push("/login");
//     return;
//   }

//   setCartItems((prev) => ({
//     ...prev,
//     [product.id]: 1,
//   }));

//   updateCartStorage(product, 1);
// };


// const increaseQty = (id) => {
//   const product = PRODUCTS.find((p) => p.id === id);
//   if (!product) return;

//   setCartItems((prev) => ({
//     ...prev,
//     [id]: prev[id] + 1,
//   }));

//   updateCartStorage(product, 1);
// };


// const decreaseQty = (id) => {
//   const product = PRODUCTS.find((p) => p.id === id);
//   if (!product) return;

//   setCartItems((prev) => {
//     const next = { ...prev };
//     if (next[id] === 1) delete next[id];
//     else next[id] -= 1;
//     return next;
//   });

//   updateCartStorage(product, -1);
// };


// const updateCartStorage = (product, qtyChange) => {
//   if (!user) return;

//   const key = `bio-cart-${user.email}`;
//   const cart = JSON.parse(localStorage.getItem(key) || "[]");

//   const existing = cart.find((i) => i.id === product.id);

//   if (existing) {
//     existing.qty += qtyChange;
//     if (existing.qty <= 0) {
//       const index = cart.findIndex((i) => i.id === product.id);
//       cart.splice(index, 1);
//     }
//   } else if (qtyChange > 0) {
//     cart.push({ ...product, qty: qtyChange });
//   }

//   localStorage.setItem(key, JSON.stringify(cart));

//   // ✅ notify NAVBAR ONLY
//   window.dispatchEvent(new Event("bio-cart-count-updated"));
// };


//   return (
//     <>
//       {/* FULLSCREEN BACKDROP */}
// <div
//   className={`
//     fixed inset-0 bg-black/40 z-[9990]
//     transition-opacity duration-400 ease-out
//     ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
//   `}
//   onClick={() => setOpen(false)}
// />

// {/* FIXED SLIDING DRAWER */}
// <aside
//   className={`
//     fixed top-0 right-0 h-full
//     w-[85%] sm:w-[350px]
//     bg-white shadow-2xl
//     z-[99999]
//     transform translate-z-0
//     transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
//     will-change-transform
//     overflow-y-auto flex flex-col
//     ${open ? "translate-x-0" : "translate-x-full"}
//   `}
// >


//         {/* Header */}
//         <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
//           <div className="flex items-center gap-2">
//             <FaFilter className="text-bioBlue" />
//             <span className="font-semibold text-gray-800 text-sm">Product List</span>
//           </div>
//           <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-800">
//             <FaTimes />
//           </button>
//         </div>

//         {/* Search */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="relative">
//             <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
//             <input
//               placeholder="Search products..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full border border-gray-300 rounded-md pl-8 pr-3 py-2 text-xs"
//             />
//           </div>
//         </div>

//         {/* Product List */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">

//           {results.map((p) => (
//            <div
//   key={p.id}
//   className=" rounded-md px-3 py-2 flex items-center justify-between"
// >
//   {/* LEFT SIDE – PRODUCT INFO */}
//   <div
//     onClick={() => openProduct(p.slug)}
//     className="cursor-pointer"
//   >
//     <p className="font-semibold text-gray-900">{p.name}</p>
//     <p className="text-gray-500">{p.category}</p>
//   </div>

//   {/* RIGHT SIDE – CART CONTROLS */}
//   {!cartItems[p.id] ? (
//     <button
//       onClick={() => addToCart(p)}
//       className="p-2 rounded-full bg-bioBlue text-white"
//     >
//       <FaShoppingCart size={12} />
//     </button>
//   ) : (
//     <div className="flex items-center gap-2 border rounded-md px-2 py-1">
//       <button onClick={() => decreaseQty(p.id)}>
//         <FaMinus size={10} />
//       </button>
//       <span className="text-xs font-semibold">
//         {cartItems[p.id]}
//       </span>
//       <button onClick={() => increaseQty(p.id)}>
//         <FaPlus size={10} />
//       </button>
//     </div>
//   )}
// </div>

//           ))}

//         </div>
// {/* CHECKOUT BUTTON */}
// <div className="p-4 border-t border-gray-200">
//   <button
//     onClick={() => {
//       if (!user) {
//         setOpen(false);
//         router.push("/login");
//         return;
//       }

//       const key = `bio-cart-${user.email}`;
//       const existing = JSON.parse(localStorage.getItem(key) || "[]");
//       const updated = [...existing];

//       Object.entries(cartItems).forEach(([id, qty]) => {
//         const product = PRODUCTS.find((p) => p.id === id);
//         if (!product) return;

//         const found = updated.find((i) => i.id === product.id);
//         if (found) found.qty += qty;
//         else updated.push({ ...product, qty });
//       });

//       localStorage.setItem(key, JSON.stringify(updated));
//       window.dispatchEvent(new Event("bio-cart-updated"));

//       setOpen(false);
//       router.push("/cart");
//     }}
//     disabled={Object.keys(cartItems).length === 0}
//     className="w-full bg-bioBlue text-white py-3 rounded-md font-semibold disabled:opacity-50"
//   >
//     Checkout
//   </button>
// </div>

//       </aside>
//     </>
//   );
// }




















