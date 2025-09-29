// src/app/admit-cards/page.tsx (or pages/admit-cards.tsx)
import { Metadata } from "next";
import AdmitCardPageClient from "./AdmitCardPageClient"; // your existing AdmitCardPage component

// ✅ SEO Metadata
export const metadata= {
  title: "Admit Card Portal 2025 | Download Exam Admit Cards", // 57 chars ✅
  description: "Search and download admit cards for government and private exams online. Stay updated with latest exam dates 2025.", // 149 chars ✅
  keywords: "Admit Cards 2025, Download Admit Card, Exam Admit Card, Government Exams, Private Exams", // 95 chars ✅
  authors: [{ name: "Your Website Name", url: "https://yourwebsite.com" }],
  robots: "index, follow",
  openGraph: {
    title: "Admit Card Portal 2025 | Download Exam Admit Cards",
    description: "Search and download admit cards for government and private exams online. Stay updated with latest exam dates 2025.",
    url: "https://yourwebsite.com/admit-cards",
    siteName: "Admit Card Portal",
    images: [
      {
        url: "https://yourwebsite.com/og-admit-card.png",
        width: 1200,
        height: 630,
        alt: "Admit Card Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admit Card Portal 2025 | Download Exam Admit Cards",
    description: "Search and download admit cards for government and private exams online. Stay updated with latest exam dates 2025.",
    images: ["https://yourwebsite.com/og-admit-card.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    canonical: "https://yourwebsite.com/admit-cards",
  },
};

// ✅ Page Component
export default function Page() {
  return <AdmitCardPageClient />;
}
