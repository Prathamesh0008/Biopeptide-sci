//components\admin\AdminFooter.jsx
"use client";

export default function AdminFooter() {
  return (
    <div className="border-t border-gray-200 mt-10">
      <div
        className="
          text-center text-xs text-gray-500
          py-4
          bg-gradient-to-r from-[#145b2f] to-[#559f45]
          text-white
        "
      >
        © {new Date().getFullYear()} BioPeptide Admin Panel. All Rights Reserved.
      </div>
    </div>
  );
}
