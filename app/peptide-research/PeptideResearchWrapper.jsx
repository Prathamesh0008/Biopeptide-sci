//peptides\app\peptide-research\PeptideResearchWrapper.jsx
"use client";

import { useState } from "react";
import DrawerProducts from "@/components/DrawerProducts";

export default function PeptideResearchWrapper({ children }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* DRAWER BUTTON */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="
          fixed right-0 top-1/2 -translate-y-1/2 z-50
          flex items-center justify-center
          bg-gradient-to-b from-bioBlue to-bioGreen
          text-white shadow-lg
          cursor-pointer
          h-36 w-10 rounded-l-xl
        "
      >
        <span
          className="
            text-xs font-semibold tracking-widest
            [writing-mode:vertical-rl]
          "
        >
          Product List
        </span>
      </button>

      {/* DRAWER */}
      <DrawerProducts open={drawerOpen} setOpen={setDrawerOpen} />

      {children}
    </>
  );
}
