"use client";

import { LanguageProvider } from "@/contexts/LanguageContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}




// //peptides\app\layout.tsx
// import "./globals.css";
// import type { Metadata } from "next";

// export const metadata: Metadata = {
//   title: "BioPeptide",
//   description: "Premium Research Peptides • High Purity • Fast Shipping",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body className="text-gray-900">
//         {/* Layout should NOT contain navbar/footer */}
//         {children}
//       </body>
//     </html>
//   );
// }
