
// // peptides/app/checkout/page.jsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import DrawerProducts from "@/components/DrawerProducts";
// import { useLanguage } from "@/contexts/LanguageContext";

// export default function CheckoutPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState([]);
//   const [previousAddresses, setPreviousAddresses] = useState([]);
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   const [emailError, setEmailError] = useState("");
//   const { translations } = useLanguage();
//   if (!translations?.checkoutPage) {
//   return null;
// }


//   const t = (key) =>
//     key.split(".").reduce(
//       (obj, k) => obj?.[k],
//       translations?.checkoutPage || {}
//     );

//   const [form, setForm] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     house: "",
//     area: "",
//     city: "",
//     state: "",
//     pincode: "",
//     country: "",
//   });

//   useEffect(() => {
//     const userStr = localStorage.getItem("bio-user");
//     if (!userStr) {
//       localStorage.setItem("bio-after-login", "/checkout");
//       router.push("/login");
//       return;
//     }

//     const user = JSON.parse(userStr);

//     const cartKey = user?.email
//       ? `bio-cart-${user.email}`
//       : "guest-cart";

//     const savedCart = JSON.parse(
//       localStorage.getItem(cartKey) || "[]"
//     );

//     if (savedCart.length === 0) {
//       router.push("/cart");
//       return;
//     }

//     setCart(savedCart);

//     setForm((prev) => ({
//       ...prev,
//       fullName: user?.name || prev.fullName,
//       email: user?.email || prev.email,
//       phone: user?.phone || prev.phone,
//     }));

//     if (user?._id) {
//       fetch(`/api/address/get?userId=${user._id}`)
//         .then((res) => res.json())
//         .then((addresses) => {
//           if (Array.isArray(addresses)) {
//             setPreviousAddresses(addresses);
//           }
//         });
//     }
//   }, [router]);

//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );

//   const isValidEmail = (email) =>
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

//   const goToPayment = async () => {
//     const checkoutId =
//       localStorage.getItem("bio-checkout-id") ||
//       crypto.randomUUID();

//     localStorage.setItem("bio-checkout-id", checkoutId);

//     if (!isValidEmail(form.email)) {
//       setEmailError("Please enter a valid email address");
//       return;
//     }

//     if (
//       !form.fullName ||
//       !form.phone ||
//       !form.house ||
//       !form.city ||
//       !form.state ||
//       !form.pincode
//     ) {
//       alert(t("errors.requiredFields"));
//       return;
//     }

//     localStorage.setItem(
//       "bio-checkout",
//       JSON.stringify({
//         checkoutId,
//         user: JSON.parse(localStorage.getItem("bio-user")),
//         form,
//         cart,
//         subtotal,
//       })
//     );

//     const user = JSON.parse(localStorage.getItem("bio-user"));

//     await fetch("/api/address/save", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: user._id,
//         address: form,
//       }),
//     });

//     router.push("/payment");
//   };

//   return (
//     <>
//       <Navbar />

//       {/* DRAWER BUTTON */}
//       <button
//         onClick={() => setDrawerOpen(true)}
//         className="
//           fixed right-0 top-1/2 -translate-y-1/2 z-50
//           flex items-center justify-center
//           bg-gradient-to-b from-bioBlue to-bioGreen
//           text-white shadow-lg cursor-pointer
//           h-36 w-10 rounded-l-xl
//         "
//       >
//         <span
//           className="
//             text-xs font-semibold tracking-widest
//             [writing-mode:vertical-rl]
//           "
//         >
//           Product List
//         </span>
//       </button>

//       {/* DRAWER (PAGE LEVEL ONLY) */}
//       <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//         <h1 className="text-3xl font-bold mb-8 text-[#0d2d47]">
//           {t("title")}
//         </h1>

//         <div className="grid lg:grid-cols-3 gap-8">
//           {/* LEFT – FORM */}
//           <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 sm:p-8">
//             <h2 className="text-xl font-semibold mb-6">
//               {t("shippingInfo")}
//             </h2>

//           <div className="grid sm:grid-cols-2 gap-4">
//   <input
//     placeholder={t("fields.fullName")}
//     value={form.fullName}
//     onChange={(e) => setForm({ ...form, fullName: e.target.value })}
//     className="border rounded-xl px-4 py-3"
//   />

//   <input
//     placeholder={t("fields.email")}
//     value={form.email}
//     onChange={(e) => setForm({ ...form, email: e.target.value })}
//     className="border rounded-xl px-4 py-3"
//   />

//   <input
//     placeholder={t("fields.phone")}
//     value={form.phone}
//     onChange={(e) => setForm({ ...form, phone: e.target.value })}
//     className="border rounded-xl px-4 py-3"
//   />

//   <input
//     placeholder={t("fields.house")}
//     value={form.house}
//     onChange={(e) => setForm({ ...form, house: e.target.value })}
//     className="border rounded-xl px-4 py-3"
//   />

//   <input
//     placeholder={t("fields.area")}
//     value={form.area}
//     onChange={(e) => setForm({ ...form, area: e.target.value })}
//     className="border rounded-xl px-4 py-3"
//   />

//   <input
//     placeholder={t("fields.city")}
//     value={form.city}
//     onChange={(e) => setForm({ ...form, city: e.target.value })}
//     className="border rounded-xl px-4 py-3"
//   />

//   <input
//     placeholder={t("fields.state")}
//     value={form.state}
//     onChange={(e) => setForm({ ...form, state: e.target.value })}
//     className="border rounded-xl px-4 py-3"
//   />

//   <input
//     placeholder={t("fields.pincode")}
//     value={form.pincode}
//     onChange={(e) => setForm({ ...form, pincode: e.target.value })}
//     className="border rounded-xl px-4 py-3"
//   />

//   <input
//     placeholder={t("fields.country")}
//     value={form.country}
//     onChange={(e) => setForm({ ...form, country: e.target.value })}
//     className="border rounded-xl px-4 py-3"
//   />
// </div>

//           </div>

//           {/* RIGHT – SUMMARY */}
//           <div className="bg-white rounded-2xl shadow p-6 h-fit">
//             <h3 className="font-semibold mb-4">
//               {t("summary.title")}
//             </h3>

//             <div className="space-y-2 text-sm">
//               {cart.map((item) => (
//                 <div
//                   key={item.id}
//                   className="flex justify-between"
//                 >
//                   <span>
//                     {item.name} × {item.qty}
//                   </span>
//                   <span>
//                     ${(item.price * item.qty).toFixed(2)}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             <hr className="my-4" />

//             <div className="flex justify-between font-semibold text-lg">
//               <span>{t("summary.total")}</span>
//               <span>${subtotal.toFixed(2)}</span>
//             </div>

//             <button
//               onClick={goToPayment}
//               className="mt-6 w-full py-3 rounded-full font-semibold text-white
//                 bg-gradient-to-r from-bioBlue to-bioGreen"
//             >
//               {t("continue")}
//             </button>

//             {previousAddresses.length > 0 && (
//               <div className="mt-6 space-y-4">
//                 <p className="text-sm font-semibold text-gray-700">
//                   Previously Used Addresses
//                 </p>

//                 {previousAddresses.map((addr) => (
//                   <div
//                     key={addr._id}
//                     className="border rounded-xl p-4 bg-gray-50"
//                   >
//                     <p className="text-sm text-gray-600 leading-relaxed">
//                       {addr.fullName}
//                       <br />
//                       {addr.house}, {addr.area}
//                       <br />
//                       {addr.city}, {addr.state} –{" "}
//                       {addr.pincode}
//                       <br />
//                       {addr.country}
//                       <br />
//                       📞 {addr.phone}
//                     </p>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         setForm((prev) => ({
//                           ...prev,
//                           ...addr,
//                         }))
//                       }
//                       className="mt-3 text-sm font-semibold text-bioBlue hover:underline"
//                     >
//                       Use this address
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </>
//   );
// }






//app\checkout\page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";


export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [previousAddresses, setPreviousAddresses] = useState([]);

  const [emailError, setEmailError] = useState("");
  const { translations } = useLanguage();

const t = (key) =>
  key.split(".").reduce(
    (obj, k) => obj?.[k],
    translations?.checkoutPage || {}
  );



  const [form, setForm] = useState({
    fullName: "",
  email: "",
  phone: "",
  house: "",
  area: "",
  city: "",
  state: "",
  pincode: "",
  country: "",
  });
useEffect(() => {
  const userStr = localStorage.getItem("bio-user");
  if (!userStr) {
    localStorage.setItem("bio-after-login", "/checkout");
    router.push("/login");
    return;
  }

  const user = JSON.parse(userStr);

  // 🔹 Load cart
  const cartKey = user?.email ? `bio-cart-${user.email}` : "guest-cart";
  const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

  if (savedCart.length === 0) {
    router.push("/cart");
    return;
  }

  setCart(savedCart);

  // 🔹 Prefill basic user info
  setForm((prev) => ({
    ...prev,
    fullName: user?.name || prev.fullName,
    email: user?.email || prev.email,
    phone: user?.phone || prev.phone,
  }));

  // 🔹 FETCH PREVIOUS ADDRESS FROM DATABASE
  if (user?._id) {
    fetch(`/api/address/get?userId=${user._id}`)
      .then((res) => res.json())
      .then((addresses) => {
  if (Array.isArray(addresses)) {
    setPreviousAddresses(addresses);
  }
});

  }
}, [router]);


  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

 const goToPayment = async () => {
  // ✅ checkoutId logic HERE
  const checkoutId =
    localStorage.getItem("bio-checkout-id") || crypto.randomUUID();

  localStorage.setItem("bio-checkout-id", checkoutId);

  if (!isValidEmail(form.email)) {
    setEmailError("Please enter a valid email address");
    return;
  }

  if (
    !form.fullName ||
    !form.phone ||
    !form.house ||
    !form.city ||
    !form.state ||
    !form.pincode
  ) {
    alert(t("errors.requiredFields"));

    return;
  }

  localStorage.setItem(
    "bio-checkout",
    JSON.stringify({
      checkoutId,
      user: JSON.parse(localStorage.getItem("bio-user")),
      form,
      cart,
      subtotal,
    })
  );

  // const u = JSON.parse(localStorage.getItem("bio-user") || "{}");
  // if (u?.email) {
  //   localStorage.setItem(`bio-address:${u.email}`, JSON.stringify(form));
  // }
const user = JSON.parse(localStorage.getItem("bio-user"));

await fetch("/api/address/save", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    userId: user._id,
    address: form,
  }),
});

  router.push("/payment");
};




  return (
    <>
    <Navbar/>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-[#0d2d47]">
        {t("title")}
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT – FORM */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-6">
            {t("shippingInfo")}
          </h2>

          <div className="grid gap-5">

            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("fields.fullName")}
              </label>
              <input
                type="text"
                className="w-full border rounded-lg px-4 py-3 text-base"
                value={form.fullName}
                onChange={(e) =>
                  setForm({ ...form, fullName: e.target.value })
                }
              />
            </div>

            {/* EMAIL */}
            <div>
  <label className="block text-sm font-medium mb-1">
    {t("fields.email")}
  </label>
  <input
    type="email"
    className={`w-full border rounded-lg px-4 py-3 text-base
      ${emailError ? "border-red-500" : ""}`}
    value={form.email}
    onChange={(e) => {
      setForm({ ...form, email: e.target.value });
      setEmailError("");
    }}
    onBlur={() => {
      if (form.email && !isValidEmail(form.email)) {
       setEmailError(t("errors.invalidEmail"));
      }
    }}
  />
  {emailError && (
    <p className="text-sm text-red-500 mt-1">
      {emailError}
    </p>
  )}
</div>


            {/* PHONE */}
            <div>
              <label className="block text-sm font-medium mb-1">
                {t("fields.phone")}
              </label>
              <input
  type="tel"
  className="w-full border rounded-lg px-4 py-3 text-base"
  placeholder="+1 234 567 8900"
  value={form.phone}
  onChange={(e) =>
    setForm({ ...form, phone: e.target.value })
  }
/>

            </div>

            {/* ADDRESS DETAILS */}
<div className="grid gap-5">

  {/* HOUSE / STREET */}
  <div>
    <label className="block text-sm font-medium mb-1">
      {t("fields.house")}
    </label>
    <input
      type="text"
      className="w-full border rounded-lg px-4 py-3 text-base"
      value={form.house}
      onChange={(e) =>
        setForm({ ...form, house: e.target.value })
      }
    />
  </div>

  {/* AREA / LANDMARK */}
  <div>
    <label className="block text-sm font-medium mb-1">
      Area / Landmark
    </label>
    <input
      type="text"
      className="w-full border rounded-lg px-4 py-3 text-base"
      value={form.area}
      onChange={(e) =>
        setForm({ ...form, area: e.target.value })
      }
    />
  </div>

  {/* CITY + STATE */}
  <div className="grid sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium mb-1">
        City
      </label>
      <input
  type="text"
  className="w-full border rounded-lg px-4 py-3 text-base"
  value={form.city}
  onChange={(e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setForm({ ...form, city: value });
  }}
/>

    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        State
      </label>
      <input
  type="text"
  className="w-full border rounded-lg px-4 py-3 text-base"
  placeholder="State / Province / Region"
  value={form.state}
  onChange={(e) =>
    setForm({ ...form, state: e.target.value })
  }
/>

    </div>
  </div>

  {/* PINCODE + COUNTRY */}
  <div className="grid sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium mb-1">
        Pincode
      </label>
      <input
  type="text"
  className="w-full border rounded-lg px-4 py-3 text-base"
  placeholder="Postal / ZIP Code"
  value={form.pincode}
  onChange={(e) =>
    setForm({ ...form, pincode: e.target.value })
  }
/>

    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        Country
      </label>
      <select
  className="w-full border rounded-lg px-4 py-3 text-base bg-white"
  value={form.country}
  onChange={(e) =>
    setForm({ ...form, country: e.target.value })
  }
>
  <option value="">Select Country</option>
  <option value="United States">United States</option>
  <option value="United Kingdom">United Kingdom</option>
  <option value="Canada">Canada</option>
  <option value="Australia">Australia</option>
  <option value="Germany">Germany</option>
  <option value="France">France</option>
  <option value="Netherlands">Netherlands</option>
  <option value="Spain">Spain</option>
  <option value="Italy">Italy</option>
  <option value="India">India</option>
  <option value="Other">Other</option>
</select>

    </div>
  </div>
</div>
          </div>
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="font-semibold mb-4">{t("summary.title")}</h3>

          <div className="space-y-2 text-sm">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} × {item.qty}</span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <hr className="my-4" />

          <div className="flex justify-between font-semibold text-lg">
            <span>{t("summary.total")}</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={goToPayment}
            className="mt-6 w-full py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-bioBlue to-bioGreen"
          >
            {t("continue")}

          </button>
        {previousAddresses.length > 0 && (
  <div className="mt-6 space-y-4">
    <p className="text-sm font-semibold text-gray-700">
      Previously Used Addresses
    </p>

    {previousAddresses.map((addr) => (
      <div
        key={addr._id}
        className="border rounded-xl p-4 bg-gray-50"
      >
        <p className="text-sm text-gray-600 leading-relaxed">
          {addr.fullName}<br />
          {addr.house}, {addr.area}<br />
          {addr.city}, {addr.state} – {addr.pincode}<br />
          {addr.country}<br />
          📞 {addr.phone}
        </p>

        <button
          type="button"
          onClick={() =>
            setForm((prev) => ({
              ...prev,
              ...addr,
            }))
          }
          className="mt-3 text-sm font-semibold text-bioBlue hover:underline"
        >
          Use this address
        </button>
      </div>
    ))}
  </div>
)}


        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
}

















// //app\checkout\page.jsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { useLanguage } from "@/contexts/LanguageContext";


// export default function CheckoutPage() {
//   const router = useRouter();
//   const [cart, setCart] = useState([]);
//   const [previousAddresses, setPreviousAddresses] = useState([]);

//   const [emailError, setEmailError] = useState("");
//   const { translations } = useLanguage();

// const t = (key) =>
//   key.split(".").reduce(
//     (obj, k) => obj?.[k],
//     translations?.checkoutPage || {}
//   );



//   const [form, setForm] = useState({
//     fullName: "",
//   email: "",
//   phone: "",
//   house: "",
//   area: "",
//   city: "",
//   state: "",
//   pincode: "",
//   country: "India",
//   });
// useEffect(() => {
//   const userStr = localStorage.getItem("bio-user");
//   if (!userStr) {
//     localStorage.setItem("bio-after-login", "/checkout");
//     router.push("/login");
//     return;
//   }

//   const user = JSON.parse(userStr);

//   // 🔹 Load cart
//   const cartKey = user?.email ? `bio-cart-${user.email}` : "guest-cart";
//   const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");

//   if (savedCart.length === 0) {
//     router.push("/cart");
//     return;
//   }

//   setCart(savedCart);

//   // 🔹 Prefill basic user info
//   setForm((prev) => ({
//     ...prev,
//     fullName: user?.name || prev.fullName,
//     email: user?.email || prev.email,
//     phone: user?.phone || prev.phone,
//   }));

//   // 🔹 FETCH PREVIOUS ADDRESS FROM DATABASE
//   if (user?._id) {
//     fetch(`/api/address/get?userId=${user._id}`)
//       .then((res) => res.json())
//       .then((addresses) => {
//   if (Array.isArray(addresses)) {
//     setPreviousAddresses(addresses);
//   }
// });

//   }
// }, [router]);


//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.price * item.qty,
//     0
//   );
// const isValidEmail = (email) => {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// };

//  const goToPayment = async () => {
//   // ✅ checkoutId logic HERE
//   const checkoutId =
//     localStorage.getItem("bio-checkout-id") || crypto.randomUUID();

//   localStorage.setItem("bio-checkout-id", checkoutId);

//   if (!isValidEmail(form.email)) {
//     setEmailError("Please enter a valid email address");
//     return;
//   }

//   if (
//     !form.fullName ||
//     !form.phone ||
//     !form.house ||
//     !form.city ||
//     !form.state ||
//     !form.pincode
//   ) {
//     alert(t("errors.requiredFields"));

//     return;
//   }

//   localStorage.setItem(
//     "bio-checkout",
//     JSON.stringify({
//       checkoutId,
//       user: JSON.parse(localStorage.getItem("bio-user")),
//       form,
//       cart,
//       subtotal,
//     })
//   );

//   // const u = JSON.parse(localStorage.getItem("bio-user") || "{}");
//   // if (u?.email) {
//   //   localStorage.setItem(`bio-address:${u.email}`, JSON.stringify(form));
//   // }
// const user = JSON.parse(localStorage.getItem("bio-user"));

// await fetch("/api/address/save", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     userId: user._id,
//     address: form,
//   }),
// });

//   router.push("/payment");
// };


// const INDIAN_STATES = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttarakhand",
//   "West Bengal",
//   "Delhi",
//   "Jammu and Kashmir",
//   "Ladakh",
//   "Puducherry",
// ];

//   return (
//     <>
//     <Navbar/>
//     <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
//       <h1 className="text-3xl font-bold mb-8 text-[#0d2d47]">
//         {t("title")}
//       </h1>

//       <div className="grid lg:grid-cols-3 gap-8">

//         {/* LEFT – FORM */}
//         <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 sm:p-8">
//           <h2 className="text-xl font-semibold mb-6">
//             {t("shippingInfo")}
//           </h2>

//           <div className="grid gap-5">

//             {/* FULL NAME */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 {t("fields.fullName")}
//               </label>
//               <input
//                 type="text"
//                 className="w-full border rounded-lg px-4 py-3 text-base"
//                 value={form.fullName}
//                 onChange={(e) =>
//                   setForm({ ...form, fullName: e.target.value })
//                 }
//               />
//             </div>

//             {/* EMAIL */}
//             <div>
//   <label className="block text-sm font-medium mb-1">
//     {t("fields.email")}
//   </label>
//   <input
//     type="email"
//     className={`w-full border rounded-lg px-4 py-3 text-base
//       ${emailError ? "border-red-500" : ""}`}
//     value={form.email}
//     onChange={(e) => {
//       setForm({ ...form, email: e.target.value });
//       setEmailError("");
//     }}
//     onBlur={() => {
//       if (form.email && !isValidEmail(form.email)) {
//        setEmailError(t("errors.invalidEmail"));
//       }
//     }}
//   />
//   {emailError && (
//     <p className="text-sm text-red-500 mt-1">
//       {emailError}
//     </p>
//   )}
// </div>


//             {/* PHONE */}
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 {t("fields.phone")}
//               </label>
//               <input
//               type="tel"
//               inputMode="numeric"
//               maxLength={10}
//               className="w-full border rounded-lg px-4 py-3 text-base"
//               value={form.phone}
//               onChange={(e) => {
//                 const digits = e.target.value.replace(/\D/g, "");
//                 if (digits.length <= 10) {
//                   setForm({ ...form, phone: digits });
//                 }
//               }}
//             />
//             </div>

//             {/* ADDRESS DETAILS */}
// <div className="grid gap-5">

//   {/* HOUSE / STREET */}
//   <div>
//     <label className="block text-sm font-medium mb-1">
//       {t("fields.house")}
//     </label>
//     <input
//       type="text"
//       className="w-full border rounded-lg px-4 py-3 text-base"
//       value={form.house}
//       onChange={(e) =>
//         setForm({ ...form, house: e.target.value })
//       }
//     />
//   </div>

//   {/* AREA / LANDMARK */}
//   <div>
//     <label className="block text-sm font-medium mb-1">
//       Area / Landmark
//     </label>
//     <input
//       type="text"
//       className="w-full border rounded-lg px-4 py-3 text-base"
//       value={form.area}
//       onChange={(e) =>
//         setForm({ ...form, area: e.target.value })
//       }
//     />
//   </div>

//   {/* CITY + STATE */}
//   <div className="grid sm:grid-cols-2 gap-4">
//     <div>
//       <label className="block text-sm font-medium mb-1">
//         City
//       </label>
//       <input
//   type="text"
//   className="w-full border rounded-lg px-4 py-3 text-base"
//   value={form.city}
//   onChange={(e) => {
//     const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
//     setForm({ ...form, city: value });
//   }}
// />

//     </div>

//     <div>
//       <label className="block text-sm font-medium mb-1">
//         State
//       </label>
//       <select
//         className="w-full border rounded-lg px-4 py-3 text-base bg-white"
//         value={form.state}
//         onChange={(e) =>
//           setForm({ ...form, state: e.target.value })
//         }
//       >
//         <option value="">{t("fields.selectState")}</option>
//         {INDIAN_STATES.map((s) => (
//           <option key={s} value={s}>
//             {s}
//           </option>
//         ))}
//       </select>
//     </div>
//   </div>

//   {/* PINCODE + COUNTRY */}
//   <div className="grid sm:grid-cols-2 gap-4">
//     <div>
//       <label className="block text-sm font-medium mb-1">
//         Pincode
//       </label>
//       <input
//         type="tel"
//         inputMode="numeric"
//         pattern="[0-9]*"
//         maxLength={6}
//         className="w-full border rounded-lg px-4 py-3 text-base"
//         value={form.pincode}
//         onChange={(e) => {
//           const v = e.target.value.replace(/\D/g, "");
//           if (v.length <= 6) {
//             setForm({ ...form, pincode: v });
//           }
//         }}
//       />
//     </div>

//     <div>
//       <label className="block text-sm font-medium mb-1">
//         Country
//       </label>
//       <input
//         className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base"
//         value="India"
//         disabled
//       />
//     </div>
//   </div>
// </div>
//           </div>
//         </div>

//         {/* RIGHT – SUMMARY */}
//         <div className="bg-white rounded-2xl shadow p-6 h-fit">
//           <h3 className="font-semibold mb-4">{t("summary.title")}</h3>

//           <div className="space-y-2 text-sm">
//             {cart.map((item) => (
//               <div key={item.id} className="flex justify-between">
//                 <span>{item.name} × {item.qty}</span>
//                 <span>${(item.price * item.qty).toFixed(2)}</span>
//               </div>
//             ))}
//           </div>

//           <hr className="my-4" />

//           <div className="flex justify-between font-semibold text-lg">
//             <span>{t("summary.total")}</span>
//             <span>${subtotal.toFixed(2)}</span>
//           </div>

//           <button
//             onClick={goToPayment}
//             className="mt-6 w-full py-3 rounded-full font-semibold text-white
//               bg-gradient-to-r from-bioBlue to-bioGreen"
//           >
//             {t("continue")}

//           </button>
//         {previousAddresses.length > 0 && (
//   <div className="mt-6 space-y-4">
//     <p className="text-sm font-semibold text-gray-700">
//       Previously Used Addresses
//     </p>

//     {previousAddresses.map((addr) => (
//       <div
//         key={addr._id}
//         className="border rounded-xl p-4 bg-gray-50"
//       >
//         <p className="text-sm text-gray-600 leading-relaxed">
//           {addr.fullName}<br />
//           {addr.house}, {addr.area}<br />
//           {addr.city}, {addr.state} – {addr.pincode}<br />
//           {addr.country}<br />
//           📞 {addr.phone}
//         </p>

//         <button
//           type="button"
//           onClick={() =>
//             setForm((prev) => ({
//               ...prev,
//               ...addr,
//             }))
//           }
//           className="mt-3 text-sm font-semibold text-bioBlue hover:underline"
//         >
//           Use this address
//         </button>
//       </div>
//     ))}
//   </div>
// )}


//         </div>
//       </div>
//     </main>
//     <Footer/>
//     </>
//   );
// }
