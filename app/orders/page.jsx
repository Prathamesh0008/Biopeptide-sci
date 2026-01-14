//app\orders\page.jsx
"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";



export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const { translations } = useLanguage();

const t = (key) =>
  key.split(".").reduce(
    (obj, k) => obj?.[k],
    translations?.ordersPage || {}
  );


useEffect(() => {
  const stored = localStorage.getItem("bio-user");
  if (!stored) {
    router.push("/login");
  }
}, [router]);


useEffect(() => {
  let active = true;

  const loadOrders = async () => {
    try {
      const res = await fetch("/api/orders/my", {
        credentials: "include",
         cache: "no-store",
      });

      const data = await res.json();

      if (active && data.ok) {
        setOrders(data.orders);
        setLoading(false);
      }
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  };

  loadOrders(); // initial load

  const interval = setInterval(loadOrders, 20000); // 🔁 every 20 seconds

  return () => {
    active = false;
    clearInterval(interval);
  };
}, []);


 const groupItems = (items) => {
  const map = {};

  items.forEach((item) => {
    const key = `${item.name}-${item.strength}`;

    if (!map[key]) {
      map[key] = { ...item };
    } else {
      map[key].qty += item.qty;
    }
  });

  return Object.values(map);
};
  return (
    <>
      <Navbar />
      <Breadcrumbs/>

      <main className="min-h-[80vh] bg-gradient-to-br from-white via-[#eef8ff] to-[#e8fff2]">
  <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-6">
  <h1 className="text-3xl font-bold text-[#0d2d47]">
    {t("title")}
  </h1>
  <p className="text-gray-600 mt-2">
    {t("subtitle")}
  </p>
</div>


        {loading && (
          <p className="text-gray-500">{t("loading")}</p>
        )}

        {!loading && orders.length === 0 && (
          <div className="bg-white/90 backdrop-blur border
  rounded-3xl p-10 text-center shadow-lg">
            <p className="text-gray-500 text-lg">
              {t("empty")}
            </p>
          </div>
        )}

        <div className="space-y-5">
          {orders.map((order) => (
          <div
  key={order._id}
  className="
    bg-white
    rounded-3xl
    shadow-sm hover:shadow-md
    transition
    overflow-hidden
    border border-gray-100
  "
>



              {/* HEADER */}
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-3 bg-gray-50">

  <div>
    <p className="text-[11px] text-gray-400 uppercase tracking-wider">
      {t("orderId")}
    </p>
    <p className="font-semibold text-[#0d2d47] text-base">
      {order._id.slice(-6).toUpperCase()}
    </p>
    <p className="text-xs text-gray-400 mt-1">
      {new Date(order.createdAt).toLocaleDateString()} ·{" "}
      {new Date(order.createdAt).toLocaleTimeString()}
    </p>
  </div>

  <StatusBadge status={order.status} t={t} />

</div>


    {/* ITEMS */}
<div className="px-6 py-4 space-y-3">
  {groupItems(order.items).map((item) => (
    <div
      key={`${item.name}-${item.strength}`}
      className="flex justify-between text-sm"
    >
      <span className="text-gray-700">
        {item.name}
        <span className="text-gray-400"> × {item.qty}</span>
      </span>

      <span className="font-medium text-gray-900">
        ${(item.price * item.qty).toFixed(2)}
      </span>
    </div>
  ))}
</div>

{/* ORDER DETAILS */}
<div className="px-6 py-4 bg-white text-sm text-gray-700 space-y-4">

  {/* SHIPPING ADDRESS */}
  {order.address && (
    <div>
      <p className="font-semibold text-gray-900 mb-1">
        Shipping Address
      </p>
      <p className="text-gray-600 leading-relaxed">
       {order.address.fullName}<br />
{order.address.address}<br />
{order.address.city} {order.address.pincode}<br />
{order.address.country}<br />
Phone: {order.address.phone}

      </p>
    </div>
  )}

  {/* PAYMENT INFO */}
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <p className="font-semibold text-gray-900 mb-1">
        Payment Method
      </p>
      <p className="text-gray-600">
        {order.payment?.method || "N/A"}
      </p>
    </div>

    <div>
      <p className="font-semibold text-gray-900 mb-1">
        Payment Status
      </p>
      <p className="text-gray-600 capitalize">
        {order.payment?.status || "pending"}
      </p>
    </div>
  </div>

</div>


         {/* TOTAL BREAKDOWN */}
<div className="px-6 py-4 bg-gray-50 text-sm space-y-2">

  <div className="flex justify-between">
    <span className="text-gray-600">Subtotal</span>
    <span>${order.totals.subtotal.toFixed(2)}</span>
  </div>

  <div className="flex justify-between">
    <span className="text-gray-600">Shipping</span>
    <span>${order.totals.shipping.toFixed(2)}</span>
  </div>

  <div className="flex justify-between">
    <span className="text-gray-600">Tax</span>
    <span>${order.totals.tax.toFixed(2)}</span>
  </div>

  <div className="border-t pt-3 flex justify-between items-center">
    <span className="font-semibold text-gray-800">
      Order Total
    </span>
    <span className="text-xl font-bold text-[#0d2d47]">
      ${order.totals.total.toFixed(2)}
    </span>
  </div>

</div>

            </div>
          ))}
        </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ---------------- STATUS BADGE ---------------- */

function StatusBadge({ status, t }) {
const map = {
  pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  paid: "bg-blue-50 text-blue-700 border border-blue-200",
  shipped: "bg-purple-50 text-purple-700 border border-purple-200",
  delivered: "bg-green-50 text-green-700 border border-green-200",
  cancelled: "bg-red-50 text-red-700 border border-red-200",
};


  return (
    <span
      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {t?.(`status.${status}`) || status}
    </span>
  );
}























// //app\orders\page.jsx
// "use client";

// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Breadcrumbs from "../../components/Breadcrumbs";
// import { useRouter } from "next/navigation";
// import { useLanguage } from "@/contexts/LanguageContext";



// export default function OrdersPage() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const { translations } = useLanguage();

// const t = (key) =>
//   key.split(".").reduce(
//     (obj, k) => obj?.[k],
//     translations?.ordersPage || {}
//   );


// useEffect(() => {
//   const stored = localStorage.getItem("bio-user");
//   if (!stored) {
//     router.push("/login");
//   }
// }, [router]);


// useEffect(() => {
//   let active = true;

//   const loadOrders = async () => {
//     try {
//       const res = await fetch("/api/orders/my", {
//         credentials: "include",
//       });

//       const data = await res.json();

//       if (active && data.ok) {
//         setOrders(data.orders);
//         setLoading(false);
//       }
//     } catch (err) {
//       console.error("Failed to load orders", err);
//     }
//   };

//   loadOrders(); // initial load

//   const interval = setInterval(loadOrders, 20000); // 🔁 every 20 seconds

//   return () => {
//     active = false;
//     clearInterval(interval);
//   };
// }, []);


//  const groupItems = (items) => {
//   const map = {};

//   items.forEach((item) => {
//     const key = `${item.name}-${item.strength}`;

//     if (!map[key]) {
//       map[key] = { ...item };
//     } else {
//       map[key].qty += item.qty;
//     }
//   });

//   return Object.values(map);
// };
//   return (
//     <>
//       <Navbar />
//       <Breadcrumbs/>

//       <main className="min-h-[80vh] bg-gradient-to-br from-white via-[#eef8ff] to-[#e8fff2]">
//   <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
//         <div className="mb-6">
//   <h1 className="text-3xl font-bold text-[#0d2d47]">
//     {t("title")}
//   </h1>
//   <p className="text-gray-600 mt-2">
//     {t("subtitle")}
//   </p>
// </div>


//         {loading && (
//           <p className="text-gray-500">{t("loading")}</p>
//         )}

//         {!loading && orders.length === 0 && (
//           <div className="bg-white/90 backdrop-blur border
//   rounded-3xl p-10 text-center shadow-lg">
//             <p className="text-gray-500 text-lg">
//               {t("empty")}
//             </p>
//           </div>
//         )}

//         <div className="space-y-5">
//           {orders.map((order) => (
//           <div
//   key={order._id}
//   className="
//     bg-white
//     rounded-3xl
//     shadow-sm hover:shadow-md
//     transition
//     overflow-hidden
//     border border-gray-100
//   "
// >



//               {/* HEADER */}
//        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 py-3 bg-gray-50">

//   <div>
//     <p className="text-[11px] text-gray-400 uppercase tracking-wider">
//       {t("orderId")}
//     </p>
//     <p className="font-semibold text-[#0d2d47] text-base">
//       {order._id.slice(-6).toUpperCase()}
//     </p>
//     <p className="text-xs text-gray-400 mt-1">
//       {new Date(order.createdAt).toLocaleDateString()} ·{" "}
//       {new Date(order.createdAt).toLocaleTimeString()}
//     </p>
//   </div>

//   <StatusBadge status={order.status} t={t} />

// </div>


//     {/* ITEMS */}
// <div className="px-6 py-4 space-y-3">
//   {groupItems(order.items).map((item) => (
//     <div
//       key={`${item.name}-${item.strength}`}
//       className="flex justify-between text-sm"
//     >
//       <span className="text-gray-700">
//         {item.name}
//         <span className="text-gray-400"> × {item.qty}</span>
//       </span>

//       <span className="font-medium text-gray-900">
//         ${(item.price * item.qty).toFixed(2)}
//       </span>
//     </div>
//   ))}
// </div>

// {/* ORDER DETAILS */}
// <div className="px-6 py-4 bg-white text-sm text-gray-700 space-y-4">

//   {/* SHIPPING ADDRESS */}
//   {order.address && (
//     <div>
//       <p className="font-semibold text-gray-900 mb-1">
//         Shipping Address
//       </p>
//       <p className="text-gray-600 leading-relaxed">
//        {order.address.fullName}<br />
// {order.address.address}<br />
// {order.address.city} {order.address.pincode}<br />
// {order.address.country}<br />
// Phone: {order.address.phone}

//       </p>
//     </div>
//   )}

//   {/* PAYMENT INFO */}
//   <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//     <div>
//       <p className="font-semibold text-gray-900 mb-1">
//         Payment Method
//       </p>
//       <p className="text-gray-600">
//         {order.payment?.method || "N/A"}
//       </p>
//     </div>

//     <div>
//       <p className="font-semibold text-gray-900 mb-1">
//         Payment Status
//       </p>
//       <p className="text-gray-600 capitalize">
//         {order.payment?.status || "pending"}
//       </p>
//     </div>
//   </div>

// </div>


//          {/* TOTAL BREAKDOWN */}
// <div className="px-6 py-4 bg-gray-50 text-sm space-y-2">

//   <div className="flex justify-between">
//     <span className="text-gray-600">Subtotal</span>
//     <span>${order.totals.subtotal.toFixed(2)}</span>
//   </div>

//   <div className="flex justify-between">
//     <span className="text-gray-600">Shipping</span>
//     <span>${order.totals.shipping.toFixed(2)}</span>
//   </div>

//   <div className="flex justify-between">
//     <span className="text-gray-600">Tax</span>
//     <span>${order.totals.tax.toFixed(2)}</span>
//   </div>

//   <div className="border-t pt-3 flex justify-between items-center">
//     <span className="font-semibold text-gray-800">
//       Order Total
//     </span>
//     <span className="text-xl font-bold text-[#0d2d47]">
//       ${order.totals.total.toFixed(2)}
//     </span>
//   </div>

// </div>

//             </div>
//           ))}
//         </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }

// /* ---------------- STATUS BADGE ---------------- */

// function StatusBadge({ status, t }) {
// const map = {
//   pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
//   paid: "bg-blue-50 text-blue-700 border border-blue-200",
//   shipped: "bg-purple-50 text-purple-700 border border-purple-200",
//   delivered: "bg-green-50 text-green-700 border border-green-200",
//   cancelled: "bg-red-50 text-red-700 border border-red-200",
// };


//   return (
//     <span
//       className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium ${
//         map[status] || "bg-gray-100 text-gray-700"
//       }`}
//     >
//       {t?.(`status.${status}`) || status}
//     </span>
//   );
// }












