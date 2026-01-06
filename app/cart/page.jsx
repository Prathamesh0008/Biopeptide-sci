// peptides/app/cart/page.jsx
"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useLanguage } from "@/contexts/LanguageContext";
import DrawerProducts from "@/components/DrawerProducts";

/* ✅ cart key per user */
const getCartKey = (user) => {
  if (!user) return "guest-cart";
  return `bio-cart-${user.email}`;
};

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const { translations } = useLanguage();

  const t = (key) =>
    key.split(".").reduce(
      (obj, k) => obj?.[k],
      translations?.cartPage || {}
    );

  /* ✅ load cart for logged-in user */
  useEffect(() => {
    const storedUser = localStorage.getItem("bio-user");

    if (!storedUser) {
      localStorage.setItem("bio-after-login", "/cart");
      router.push("/login");
      return;
    }

    const user = JSON.parse(storedUser);
    const cartKey = getCartKey(user);

    const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
    setCart(savedCart);
  }, [router]);

  /* ✅ update quantity */
  const updateQty = (id, qty) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, qty: Number(qty) } : item
    );

    setCart(updated);

    const user = JSON.parse(localStorage.getItem("bio-user"));
    const cartKey = getCartKey(user);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

  /* ✅ remove item */
  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);

    const user = JSON.parse(localStorage.getItem("bio-user"));
    const cartKey = getCartKey(user);
    localStorage.setItem(cartKey, JSON.stringify(updated));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <>
      <Navbar />
      <Breadcrumbs />

      {/* DRAWER BUTTON */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="
          fixed right-0 top-1/2 -translate-y-1/2 z-50
          flex items-center justify-center
          bg-gradient-to-b from-bioBlue to-bioGreen
          text-white shadow-lg
          cursor-pointer
          h-36 w-10 rounded-l-xl
        "
      >
        <span
          className="
            text-xs font-semibold tracking-widest
            [writing-mode:vertical-rl]
          "
        >
          Product List
        </span>
      </button>

      {/* DRAWER (PAGE LEVEL ONLY) */}
      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      <main className="min-h-screen bg-white pt-[120px] pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t("title")}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* LEFT */}
            <div className="lg:col-span-2 space-y-6">
              {cart.length === 0 ? (
                <p className="text-gray-500 text-lg">{t("empty")}</p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border rounded-2xl p-5 shadow-sm"
                  >
                    <div className="w-28 h-28 bg-gray-50 rounded-xl flex items-center justify-center">
                      <Image
                        src={item.image || "/images/product.png"}
                        width={80}
                        height={80}
                        alt={item.name}
                        className="object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.strength}</p>

                      <div className="flex items-center gap-3 mt-4">
                        <span className="text-sm text-gray-600">
                          {t("qty")}
                        </span>

                        <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
                          {/* MINUS */}
                          <button
                            onClick={() =>
                              updateQty(item.id, Math.max(1, item.qty - 1))
                            }
                            className="w-9 h-9 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition"
                          >
                            −
                          </button>

                          {/* VALUE */}
                          <input
                            type="text"
                            value={item.qty}
                            onChange={(e) =>
                              updateQty(
                                item.id,
                                e.target.value.replace(/\D/g, "") || 1
                              )
                            }
                            className="w-12 text-center text-sm outline-none bg-white"
                          />

                          {/* PLUS */}
                          <button
                            onClick={() =>
                              updateQty(item.id, item.qty + 1)
                            }
                            className="w-9 h-9 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="sm:text-right flex sm:block items-center justify-between mt-4 sm:mt-0">
                      <p className="text-lg font-bold">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-red-500 hover:underline mt-3"
                      >
                        {t("remove")}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* RIGHT */}
            <div className="border rounded-2xl p-6 shadow-md h-fit">
              <h3 className="text-xl font-semibold mb-4">
                {t("summary")}
              </h3>

              <div className="flex justify-between text-sm mb-2">
                <span>{t("subtotal")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm mb-4">
                <span>{t("shipping")}</span>
                <span>{t("shippingNote")}</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between font-bold text-lg mb-6">
                <span>{t("total")}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <button
                onClick={() => {
                  if (!cart.length) return alert("Cart is empty");
                  router.push("/checkout");
                }}
                className="w-full py-3 rounded-full text-white bg-gradient-to-r from-bioBlue to-bioGreen"
              >
                {t("checkout")}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}






// //app\cart\page.jsx
// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import { useLanguage } from "@/contexts/LanguageContext";


// /* ✅ cart key per user */
// const getCartKey = (user) => {
//   if (!user) return "guest-cart";
//   return `bio-cart-${user.email}`;
// };

// export default function CartPage() {
//   const [cart, setCart] = useState([]);
//   const router = useRouter();

//   const { translations } = useLanguage();

// const t = (key) =>
//   key.split(".").reduce(
//     (obj, k) => obj?.[k],
//     translations?.cartPage || {}
//   );


//   /* ✅ load cart for logged-in user */
//   useEffect(() => {
//     const storedUser = localStorage.getItem("bio-user");

//     if (!storedUser) {
//       localStorage.setItem("bio-after-login", "/cart");
//       router.push("/login");
//       return;
//     }

//     const user = JSON.parse(storedUser);
//     const cartKey = getCartKey(user);

//     const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
//     setCart(savedCart);
//   }, [router]);

//   /* ✅ update quantity */
//   const updateQty = (id, qty) => {
//     const updated = cart.map((item) =>
//       item.id === id ? { ...item, qty: Number(qty) } : item
//     );

//     setCart(updated);

//     const user = JSON.parse(localStorage.getItem("bio-user"));
//     const cartKey = getCartKey(user);

//     localStorage.setItem(cartKey, JSON.stringify(updated));
//   };

//   /* ✅ remove item */
//   const removeItem = (id) => {
//     const updated = cart.filter((item) => item.id !== id);
//     setCart(updated);

//     const user = JSON.parse(localStorage.getItem("bio-user"));
//     const cartKey = getCartKey(user);

//     localStorage.setItem(cartKey, JSON.stringify(updated));
//   };

//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   return (
//     <>
//       <Navbar />
//       <Breadcrumbs/>

//       <main className="min-h-screen bg-white pt-[120px] pb-12">
//         <div className="max-w-7xl mx-auto px-6">
//           <h1 className="text-3xl font-bold text-gray-900 mb-8">
//             {t("title")}
//           </h1>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//             {/* LEFT */}
//             <div className="lg:col-span-2 space-y-6">
//               {cart.length === 0 ? (
//                 <p className="text-gray-500 text-lg">{t("empty")}</p>
//               ) : (
//                 cart.map((item) => (
//                   <div
//                     key={item.id}
//                      className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 border rounded-2xl p-5 shadow-sm"
//                   >
//                     <div className="w-28 h-28 bg-gray-50 rounded-xl flex items-center justify-center">
//                       <Image
//                         src={item.image || "/images/product.png"}
//                         width={80}
//                         height={80}
//                         alt={item.name}
//                         className="object-contain"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold">{item.name}</h3>
//                       <p className="text-sm text-gray-500">{item.strength}</p>

//                       <div className="flex items-center gap-3 mt-4">
//   <span className="text-sm text-gray-600">{t("qty")}</span>

//   <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
//     {/* MINUS */}
//     <button
//       onClick={() =>
//         updateQty(item.id, Math.max(1, item.qty - 1))
//       }
//       className="w-9 h-9 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition"
//     >
//       −
//     </button>

//     {/* VALUE */}
//     <input
//       type="text"
//       value={item.qty}
//       onChange={(e) =>
//         updateQty(item.id, e.target.value.replace(/\D/g, "") || 1)
//       }
//       className="w-12 text-center text-sm outline-none bg-white"
//     />

//     {/* PLUS */}
//     <button
//       onClick={() =>
//         updateQty(item.id, item.qty + 1)
//       }
//       className="w-9 h-9 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition"
//     >
//       +
//     </button>
//   </div>
// </div>

//                     </div>

//                   <div className="sm:text-right flex sm:block items-center justify-between mt-4 sm:mt-0">
//                       <p className="text-lg font-bold">
//                         ${(item.price * item.qty).toFixed(2)}
//                       </p>
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="text-sm text-red-500 hover:underline mt-3"
//                       >
//                         {t("remove")}
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* RIGHT */}
//             <div className="border rounded-2xl p-6 shadow-md h-fit">
//               <h3 className="text-xl font-semibold mb-4">{t("summary")}</h3>

//               <div className="flex justify-between text-sm mb-2">
//                 <span>{t("subtotal")}</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between text-sm mb-4">
//                 <span>{t("shipping")}</span>
//                 <span>{t("shippingNote")}</span>
//               </div>

//               <hr className="my-4" />

//               <div className="flex justify-between font-bold text-lg mb-6">
//                 <span>{t("total")}</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>

//               <button
//                 onClick={() => {
//                   if (!cart.length) return alert("Cart is empty");
//                   router.push("/checkout");
//                 }}
//                 className="w-full py-3 rounded-full text-white bg-gradient-to-r from-bioBlue to-bioGreen"
//               >
//                 {t("checkout")}
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }










// //app\cart\page.jsx
// "use client";

// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";

// /* ✅ cart key per user */
// const getCartKey = (user) => {
//   if (!user) return "guest-cart";
//   return `bio-cart-${user.email}`;
// };

// export default function CartPage() {
//   const [cart, setCart] = useState([]);
//   const router = useRouter();

//   /* ✅ load cart for logged-in user */
//   useEffect(() => {
//     const storedUser = localStorage.getItem("bio-user");

//     if (!storedUser) {
//       localStorage.setItem("bio-after-login", "/cart");
//       router.push("/login");
//       return;
//     }

//     const user = JSON.parse(storedUser);
//     const cartKey = getCartKey(user);

//     const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
//     setCart(savedCart);
//   }, [router]);

//   /* ✅ update quantity */
//   const updateQty = (id, qty) => {
//     const updated = cart.map((item) =>
//       item.id === id ? { ...item, qty: Number(qty) } : item
//     );

//     setCart(updated);

//     const user = JSON.parse(localStorage.getItem("bio-user"));
//     const cartKey = getCartKey(user);

//     localStorage.setItem(cartKey, JSON.stringify(updated));
//   };

//   /* ✅ remove item */
//   const removeItem = (id) => {
//     const updated = cart.filter((item) => item.id !== id);
//     setCart(updated);

//     const user = JSON.parse(localStorage.getItem("bio-user"));
//     const cartKey = getCartKey(user);

//     localStorage.setItem(cartKey, JSON.stringify(updated));
//   };

//   const subtotal = cart.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   return (
//     <>
//       <Navbar />
//       <Breadcrumbs/>

//       <main className="min-h-screen bg-white pt-[120px] pb-12">
//         <div className="max-w-7xl mx-auto px-6">
//           <h1 className="text-3xl font-bold text-gray-900 mb-8">
//             Shopping Cart
//           </h1>

//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//             {/* LEFT */}
//             <div className="lg:col-span-2 space-y-6">
//               {cart.length === 0 ? (
//                 <p className="text-gray-500 text-lg">Your cart is empty.</p>
//               ) : (
//                 cart.map((item) => (
//                   <div
//                     key={item.id}
//                     className="flex items-center gap-6 border rounded-2xl p-5 shadow-sm"
//                   >
//                     <div className="w-28 h-28 bg-gray-50 rounded-xl flex items-center justify-center">
//                       <Image
//                         src={item.image || "/images/product.png"}
//                         width={80}
//                         height={80}
//                         alt={item.name}
//                         className="object-contain"
//                       />
//                     </div>

//                     <div className="flex-1">
//                       <h3 className="text-lg font-semibold">{item.name}</h3>
//                       <p className="text-sm text-gray-500">{item.strength}</p>

//                       <div className="flex items-center gap-3 mt-4">
//   <span className="text-sm text-gray-600">Qty</span>

//   <div className="flex items-center border rounded-full overflow-hidden shadow-sm">
//     {/* MINUS */}
//     <button
//       onClick={() =>
//         updateQty(item.id, Math.max(1, item.qty - 1))
//       }
//       className="w-9 h-9 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition"
//     >
//       −
//     </button>

//     {/* VALUE */}
//     <input
//       type="text"
//       value={item.qty}
//       onChange={(e) =>
//         updateQty(item.id, e.target.value.replace(/\D/g, "") || 1)
//       }
//       className="w-12 text-center text-sm outline-none bg-white"
//     />

//     {/* PLUS */}
//     <button
//       onClick={() =>
//         updateQty(item.id, item.qty + 1)
//       }
//       className="w-9 h-9 flex items-center justify-center text-lg font-medium text-gray-700 hover:bg-gray-100 transition"
//     >
//       +
//     </button>
//   </div>
// </div>

//                     </div>

//                     <div className="text-right">
//                       <p className="text-lg font-bold">
//                         ${(item.price * item.qty).toFixed(2)}
//                       </p>
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="text-sm text-red-500 hover:underline mt-3"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                 ))
//               )}
//             </div>

//             {/* RIGHT */}
//             <div className="border rounded-2xl p-6 shadow-md h-fit">
//               <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

//               <div className="flex justify-between text-sm mb-2">
//                 <span>Subtotal</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>

//               <div className="flex justify-between text-sm mb-4">
//                 <span>Shipping</span>
//                 <span>Calculated at checkout</span>
//               </div>

//               <hr className="my-4" />

//               <div className="flex justify-between font-bold text-lg mb-6">
//                 <span>Total</span>
//                 <span>${subtotal.toFixed(2)}</span>
//               </div>

//               <button
//                 onClick={() => {
//                   if (!cart.length) return alert("Cart is empty");
//                   router.push("/checkout");
//                 }}
//                 className="w-full py-3 rounded-full text-white bg-gradient-to-r from-bioBlue to-bioGreen"
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }
