//app\payment\page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaCreditCard,FaUniversity,FaShieldAlt,} from "react-icons/fa";
import { useLanguage } from "@/contexts/LanguageContext";



export default function PaymentPage() {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [method, setMethod] = useState("card");
  const { translations } = useLanguage();
const t = (path) =>
  path.split(".").reduce(
    (obj, key) => obj?.[key],
    translations?.payment || {}
  );

useEffect(() => {
  fetch("/api/auth/me", { credentials: "include" })
    .then(res => {
      if (!res.ok) router.push("/login");
    });
}, []);

  useEffect(() => {
    const saved = localStorage.getItem("bio-checkout");
    if (!saved) {
      router.push("/checkout");
      return;
    }
    setData(JSON.parse(saved));
  }, [router]);

  if (!data) return null;
  console.log("LANG:", translations?.payment);


  return (
    <>
    
   <main
  className="
    min-h-screen
    w-full
    bg-gradient-to-br from-white via-[#f2fbff] to-[#ecfff6]
    flex items-center justify-center
    px-4 sm:px-6
  "
>
<div className="w-full max-w-5xl py-14">
      <h1 className="text-3xl font-bold text-[#0d2d47] mb-10">
       {t("title")}
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {/* LEFT – PAYMENT METHODS */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-6">
            {t("chooseMethod")}
          </h2>

          <div className="space-y-4">

            {/* CARD */}
<PaymentOption
  active={method === "card"}
  onClick={() => setMethod("card")}
  title={t("methods.card.title")}
  desc={t("methods.card.desc")}
  icon={<FaCreditCard />}
/>

  {/* UPI */}
 <PaymentOption
  active={method === "upi"}
  onClick={() => setMethod("upi")}
  title={t("methods.upi.title") || "UPI"}
  desc={t("methods.upi.desc") || ""}
  icon={<FaUniversity />}
/>


            
          </div>
        </div>

        {/* RIGHT – ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="font-semibold mb-4">
            {t("summary")}
          </h3>

          <div className="space-y-2 text-sm">
            {data.cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>{t("total")}</span>
            <span>${data.subtotal.toFixed(2)}</span>
          </div>
<button
  onClick={async () => {
    const saved = JSON.parse(localStorage.getItem("bio-checkout"));
    if (!saved) return;

    // 1️⃣ Save payment method
    const updated = {
      ...saved,
      paymentMethod: method,
    };

    localStorage.setItem("bio-checkout", JSON.stringify(updated));

    // 2️⃣ CREATE ORDER IN MONGODB (THIS WAS MISSING)
    const res = await fetch("/api/orders", {
      method: "POST",
      credentials: "include", // 🔴 REQUIRED
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        checkoutId: updated.checkoutId,
        items: updated.cart,
        totals: {
          subtotal: updated.subtotal,
          shipping: 0,
          tax: 0,
          total: updated.subtotal,
        },
        address: updated.form,
        userEmail: updated.user?.email,
        userName: updated.user?.name,
        phone: updated.user?.phone,
      }),
    });

    const data = await res.json();

    if (!data.ok) {
      alert("Order creation failed");
      return;
    }

    // 3️⃣ Redirect with orderId
    router.push(`/order-success?orderId=${data.orderId}`);
  }}
  className="
    mt-6 w-full py-3 rounded-full
    font-semibold text-white
    bg-gradient-to-r from-bioBlue to-bioGreen
    shadow-lg hover:shadow-xl
    transition
  "
>
  {t("paySecurely")}
</button>




          <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-1">
  <FaShieldAlt className="text-bioBlue" />
  {t("secureNote")}
</p>

        </div>
      </div>
      </div>
    </main>
    
    </>
  );
}

/* ---------------- PAYMENT OPTION CARD ---------------- */

function PaymentOption({ active, onClick, title, desc, icon }) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center justify-between
        border rounded-xl px-6 py-4 text-left
        transition-all duration-200
        ${active
          ? "border-bioBlue bg-bioBlue/10 shadow-md"
          : "border-gray-200 hover:border-bioBlue hover:bg-gray-50"}
      `}
    >
      <div className="flex items-center gap-4">
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center
            text-xl
            ${active
              ? "bg-bioBlue text-white"
              : "bg-gray-100 text-gray-600"}
          `}
        >
          {icon}
        </div>

        <div>
          <p className="font-semibold text-gray-900">
            {title}
          </p>
          <p className="text-sm text-gray-500">
            {desc}
          </p>
        </div>
      </div>

      <div
        className={`
          w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${active ? "border-bioBlue" : "border-gray-300"}
        `}
      >
        {active && (
          <div className="w-2.5 h-2.5 bg-bioBlue rounded-full" />
        )}
      </div>
    </button>
  );
}












// //app\payment\page.jsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { FaCreditCard,FaUniversity,FaShieldAlt,} from "react-icons/fa";


// export default function PaymentPage() {
//   const router = useRouter();
//   const [data, setData] = useState(null);
//   const [method, setMethod] = useState("card");

//   useEffect(() => {
//     const saved = localStorage.getItem("bio-checkout");
//     if (!saved) {
//       router.push("/checkout");
//       return;
//     }
//     setData(JSON.parse(saved));
//   }, [router]);

//   if (!data) return null;

//   return (
//     <>
//     <Navbar/>
//     <main className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
//       <h1 className="text-3xl font-bold text-[#0d2d47] mb-10">
//         Payment
//       </h1>

//       <div className="grid md:grid-cols-3 gap-8">

//         {/* LEFT – PAYMENT METHODS */}
//         <div className="md:col-span-2 bg-white rounded-2xl shadow p-6 sm:p-8">
//           <h2 className="text-xl font-semibold mb-6">
//             Choose Payment Method
//           </h2>

//           <div className="space-y-4">

//             {/* CARD */}
//   <PaymentOption
//     active={method === "card"}
//     onClick={() => setMethod("card")}
//     title="Credit / Debit Card"
//     desc="Visa, MasterCard, RuPay"
//     icon={<FaCreditCard />}
//   />

//   {/* UPI */}
//   <PaymentOption
//     active={method === "upi"}
//     onClick={() => setMethod("upi")}
//     title="UPI"
//     desc="Google Pay, PhonePe, Paytm"
//     icon={<FaUniversity />}
//   />

            
//           </div>
//         </div>

//         {/* RIGHT – ORDER SUMMARY */}
//         <div className="bg-white rounded-2xl shadow p-6 h-fit">
//           <h3 className="font-semibold mb-4">
//             Order Summary
//           </h3>

//           <div className="space-y-2 text-sm">
//             {data.cart.map((item) => (
//               <div key={item.id} className="flex justify-between">
//                 <span>{item.name} × {item.qty}</span>
//                 <span>${(item.price * item.qty).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>

//           <hr className="my-4" />

//           <div className="flex justify-between font-semibold text-lg">
//             <span>Total</span>
//             <span>${data.subtotal.toFixed(2)}</span>
//           </div>

//           <button
//   onClick={() => {
//     const saved = JSON.parse(localStorage.getItem("bio-checkout"));

//     localStorage.setItem(
//       "bio-checkout",
//       JSON.stringify({
//         ...saved,
//         paymentMethod: method,
//       })
//     );

//     router.push("/confirm-order");
//   }}
//   className="
//     mt-6 w-full py-3 rounded-full
//     font-semibold text-white
//     bg-gradient-to-r from-bioBlue to-bioGreen
//     shadow-lg hover:shadow-xl
//     transition
//   "
// >
//   Pay Securely
// </button>



//           <p className="text-xs text-gray-500 mt-3 text-center flex items-center justify-center gap-1">
//   <FaShieldAlt className="text-bioBlue" />
//   100% Secure Payments
// </p>

//         </div>
//       </div>
//     </main>
//     <Footer/>
//     </>
//   );
// }

// /* ---------------- PAYMENT OPTION CARD ---------------- */

// function PaymentOption({ active, onClick, title, desc, icon }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`
//         w-full flex items-center justify-between
//         border rounded-xl px-6 py-4 text-left
//         transition-all duration-200
//         ${active
//           ? "border-bioBlue bg-bioBlue/10 shadow-md"
//           : "border-gray-200 hover:border-bioBlue hover:bg-gray-50"}
//       `}
//     >
//       <div className="flex items-center gap-4">
//         <div
//           className={`
//             w-12 h-12 rounded-full flex items-center justify-center
//             text-xl
//             ${active
//               ? "bg-bioBlue text-white"
//               : "bg-gray-100 text-gray-600"}
//           `}
//         >
//           {icon}
//         </div>

//         <div>
//           <p className="font-semibold text-gray-900">
//             {title}
//           </p>
//           <p className="text-sm text-gray-500">
//             {desc}
//           </p>
//         </div>
//       </div>

//       <div
//         className={`
//           w-5 h-5 rounded-full border-2 flex items-center justify-center
//           ${active ? "border-bioBlue" : "border-gray-300"}
//         `}
//       >
//         {active && (
//           <div className="w-2.5 h-2.5 bg-bioBlue rounded-full" />
//         )}
//       </div>
//     </button>
//   );
// }

