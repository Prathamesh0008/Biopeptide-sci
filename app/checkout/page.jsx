
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

const isValidName = (name) => /^[A-Za-z\s]+$/.test(name);
const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);
const isValidPincode = (pin) => /^[0-9]{6}$/.test(pin);

 const goToPayment = async () => {
  // ✅ checkoutId logic HERE
  const checkoutId =
    localStorage.getItem("bio-checkout-id") || crypto.randomUUID();

  localStorage.setItem("bio-checkout-id", checkoutId);

  if (!isValidEmail(form.email)) {
    setEmailError("Please enter a valid email address");
    return;
  }

 if (!isValidName(form.fullName)) {
  alert("Name should not contain numbers");
  return;
}

if (!isValidPhone(form.phone)) {
  alert("Phone number must be exactly 10 digits");
  return;
}

if (!isValidPincode(form.pincode)) {
  alert("Pincode must be exactly 6 digits");
  return;
}

if (
  !form.house ||
  !form.city ||
  !form.state ||
  !form.country
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
  onChange={(e) => {
    const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
    setForm({ ...form, fullName: value });
  }}
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
  placeholder="10 digit mobile number"
  value={form.phone}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 10) {
      setForm({ ...form, phone: value });
    }
  }}
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
  placeholder="6 digit pincode"
  value={form.pincode}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length <= 6) {
      setForm({ ...form, pincode: value });
    }
  }}
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







