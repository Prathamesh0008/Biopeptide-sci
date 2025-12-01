//peptides\app\layout.tsx
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import type { Metadata } from "next";

// ⭐ SEO + Metadata For Your Brand
export const metadata: Metadata = {
  title: "BioPeptide – Premium Research Peptides",
  description:
    "BioPeptide provides high-purity peptides, amino acids, and advanced research compounds with full transparency and scientific quality.",
  openGraph: {
    title: "BioPeptide – Premium Research Peptides",
    description:
      "Shop high-quality peptides, amino acids, blends, and proteins for scientific research.",
    type: "website",
    url: "https://www.biopeptide.com",
    siteName: "BioPeptide",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
