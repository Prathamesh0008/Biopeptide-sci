"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProfile() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    const stored = localStorage.getItem("bio-user");

    if (!stored) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(stored);

    setForm({
      name: user.name || "",
      email: user.email || "",
      password: ""
    });

  }, [router]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/user/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    const data = await res.json();

    if (data.success) {

      localStorage.setItem("bio-user", JSON.stringify(data.user));

      alert("Profile Updated");

      router.push("/profile");
    } else {
      alert(data.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-5"
      >

        <h2 className="text-2xl font-bold text-center">
          Edit Profile
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="New Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-3 rounded-lg"
        />

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white rounded-lg"
        >
          Update Profile
        </button>

      </form>
    </div>
  );
}