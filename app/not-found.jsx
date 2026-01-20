// app/not-found.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";


export default function NotFound() {
  const banner = "/images/bannerhero1.jpg";

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Hero-style 404 */}
      <main className="flex-grow relative w-full">
        {/* Background Image */}
        <div className="relative w-full h-[500px] md:h-[600px]">
          <Image
            src={banner}
            alt="BioPeptide Banner"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Content Box */}
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg px-6 py-6 md:px-10 md:py-8 max-w-3xl w-full text-center">
              <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-4">
                404
              </h1>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-4">
                Oops! Page not found.
              </h2>
              <p className="text-gray-700 mb-6">
                The page you are looking for might have been removed or never existed.
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-3 md:px-10 md:py-4 rounded-full text-white font-semibold bg-gradient-to-r from-[#145b2f] via-[#559f45] to-[#1a497c] hover:opacity-90 transition"
              >
                Go Back Home
              </Link>
            </div>
          </div>
        </div>
      </main>

     
    </div>
  );
}
