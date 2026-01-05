import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ClientLayout from "./ClientLayout";
import type { ReactNode } from "react";

export const metadata = {
  title: "BioPeptide",
  description: "Premium Research Peptides",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/Biopeptidecolourlogo.png",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="text-gray-900 antialiased">
        <LanguageProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </LanguageProvider>
      </body>
    </html>
  );
}




// //peptides\app\layout.tsx
// import "./globals.css";
// import { LanguageProvider } from "@/contexts/LanguageContext";
// import type { ReactNode } from "react";

// export const metadata = {
//   title: "BioPeptide",
//   description: "Premium Research Peptides",
//   icons: {
//     icon: "/favicon.ico",
//     shortcut: "/favicon.ico",
//     apple: "/Biopeptidecolourlogo.png",
//   },
// };

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="text-gray-900 antialiased">
//         <LanguageProvider>
//           {children}
//         </LanguageProvider>
//       </body>
//     </html>
//   );
// }
