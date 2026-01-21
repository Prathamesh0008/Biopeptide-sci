//peptides\app\peptide-research\[slug]\page.jsx
import AppShell from "@/components/AppShell";
import PeptideResearchArticleClient from "./PeptideResearchArticleClient";
import { use } from "react";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default function PeptideResearchArticlePage({ params }) {
  const { slug } = use(params);

  if (!slug) notFound();

  return (
    <AppShell>
      <PeptideResearchArticleClient slug={slug} />
    </AppShell>
  );
}

 