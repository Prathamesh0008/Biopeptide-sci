"use client";

import { FaBars } from "react-icons/fa";

export default function AdminTopbar({ onMenu }) {
  return (
    <div className="w-full h-14 bg-white/90 backdrop-blur-xl border-b border-[#d8eef3] text-[#0d2d47] grid grid-cols-[56px_1fr_56px] items-center sticky top-0 z-30">
      <div className="flex justify-center">
        <button
          onClick={onMenu}
          className="lg:hidden p-2 rounded-lg text-[#0978a7] hover:bg-[#f0fbfd]"
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </div>

      <div className="flex justify-center overflow-hidden">
        <span className="text-xs sm:text-sm font-semibold whitespace-nowrap">
          Premium Research Peptides | Admin Operations
        </span>
      </div>

      <div />
    </div>
  );
}
