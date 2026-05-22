//components\admin\AdminFooter.jsx
"use client";

export default function AdminFooter() {
  return (
    <footer className="border-t border-[#d8eef3] bg-white/80 backdrop-blur-xl">
      <div className="text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} BioPeptide Admin Panel. All Rights Reserved.
      </div>
    </footer>
  );
}
