// src/app/admit-cards/page.tsx (or pages/admit-cards.tsx)
import { Metadata } from "next";
import AdmitCardPageClient from "./AdmitCardPageClient"; // your existing AdmitCardPage component

// ✅ SEO Metadata
export const metadata= {
  // ➡️ Updated Title (Focus on Govt Exams & site name)
  title: "Download Govt Exam Admit Cards 2025 | Government Exam", // ~58 chars
  
  // ➡️ Updated Description (Mentioning Sarkari Admit Card)
  description: "Search and download official Admit Cards (Sarkari Admit Card) for government job exams online. Stay updated with the latest exam dates 2025.", // ~150 chars
  
  // ➡️ Updated Keywords
  keywords: "Sarkari Admit Card 2025, Govt Exam Admit Card, Download Admit Card, Exam Hall Ticket, Government Exams 2025", // ~100 chars
  
  // ➡️ Updated Authors/Creator/Publisher
  authors: [{ name: "Government Exam", url: "https://governmentexam.online" }],
  robots: "index, follow",
  openGraph: {
    // ➡️ Updated Title
    title: "Download Govt Exam Admit Cards 2025 | Government Exam",
    // ➡️ Updated Description
    description: "Search and download official Admit Cards (Sarkari Admit Card) for government job exams online. Stay updated with the latest exam dates 2025.",
    // ➡️ Updated URL
    url: "https://governmentexam.online/admit-card",
    // ➡️ Updated Site Name
    siteName: "Government Exam",
    images: [
      {
        // ➡️ Updated URL
        url: "https://governmentexam.online/og-admit-card.png",
        width: 1200,
        height: 630,
        alt: "Government Exam Admit Card Portal",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    // ➡️ Updated Title
    title: "Download Govt Exam Admit Cards 2025 | Government Exam",
    // ➡️ Updated Description
    description: "Search and download official Admit Cards (Sarkari Admit Card) for government job exams online. Stay updated with the latest exam dates 2025.",
    // ➡️ Updated URL
    images: ["https://governmentexam.online/og-admit-card.png"],
    creator: "@YourTwitterHandle",
  },
  alternates: {
    // ➡️ Updated URL
    canonical: "https://governmentexam.online/admit-card",
  },
};

// ✅ Page Component
export default function Page() {
  return <AdmitCardPageClient />;
}