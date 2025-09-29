// src/app/results/page.jsx (Server Component)

export const metadata = {
  // ✅ Title ~50 chars (limit 60 - 5%)
  title: "Examination Results 2025 | Results Portal",

  // ✅ Description ~115 chars (limit 160 - 5%)
  description:
    "View and download examination results for 2025 from various government and private exams online.",

  // ✅ Keywords ~82 chars (limit 100 - 5%)
  keywords: [
    "exam results 2025",
    "government results",
    "private results",
    "download results",
    "exam portal",
  ],

  authors: [{ name: "Results Portal", url: "https://www.yourwebsite.com" }],
  creator: "Results Portal",
  publisher: "Results Portal",

  openGraph: {
    title: "Examination Results 2025 | Results Portal",
    description:
      "View and download examination results for 2025 from various government and private exams online.",
    url: "https://www.yourwebsite.com/results",
    siteName: "Results Portal",
    images: [
      {
        url: "https://www.yourwebsite.com/og-results.png",
        width: 1200,
        height: 630,
        alt: "Results Portal - Exam Results 2025",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Examination Results 2025 | Results Portal",
    description:
      "View and download examination results for 2025 from various government and private exams online.",
    images: ["https://www.yourwebsite.com/og-results.png"],
    site: "@YourTwitterHandle",
    creator: "@YourTwitterHandle",
  },

  alternates: {
    canonical: "https://www.yourwebsite.com/results",
  },
};

import ResultsPageClient from "./ResultsPageClient";

export default function ResultsPage() {
  return <ResultsPageClient />;
}
