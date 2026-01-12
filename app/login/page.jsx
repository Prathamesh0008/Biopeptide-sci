//app\login\page.jsx
"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
const [showPassword, setShowPassword] = useState(false);

  const mergeGuestCartToUser = (user) => {
  const guestCart = JSON.parse(localStorage.getItem("guest-cart") || "[]");
  if (!guestCart.length) return;

  const userCartKey = `bio-cart-${user.email}`;
  const userCart = JSON.parse(localStorage.getItem(userCartKey) || "[]");

  const merged = [...userCart];

  guestCart.forEach((g) => {
    const existing = merged.find((u) => u.id === g.id);
    if (existing) {
      existing.qty += g.qty;
    } else {
      merged.push(g);
    }
  });

  localStorage.setItem(userCartKey, JSON.stringify(merged));
  localStorage.removeItem("guest-cart");
};

  const submitLogin = async () => {
    if (!form.email || !form.password) {
      alert("Email and password required");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.email,
        password: form.password,
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
  alert(data.error || "Login failed");
  setLoading(false);
  return;
}



// save user for frontend
// save user for frontend
localStorage.setItem("bio-user", JSON.stringify(data.user));

// 🔥 REQUIRED — notify Navbar
window.dispatchEvent(new Event("bio-user-updated"));

mergeGuestCartToUser(data.user);



// admin flow
if (data.user.role === "admin") {
  router.push("/admin/dashboard");
  return;
}


// return to intended page (checkout/cart)
const next = localStorage.getItem("bio-after-login");
if (next) {
  localStorage.removeItem("bio-after-login");
  router.push(next);
  return;
}

// normal user → profile
router.push("/profile");

  };

  return (
    <>
  
    <main className="
  min-h-screen
  flex items-center justify-center
  relative
  bg-gradient-to-br from-white via-[#f2fbff] to-[#ecfff6]
  px-6
  overflow-hidden
">

      {/* Floating background */}
      <motion.div
        className="absolute top-10 left-10 w-16 h-16 bg-bioBlue/5 rounded-full blur-2xl"
        animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-16 right-16 w-20 h-20 bg-bioGreen/5 rounded-full blur-2xl"
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
        className="
   mx-auto w-full max-w-4xl
  bg-white/95
  backdrop-blur-xl
  rounded-2xl
  border border-white/60
  shadow-[0_20px_60px_-15px_rgba(13,45,71,0.25)]
  overflow-hidden
"
      >
        <div className="grid md:grid-cols-2">

          {/* LEFT */}
          <div className="p-8 bg-gradient-to-br from-bioBlue/5 to-bioGreen/5">
            <div className="flex items-center gap-3 mb-3">
  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bioBlue to-bioGreen flex items-center justify-center text-white font-bold">
    B
  </div>
  <h2 className="text-2xl font-bold text-[#0d2d47]">
    Registered Customers
  </h2>
</div>

<div className="w-12 h-1 rounded-full bg-gradient-to-r from-bioBlue to-bioGreen mb-4"></div>

<p className="text-gray-600 text-sm leading-relaxed">
  Login to continue checkout and securely manage your orders.
</p>

<div className="mt-6 text-xs text-gray-500">
  Secure login • Encrypted credentials
</div>



          </div>

         {/* RIGHT */}
<form
  className="p-8 space-y-6"
  onSubmit={(e) => {
    e.preventDefault();
    submitLogin();
  }}
>

            <h3 className="text-xl font-semibold text-[#0d2d47]">
              Login
            </h3>
            <div className="w-10 h-1 rounded-full bg-gradient-to-r from-bioBlue to-bioGreen"></div>




            <div>
              <label className="text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                className="
  w-full px-4 py-3 mt-1 rounded-lg
  border border-gray-200
  bg-white
  shadow-sm
  focus:ring-2 focus:ring-bioBlue/60
  focus:border-bioBlue
  outline-none
"

                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />
            </div>

           <div>
  <label className="text-sm font-medium text-gray-700">
    Password
  </label>

  <div className="relative">
    <input
      type={showPassword ? "text" : "password"}
      className="
        w-full px-4 py-3 mt-1 rounded-lg
        border border-gray-200
        bg-white
        shadow-sm
        focus:ring-2 focus:ring-bioBlue/60
        focus:border-bioBlue
        outline-none
        pr-12
      "
      value={form.password}
      onChange={(e) =>
        setForm({ ...form, password: e.target.value })
      }
    />

    {/* 👁 Eye Toggle */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="
        absolute right-3 top-1/2 -translate-y-1/2
        text-gray-500 hover:text-bioBlue
        transition
      "
      aria-label={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  </div>
</div>


            <button
              type="submit"
  disabled={loading}
              className="
  w-full py-3 rounded-lg
  bg-gradient-to-r from-bioBlue to-bioGreen
  text-white font-semibold
  shadow-md hover:shadow-xl
  hover:scale-[1.01] active:scale-[0.99]
  transition
  disabled:opacity-50
"

            >
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <p className="text-center text-sm text-gray-600 tracking-wide">
              Don’t have an account?
              <Link href="/register" className="text-bioBlue ml-1 hover:underline">
                Create Account →
              </Link>
            </p>
         </form>


        </div>
      </motion.div>
    </main>
    
    </>
  );
}






// //app\login\page.jsx
// "use client";

// import { motion } from "framer-motion";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import Link from "next/link";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// export default function LoginPage() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const mergeGuestCartToUser = (user) => {
//   const guestCart = JSON.parse(localStorage.getItem("guest-cart") || "[]");
//   if (!guestCart.length) return;

//   const userCartKey = `bio-cart-${user.email}`;
//   const userCart = JSON.parse(localStorage.getItem(userCartKey) || "[]");

//   const merged = [...userCart];

//   guestCart.forEach((g) => {
//     const existing = merged.find((u) => u.id === g.id);
//     if (existing) {
//       existing.qty += g.qty;
//     } else {
//       merged.push(g);
//     }
//   });

//   localStorage.setItem(userCartKey, JSON.stringify(merged));
//   localStorage.removeItem("guest-cart");
// };

//   const submitLogin = async () => {
//     if (!form.email || !form.password) {
//       alert("Email and password required");
//       return;
//     }

//     setLoading(true);

//     const res = await fetch("/api/auth/login", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         email: form.email,
//         password: form.password,
//       }),
//     });

//     const data = await res.json();

//     if (!res.ok || !data.ok) {
//   alert(data.error || "Login failed");
//   setLoading(false);
//   return;
// }



// // save user for frontend
// // save user for frontend
// localStorage.setItem("bio-user", JSON.stringify(data.user));

// // 🔥 REQUIRED — notify Navbar
// window.dispatchEvent(new Event("bio-user-updated"));

// mergeGuestCartToUser(data.user);



// // admin flow
// if (data.user.role === "admin") {
//   router.push("/admin/dashboard");
//   return;
// }


// // return to intended page (checkout/cart)
// const next = localStorage.getItem("bio-after-login");
// if (next) {
//   localStorage.removeItem("bio-after-login");
//   router.push(next);
//   return;
// }

// // normal user → profile
// router.push("/profile");

//   };

//   return (
//     <>
  
//     <main className="
//   min-h-screen
//   flex items-center justify-center
//   relative
//   bg-gradient-to-br from-white via-[#f2fbff] to-[#ecfff6]
//   px-6
//   overflow-hidden
// ">

//       {/* Floating background */}
//       <motion.div
//         className="absolute top-10 left-10 w-16 h-16 bg-bioBlue/5 rounded-full blur-2xl"
//         animate={{ y: [0, 30, 0], opacity: [0.4, 0.7, 0.4] }}
//         transition={{ duration: 6, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute bottom-16 right-16 w-20 h-20 bg-bioGreen/5 rounded-full blur-2xl"
//         animate={{ y: [0, -40, 0], opacity: [0.3, 0.6, 0.3] }}
//         transition={{ duration: 7, repeat: Infinity }}
//       />

//       <motion.div
//         initial={{ x: 100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.45 }}
//         className="
//    mx-auto w-full max-w-4xl
//   bg-white/95
//   backdrop-blur-xl
//   rounded-2xl
//   border border-white/60
//   shadow-[0_20px_60px_-15px_rgba(13,45,71,0.25)]
//   overflow-hidden
// "
//       >
//         <div className="grid md:grid-cols-2">

//           {/* LEFT */}
//           <div className="p-8 bg-gradient-to-br from-bioBlue/5 to-bioGreen/5">
//             <div className="flex items-center gap-3 mb-3">
//   <div className="w-10 h-10 rounded-full bg-gradient-to-br from-bioBlue to-bioGreen flex items-center justify-center text-white font-bold">
//     B
//   </div>
//   <h2 className="text-2xl font-bold text-[#0d2d47]">
//     Registered Customers
//   </h2>
// </div>

// <div className="w-12 h-1 rounded-full bg-gradient-to-r from-bioBlue to-bioGreen mb-4"></div>

// <p className="text-gray-600 text-sm leading-relaxed">
//   Login to continue checkout and securely manage your orders.
// </p>

// <div className="mt-6 text-xs text-gray-500">
//   Secure login • Encrypted credentials
// </div>



//           </div>

//           {/* RIGHT */}
//          {/* RIGHT */}
// <form
//   className="p-8 space-y-6"
//   onSubmit={(e) => {
//     e.preventDefault();
//     submitLogin();
//   }}
// >

//             <h3 className="text-xl font-semibold text-[#0d2d47]">
//               Login
//             </h3>
//             <div className="w-10 h-1 rounded-full bg-gradient-to-r from-bioBlue to-bioGreen"></div>




//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 className="
//   w-full px-4 py-3 mt-1 rounded-lg
//   border border-gray-200
//   bg-white
//   shadow-sm
//   focus:ring-2 focus:ring-bioBlue/60
//   focus:border-bioBlue
//   outline-none
// "

//                 value={form.email}
//                 onChange={(e) =>
//                   setForm({ ...form, email: e.target.value })
//                 }
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium text-gray-700">
//                 Password
//               </label>
//               <input
//                 type="password"
//                className="
//   w-full px-4 py-3 mt-1 rounded-lg
//   border border-gray-200
//   bg-white
//   shadow-sm
//   focus:ring-2 focus:ring-bioBlue/60
//   focus:border-bioBlue
//   outline-none
// "

//                 value={form.password}
//                 onChange={(e) =>
//                   setForm({ ...form, password: e.target.value })
//                 }
//               />
//             </div>

//             <button
//               type="submit"
//   disabled={loading}
//               className="
//   w-full py-3 rounded-lg
//   bg-gradient-to-r from-bioBlue to-bioGreen
//   text-white font-semibold
//   shadow-md hover:shadow-xl
//   hover:scale-[1.01] active:scale-[0.99]
//   transition
//   disabled:opacity-50
// "

//             >
//               {loading ? "Signing in..." : "Sign In"}
//             </button>

//             <p className="text-center text-sm text-gray-600 tracking-wide">
//               Don’t have an account?
//               <Link href="/register" className="text-bioBlue ml-1 hover:underline">
//                 Create Account →
//               </Link>
//             </p>
//          </form>


//         </div>
//       </motion.div>
//     </main>
    
//     </>
//   );
// }
