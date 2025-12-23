"use client";

import { FaBars } from "react-icons/fa";

export default function AdminTopbar({ onMenu }) {
  return (
    <div
      className="
        w-full h-10
        bg-[linear-gradient(to_right,#145b2f,#559f45,#65b4d7,#1a497c)]
        border-b border-white/20
        text-white
        grid grid-cols-[48px_1fr_48px]
        items-center
      "
    >
      {/* LEFT — HAMBURGER */}
      <div className="flex justify-center">
        <button
          onClick={onMenu}
          className="lg:hidden p-1 rounded hover:bg-white/10"
          aria-label="Open menu"
        >
          <FaBars />
        </button>
      </div>

      {/* CENTER — RESPONSIVE TAGLINE */}
      <div className="flex justify-center overflow-hidden">
        {/* MOBILE */}
        <span className="text-xs font-medium whitespace-nowrap md:hidden">
          Premium Research Peptides
        </span>

        {/* DESKTOP */}
        <span className="hidden md:inline text-sm font-medium whitespace-nowrap">
          Premium Research Peptides • High Purity • Fast Shipping
        </span>
      </div>

      {/* RIGHT — SPACER */}
      <div />
    </div>
  );
}
