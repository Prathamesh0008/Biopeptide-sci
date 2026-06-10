//peptides\app\peptide-research\[slug]\page.jsx
import AppShell from "@/components/AppShell";
import PeptideResearchArticleClient from "./PeptideResearchArticleClient";
import { use } from "react";
import { notFound } from "next/navigation";
import { buildCanonical } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  return {
    title: `${slug.replace(/-/g, " ")} | BioPeptide Sci`,
    description: `Read the BioPeptide Sci peptide research article about ${slug.replace(/-/g, " ")}.`,
    alternates: {
      canonical: buildCanonical(`/peptide-research/${slug}`),
    },
  };
}

export default function PeptideResearchArticlePage({ params }) {
  const { slug } = use(params);

  if (!slug) notFound();

  return (
    <AppShell>
      <PeptideResearchArticleClient slug={slug} />
    </AppShell>
  );
}

 