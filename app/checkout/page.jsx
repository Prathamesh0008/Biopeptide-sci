//app\checkout\page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [emailError, setEmailError] = useState("");


  const [form, setForm] = useState({
    fullName: "",
  email: "",
  phone: "",
  house: "",
  area: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
  });
useEffect(() => {
  const userStr = localStorage.getItem("bio-user");
  if (!userStr) {
    localStorage.setItem("bio-after-login", "/checkout");
    router.push("/login");
    return;
  }

  const user = JSON.parse(userStr);

  const cartKey = user?.email ? `bio-cart-${user.email}` : "guest-cart";
const savedCart = JSON.parse(localStorage.getItem(cartKey) || "[]");
  if (savedCart.length === 0) {
    router.push("/cart");
    return;
  }
  setCart(savedCart);

  // ✅ 1) Try saved address from previous order
  const savedAddrStr = user?.email
    ? localStorage.getItem(`bio-address:${user.email}`)
    : null;

  if (savedAddrStr) {
    const savedAddr = JSON.parse(savedAddrStr);

    setForm((prev) => ({
      ...prev,
      ...savedAddr,                 // address fields
      email: savedAddr.email || user.email || prev.email,
      fullName: savedAddr.fullName || user.name || prev.fullName,
      phone: savedAddr.phone || user.phone || prev.phone,
    }));
    return;
  }

  // ✅ 2) Fallback: prefill from user object
  setForm((prev) => ({
    ...prev,
    fullName: user?.name || prev.fullName,
    email: user?.email || prev.email,
    phone: user?.phone || prev.phone,
  }));
}, [router]);


  // useEffect(() => {
  //   const savedCart = JSON.parse(localStorage.getItem("bio-cart") || "[]");
  //   if (savedCart.length === 0) {
  //     router.push("/cart");
  //     return;
  //   }
  //   setCart(savedCart);
  // }, [router]);
  

// ✅ create or reuse checkoutId (ANTI DUPLICATE)


  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

 const goToPayment = () => {
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
    alert("Please fill all required address details");
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

  const u = JSON.parse(localStorage.getItem("bio-user") || "{}");
  if (u?.email) {
    localStorage.setItem(`bio-address:${u.email}`, JSON.stringify(form));
  }

  router.push("/payment");
};


const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
];

  return (
    <>
    <Navbar/>
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-[#0d2d47]">
        Checkout
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">

        {/* LEFT – FORM */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6 sm:p-8">
          <h2 className="text-xl font-semibold mb-6">
            Shipping Information
          </h2>

          <div className="grid gap-5">

            {/* FULL NAME */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
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
    Email
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
        setEmailError("Please enter a valid email address");
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
                Mobile Number
              </label>
              <input
              type="tel"
              inputMode="numeric"
              maxLength={10}
              className="w-full border rounded-lg px-4 py-3 text-base"
              value={form.phone}
              onChange={(e) => {
                const digits = e.target.value.replace(/\D/g, "");
                if (digits.length <= 10) {
                  setForm({ ...form, phone: digits });
                }
              }}
            />
            </div>

            {/* ADDRESS DETAILS */}
<div className="grid gap-5">

  {/* HOUSE / STREET */}
  <div>
    <label className="block text-sm font-medium mb-1">
      House / Flat / Street
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
      <select
        className="w-full border rounded-lg px-4 py-3 text-base bg-white"
        value={form.state}
        onChange={(e) =>
          setForm({ ...form, state: e.target.value })
        }
      >
        <option value="">Select State</option>
        {INDIAN_STATES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* PINCODE + COUNTRY */}
  <div className="grid sm:grid-cols-2 gap-4">
    <div>
      <label className="block text-sm font-medium mb-1">
        Pincode
      </label>
      <input
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={6}
        className="w-full border rounded-lg px-4 py-3 text-base"
        value={form.pincode}
        onChange={(e) => {
          const v = e.target.value.replace(/\D/g, "");
          if (v.length <= 6) {
            setForm({ ...form, pincode: v });
          }
        }}
      />
    </div>

    <div>
      <label className="block text-sm font-medium mb-1">
        Country
      </label>
      <input
        className="w-full border rounded-lg px-4 py-3 bg-gray-100 text-base"
        value="India"
        disabled
      />
    </div>
  </div>
</div>
          </div>
        </div>

        {/* RIGHT – SUMMARY */}
        <div className="bg-white rounded-2xl shadow p-6 h-fit">
          <h3 className="font-semibold mb-4">Order Summary</h3>

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
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={goToPayment}
            className="mt-6 w-full py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-bioBlue to-bioGreen"
          >
            Continue to Payment
          </button>
        </div>
      </div>
    </main>
    <Footer/>
    </>
  );
}
