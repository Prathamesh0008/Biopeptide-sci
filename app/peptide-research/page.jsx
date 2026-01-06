// app/peptide-research/page.jsx
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import AppShell from "@/components/AppShell";
import PeptideResearchClient from "./PeptideResearchClient";
import PeptideResearchWrapper from "./PeptideResearchWrapper";

export default function PeptideResearchPage() {
  return (
    <AppShell>
      <PeptideResearchWrapper>
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
              Loading research content…
            </div>
          }
        >
          <PeptideResearchClient />
        </Suspense>
      </PeptideResearchWrapper>
    </AppShell>
  );
}




// // //app\peptide-research\page.jsx

// export const dynamic = "force-dynamic";

// import { Suspense } from "react";
// import AppShell from "@/components/AppShell";
// import PeptideResearchClient from "./PeptideResearchClient";

// export default function PeptideResearchPage() {
//   return (
//     <AppShell>
//       <Suspense
//         fallback={
//           <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
//             Loading research content…
//           </div>
//         }
//       >
//         <PeptideResearchClient />
//       </Suspense>
//     </AppShell>
//   );
// }



// "use client";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import { Suspense } from "react";
// import PeptideResearchClient from "./PeptideResearchClient";
// import Breadcrumbs from "../../components/Breadcrumbs";

// export default function PeptideResearchPage() {
//   return (
//     <>
//       <Navbar />
//       <Breadcrumbs/>

//       <Suspense
//         fallback={
//           <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
//             Loading research content…
//           </div>
//         }
//       >
//         <PeptideResearchClient />
//       </Suspense>

//       <Footer />
//     </>
//   );
// }
