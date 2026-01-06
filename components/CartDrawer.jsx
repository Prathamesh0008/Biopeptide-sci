// peptides/components/CartDrawer.jsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const router = useRouter();

  

  /* 🔑 cart key */
  const getCartKey = () => {
    const user = JSON.parse(localStorage.getItem("bio-user") || "null");
    return user ? `bio-cart-${user.email}` : "guest-cart";
  };

  /* 🔄 load cart */
  const loadCart = () => {
    const key = getCartKey();
    setCart(JSON.parse(localStorage.getItem(key) || "[]"));
  };

  /* ➕➖ qty */
  const updateQty = (id, qty) => {
    const key = getCartKey();
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: Math.max(1, qty) } : item
    );
    setCart(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  /* ❌ remove */
  const removeItem = (id) => {
    const key = getCartKey();
    const updated = cart.filter((i) => i.id !== id);
    setCart(updated);
    localStorage.setItem(key, JSON.stringify(updated));
  };

  /* 🔔 open on add */
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

const FREE_SHIPPING_LIMIT = 200;

const subtotal = cart.reduce(
  (sum, i) => sum + i.price * i.qty,
  0
);

const progressPercent = Math.min(
  (subtotal / FREE_SHIPPING_LIMIT) * 100,
  100
);

const remaining = Math.max(
  FREE_SHIPPING_LIMIT - subtotal,
  0
);

const hasFreeShipping = subtotal >= FREE_SHIPPING_LIMIT;


  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/40 z-[998]"
        onClick={() => setOpen(false)}
      />

      {/* DRAWER */}
      <aside className="fixed z-[999] right-0 top-0 h-full w-full sm:w-[380px] bg-white shadow-2xl flex flex-col">
        {/* HEADER */}
        <div className="px-5 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-bold">
            View Cart{" "}
            <span className="text-gray-500 text-sm font-medium">
              ({cart.length} items)
            </span>
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="text-sm text-bioBlue font-semibold"
          >
            Continue shopping →
          </button>
        </div>

        {/* SUCCESS MESSAGE */}
        <div className="mx-5 mt-4 mb-2 p-3 rounded-md border border-bioGreen bg-bioGreen/10 text-bioGreen text-sm">
          Product added to your shopping cart.
        </div>

        {/* FREE SHIPPING BAR */}
<div className="px-5 mt-4">
  <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
    <div
      className="h-full bg-gradient-to-r from-bioBlue to-bioGreen transition-all duration-500"
      style={{ width: `${progressPercent}%` }}
    />
  </div>

  {hasFreeShipping ? (
    <p className="text-xs text-center mt-2 text-bioGreen font-semibold">
      ✓ FREE Shipping
    </p>
  ) : (
    <p className="text-xs text-center mt-2 text-gray-600">
      Add{" "}
      <span className="font-semibold text-bioBlue">
        ${remaining.toFixed(2)}
      </span>{" "}
      more to get{" "}
      <span className="font-semibold">FREE Shipping</span>
    </p>
  )}
</div>


        {/* ITEMS */}
        <div className="flex-1 overflow-y-auto px-5 py-6 space-y-6">
          {cart.map((item) => (
            <div key={item.id} className="flex gap-4">
              <Image
                src={item.image || "/images/product.png"}
                width={70}
                height={70}
                alt={item.name}
                className="object-contain border rounded-md"
              />

              <div className="flex-1">
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Ships today if ordered by <span className="text-bioBlue font-semibold">12 PM</span>
                </p>

                {/* QTY */}
                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    className="w-8 h-8 border rounded text-lg"
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    className="w-8 h-8 border rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="text-right">
                <p className="font-bold text-bioBlue">
                  ${(item.price * item.qty).toFixed(2)}
                </p>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-xs text-red-500 mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FOOTER */}
        <div className="border-t px-5 py-5">
          <div className="flex justify-between mb-4 text-lg font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={() => {
              setOpen(false);
              router.push("/checkout");
            }}
            className="w-full py-4 rounded-full text-white text-lg font-bold bg-gradient-to-r from-bioBlue to-bioGreen"
          >
            Checkout
          </button>
        </div>
      </aside>
    </>
  );
}
















// //peptides\components\CartDrawer.jsx
// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export default function CartDrawer() {
//   const [open, setOpen] = useState(false);
//   const [cart, setCart] = useState([]);
//   const router = useRouter();
 
//   /* 🔑 get cart key */
//   const getCartKey = () => {
//     const user = JSON.parse(localStorage.getItem("bio-user") || "null");
//     return user ? `bio-cart-${user.email}` : "guest-cart";
//   };

//   /* 🔄 load cart */
//   const loadCart = () => {
//     const key = getCartKey();
//     setCart(JSON.parse(localStorage.getItem(key) || "[]"));
//   };

//   /* ➕➖ update qty */
//   const updateQty = (id, qty) => {
//     const key = getCartKey();

//     const updated = cart.map((item) =>
//       item.id === id
//         ? { ...item, qty: Math.max(1, qty) }
//         : item
//     );

//     setCart(updated);
//     localStorage.setItem(key, JSON.stringify(updated));
//   };

//   /* ❌ remove item */
//   const removeItem = (id) => {
//     const key = getCartKey();
//     const updated = cart.filter((i) => i.id !== id);

//     setCart(updated);
//     localStorage.setItem(key, JSON.stringify(updated));
//   };

//   /* 🔔 open drawer when cart updates */
//   useEffect(() => {
//     const openDrawer = () => {
//       loadCart();
//       setOpen(true);
//     };

//     window.addEventListener("bio-cart-updated", openDrawer);
//     return () =>
//       window.removeEventListener("bio-cart-updated", openDrawer);
//   }, []);

//   if (!open) return null;

//   return (
//     <>
//       {/* OVERLAY */}
//       <div
//         className="fixed inset-0 bg-black/40 z-[998]"
//         onClick={() => setOpen(false)}
//       />

//       {/* DRAWER */}
//       <aside
//         className="
//           fixed z-[999] bg-white shadow-2xl flex flex-col
//           right-0 top-0 h-full
//           w-full sm:w-[360px]
//           sm:max-w-[360px]
//         "
//       >
//         {/* HEADER */}
//         <div className="p-4 border-b flex items-center justify-between">
//           <h2 className="font-semibold text-lg">Your Cart</h2>
//           <button
//             onClick={() => setOpen(false)}
//             className="text-xl font-bold"
//           >
//             ×
//           </button>
//         </div>

//         {/* ITEMS */}
//         <div className="flex-1 overflow-y-auto p-4 space-y-4">
//           {cart.length === 0 ? (
//             <p className="text-gray-500 text-sm">Cart is empty</p>
//           ) : (
//             cart.map((item) => (
//               <div
//                 key={item.id}
//                 className="flex gap-3 border-b pb-4"
//               >
//                 <Image
//                   src={item.image || "/images/product.png"}
//                   width={60}
//                   height={60}
//                   alt={item.name}
//                   className="object-contain bg-gray-50 rounded"
//                 />

//                 <div className="flex-1">
//                   <p className="text-sm font-semibold">
//                     {item.name}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {item.strength}
//                   </p>

//                   {/* QTY CONTROLS */}
//                   <div className="flex items-center gap-2 mt-2">
//                     <button
//                       onClick={() =>
//                         updateQty(item.id, item.qty - 1)
//                       }
//                       className="w-8 h-8 border rounded-full text-lg"
//                     >
//                       −
//                     </button>

//                     <span className="text-sm font-medium">
//                       {item.qty}
//                     </span>

//                     <button
//                       onClick={() =>
//                         updateQty(item.id, item.qty + 1)
//                       }
//                       className="w-8 h-8 border rounded-full text-lg"
//                     >
//                       +
//                     </button>

//                     <button
//                       onClick={() => removeItem(item.id)}
//                       className="ml-auto text-xs text-red-500"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         {/* FOOTER */}
//         <div className="p-4 border-t space-y-2">
//           <button
//             onClick={() => {
//               setOpen(false);
//               router.push("/cart");
//             }}
//             className="w-full py-3 rounded-full bg-bioBlue text-white"
//           >
//             View Full Cart
//           </button>

//           <button
//             onClick={() => setOpen(false)}
//             className="w-full py-2 text-sm text-gray-600"
//           >
//             Continue Shopping
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }
